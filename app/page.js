'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DashboardCards from '@/components/DashboardCards';
import { OverviewBarChart, CategoryPieChart } from '@/components/Charts';
import TransactionList from '@/components/TransactionList';
import AddTransactionModal from '@/components/AddTransactionModal';
import { supabase } from '@/lib/supabase';
import './page.css';

// Fallback Mock Data for demo purposes
const MOCK_DATA = {
  balance: 45000,
  income: 60000,
  expense: 15000,
  barChartData: [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ],
  pieChartData: [
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Shopping', value: 300 },
    { name: 'Bills', value: 200 },
  ]
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [dashboardData, setDashboardData] = useState(MOCK_DATA);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsingMock, setIsUsingMock] = useState(true);

  // Helper to process raw transactions into chart/dashboard data
  const processData = (txs) => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};
    const monthlyData = {};

    txs.forEach(tx => {
      const amount = Number(tx.amount);
      if (tx.type === 'income') {
        income += amount;
      } else {
        expense += amount;
        // Pie Chart Categories (Expenses only usually)
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + amount;
      }

      // Bar chart (monthly grouped)
      const date = new Date(tx.date);
      const month = date.toLocaleString('th-TH', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { name: month, income: 0, expense: 0 };
      }
      if (tx.type === 'income') {
        monthlyData[month].income += amount;
      } else {
        monthlyData[month].expense += amount;
      }
    });

    const balance = income - expense;
    
    const pieChartData = Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key]
    })).filter(item => item.value > 0);

    const barChartData = Object.values(monthlyData);

    setDashboardData({
      balance,
      income,
      expense,
      pieChartData,
      barChartData
    });
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error("Supabase URL is missing.");
      }

      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setTransactions(data || []);
      processData(data || []);
      setIsUsingMock(false);
      
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsUsingMock(true);
      // Fallback to mock data if table missing or fetch fails
      setDashboardData(MOCK_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTx) => {
    if (isUsingMock) {
      alert("ขณะนี้แสดงข้อมูลตัวอย่าง (Mock Data) เนื่องจากยังไม่ได้เชื่อมต่อฐานข้อมูล ฟังก์ชันเพิ่มรายการจึงถูกปิดใช้งาน");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([newTx])
        .select();

      if (error) throw error;
      
      // Refresh data
      fetchTransactions();
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเพิ่มรายการ: " + err.message);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (isUsingMock) return;

    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) {
      try {
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        // Refresh data
        fetchTransactions();
      } catch (err) {
        alert("เกิดข้อผิดพลาดในการลบรายการ: " + err.message);
      }
    }
  };

  return (
    <main className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-title">
          <div>
            <h1>สรุปรายรับ-รายจ่าย</h1>
            <p className="subtitle">จัดการการเงินของคุณอย่างมีสไตล์</p>
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            <span>เพิ่มรายการ</span>
          </button>
        </div>
        
        {error && (
          <div className="connection-warning">
            ⚠️ {error} <br/>
            {error.includes("does not exist") || error.includes("find the table") 
              ? "คำแนะนำ: คุณต้องนำคำสั่ง SQL ในไฟล์ supabase/schema.sql ไปรันใน SQL Editor ของ Supabase เพื่อสร้างตารางก่อนครับ" 
              : ""}
          </div>
        )}
      </header>

      <DashboardCards 
        balance={dashboardData.balance} 
        income={dashboardData.income} 
        expense={dashboardData.expense} 
      />

      <div className="charts-grid">
        <OverviewBarChart data={dashboardData.barChartData} />
        <CategoryPieChart data={dashboardData.pieChartData} />
      </div>
      
      {!isUsingMock && (
        <TransactionList 
          transactions={transactions} 
          onDelete={handleDeleteTransaction}
        />
      )}

      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </main>
  );
}

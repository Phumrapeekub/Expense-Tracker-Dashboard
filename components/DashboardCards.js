import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import './DashboardCards.css';

export default function DashboardCards({ balance = 0, income = 0, expense = 0 }) {
  return (
    <div className="dashboard-cards">
      <div className="card balance-card">
        <div className="card-header">
          <h3>ยอดเงินคงเหลือ</h3>
          <Wallet className="card-icon" />
        </div>
        <div className="card-amount">
          <h2>฿{balance.toLocaleString()}</h2>
        </div>
      </div>

      <div className="card income-card">
        <div className="card-header">
          <h3>รายรับรวม</h3>
          <ArrowUpRight className="card-icon success" />
        </div>
        <div className="card-amount">
          <h2>฿{income.toLocaleString()}</h2>
        </div>
      </div>

      <div className="card expense-card">
        <div className="card-header">
          <h3>รายจ่ายรวม</h3>
          <ArrowDownRight className="card-icon danger" />
        </div>
        <div className="card-amount">
          <h2>฿{expense.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}

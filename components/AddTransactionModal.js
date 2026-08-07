import { useState } from 'react';
import { X } from 'lucide-react';
import './AddTransactionModal.css';

const CATEGORIES = [
  'อาหาร',
  'เดินทาง',
  'ช้อปปิ้ง',
  'บิล/ค่าใช้จ่าย',
  'บันเทิง',
  'เงินเดือน',
  'ลงทุน',
  'อื่นๆ'
];

export default function AddTransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'อาหาร',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert amount to number
    const tx = {
      ...formData,
      amount: Number(formData.amount)
    };
    
    await onAdd(tx);
    setLoading(false);
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: 'อาหาร',
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>เพิ่มรายการใหม่</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group type-group">
            <label className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}>
              <input 
                type="radio" 
                name="type" 
                value="expense" 
                checked={formData.type === 'expense'} 
                onChange={handleChange} 
              />
              รายจ่าย
            </label>
            <label className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}>
              <input 
                type="radio" 
                name="type" 
                value="income" 
                checked={formData.type === 'income'} 
                onChange={handleChange} 
              />
              รายรับ
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="title">ชื่อรายการ</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required 
              placeholder="เช่น กินข้าว, ซื้อของ"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">จำนวนเงิน (฿)</label>
            <input 
              type="number" 
              id="amount" 
              name="amount" 
              required 
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">หมวดหมู่</label>
              <select 
                id="category" 
                name="category" 
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="date">วันที่</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                required 
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'กำลังบันทึก...' : 'บันทึกรายการ'}
          </button>
        </form>
      </div>
    </div>
  );
}

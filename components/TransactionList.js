import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import './TransactionList.css';

export default function TransactionList({ transactions = [], onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-list-container empty">
        <h3 className="section-title">รายการล่าสุด</h3>
        <div className="empty-state">
          <p>ยังไม่มีประวัติการทำรายการ คลิกเพิ่มรายการเพื่อเริ่มต้น!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list-container">
      <h3 className="section-title">รายการล่าสุด</h3>
      <div className="transaction-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-item">
            <div className="tx-icon">
              {tx.type === 'income' ? (
                <ArrowUpRight className="icon-success" />
              ) : (
                <ArrowDownRight className="icon-danger" />
              )}
            </div>
            
            <div className="tx-details">
              <h4>{tx.title}</h4>
              <p>
                <span className="tx-category">{tx.category}</span> • 
                <span className="tx-date">
                  {format(new Date(tx.date), 'dd MMM yyyy', { locale: th })}
                </span>
              </p>
            </div>
            
            <div className="tx-actions">
              <span className={`tx-amount ${tx.type}`}>
                {tx.type === 'income' ? '+' : '-'}฿{Number(tx.amount).toLocaleString()}
              </span>
              <button 
                className="delete-btn" 
                onClick={() => onDelete(tx.id)}
                aria-label="Delete transaction"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

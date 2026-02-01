import React from 'react';
import { Transaction } from '../types';
import Card from './Card';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 text-sm">No transactions yet.</td>
                </tr>
            ) : (
                transactions.sort((a, b) => b.date.getTime() - a.date.getTime()).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500">
                    {tx.date.toLocaleDateString()} <span className="text-xs ml-1 opacity-70">{tx.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                    {tx.symbol}
                    </td>
                    <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.type === 'BUY' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {tx.type}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                    {tx.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                    ${tx.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                    ${(tx.quantity * tx.price).toLocaleString()}
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TransactionHistory;

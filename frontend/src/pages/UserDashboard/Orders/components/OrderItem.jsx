import React from 'react';
import { IndianRupee, Star } from 'lucide-react';

export default function OrderItem({ item, orderStatus, onWriteReview, onReturnItem, onReorder, orderId }) {
  console.log(item)
  return (
    <div key={item.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Product'; }}
      />
      <div className="flex-1">
        <div className="font-medium text-black mb-1 line-clamp-2">{item.name}</div>
        <div className="text-sm text-gray-600 mb-2">Size: {item.size} • Qty: {item.quantity}</div>
        <div className="text-sm font-medium text-black">₹{item.price.toLocaleString()} each</div>

        <div className="flex flex-wrap gap-2 mt-3">
          {orderStatus === 'delivered' && item.canReview && !item.isReviewed && (
            <button onClick={() => onWriteReview(item.id, orderId)} className="flex items-center gap-1 px-3 py-1.5 bg-black text-white rounded-lg text-xs hover:bg-gray-800 transition-colors duration-300">
              <Star className="w-3 h-3" />
              Write Review
            </button>
          )}

          {orderStatus === 'delivered' && item.isReturnable && (
            <button onClick={() => onReturnItem(item.id, orderId)} className="px-3 py-1.5 bg-white border border-gray-300 text-black rounded-lg text-xs hover:bg-gray-50 transition-colors duration-300">
              Return Item
            </button>
          )}

          <button onClick={() => onReorder(orderId)} className="px-3 py-1.5 bg-white border border-gray-300 text-black rounded-lg text-xs hover:bg-gray-50 transition-colors duration-300">Cancel</button>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-black flex items-center">
          <IndianRupee className="w-4 h-4" />
          {(item.price * item.quantity).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

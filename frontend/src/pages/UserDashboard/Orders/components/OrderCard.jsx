import React from 'react';
import { Calendar, Package, Truck, ChevronRight, Repeat, Download, MessageSquare, IndianRupee, MapPin as MapPinIcon, Phone, CheckCircle, CreditCard } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderItem from './OrderItem';

export default function OrderCard({ order, expanded, onToggle, onReorder, onTrack, onDownloadInvoice, onContactSupport, onWriteReview, onReturnItem }) {
  console.log(order)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="p-6 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-lg font-bold text-black">{order.id}</h3>
              <StatusBadge status={order.status} text={order.statusText} />
              {order.paymentStatus === 'PENDING' && order.paymentMethod === 'Cash on Delivery' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold border bg-yellow-50 text-yellow-700 border-yellow-200">Payment Pending</span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>Ordered: {order.date ? new Date(order.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '-'}</span></div>
              <div className="flex items-center gap-1"><Package className="w-4 h-4" /><span>{order.items} item{order.items > 1 ? 's' : ''}</span></div>
              {order.estimatedDelivery && (<div className="flex items-center gap-1"><Truck className="w-4 h-4" /><span>Est. Delivery: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '-'}</span></div>)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-black flex items-center"><IndianRupee className="w-5 h-5" />{order.total.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300">
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {order.status === 'delivered' && (
            <button onClick={() => onReorder(order.id)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm"><Repeat className="w-4 h-4" />Reorder All</button>
          )}
          {order.trackingId && order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button onClick={() => onTrack(order.trackingId)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm"><Truck className="w-4 h-4" />Track Order</button>
          )}
          <button onClick={() => onDownloadInvoice(order.id)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm"><Download className="w-4 h-4" />Download Invoice</button>
          <button onClick={() => onContactSupport(order.id)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm"><MessageSquare className="w-4 h-4" />Get Help</button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h4 className="font-medium text-black mb-4 flex items-center gap-2"><Package className="w-5 h-5" />Order Items</h4>
              <div className="space-y-4">
                {order.itemsList.map(item => (
                  <OrderItem key={item.id} item={item} orderStatus={order.status} onWriteReview={onWriteReview} onReturnItem={onReturnItem} onReorder={onReorder} orderId={order.id} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-black mb-3 flex items-center gap-2"><MapPinIcon className="w-5 h-5" />Shipping Address</h4>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-black">{order.shippingDetails?.fullName}</p>
                  <p className="text-gray-600">{order.shippingDetails?.Address}</p>
                  <p className="text-gray-600">{order.shippingDetails?.city}, {order.shippingDetails?.state} - {order.shippingDetails?.pincode}</p>
                  <p className="text-gray-600 flex items-center gap-1"><Phone className="w-3 h-3" />{order.shippingDetails?.mobile}</p>
                  {order.deliveryDate && (<div className="mt-3 pt-3 border-t border-gray-200"><p className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" />Delivered on {order.deliveryDate ? new Date(order.deliveryDate).toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p></div>)}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-black mb-3">Payment Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Method</span><span className="font-medium flex items-center gap-1"><CreditCard className="w-4 h-4" />{order.paymentMethod}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Status</span><span className={`px-2 py-1 rounded-full text-xs font-bold ${order.paymentStatus === 'PAID' ? 'bg-green-50 text-green-700' : order.paymentStatus === 'PENDING' ? 'bg-yellow-50 text-yellow-700' : order.paymentStatus === 'FAILED' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'}`}>{order.paymentStatus}</span></div>
                  {order.trackingId && (<div className="mt-3 pt-3 border-t border-gray-200"><p className="text-sm text-gray-600 mb-1">Tracking ID</p><p className="text-sm font-mono font-medium">{order.trackingId}</p></div>)}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-black mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>₹{(order.pricing?.subtotal || order.total).toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="text-green-600">{order.pricing?.shipping === 0 ? 'Free' : `₹${order.pricing?.shipping?.toLocaleString() || 0}`}</span></div>
                  {order.pricing?.tax > 0 && (<div className="flex justify-between text-sm"><span className="text-gray-600">Tax</span><span>₹{order.pricing.tax.toLocaleString()}</span></div>)}
                  <div className="border-t border-gray-200 pt-2 mt-2"><div className="flex justify-between font-medium"><span>Total</span><span className="text-lg flex items-center"><IndianRupee className="w-4 h-4" />{order.total.toLocaleString()}</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

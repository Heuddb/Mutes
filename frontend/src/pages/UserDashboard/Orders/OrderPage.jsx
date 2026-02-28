import React, { useState } from 'react';
import {
  Search, Package, Truck, CheckCircle, Clock, ChevronRight,
  Download, RefreshCw, Calendar, CreditCard, Repeat, MessageSquare,
  Star, IndianRupee, Phone, MapPin as MapPinIcon, AlertCircle
} from 'lucide-react';
import { useGetOrdersQuery } from '../../../Redux/Api/Orders/orderApi';
import OrderCard from './components/OrderCard';

const MyOrderPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { data: orders, isLoading, isError, refetch } = useGetOrdersQuery();

  // Get user from localStorage or auth context
  const currentUser = JSON.parse(localStorage.getItem('user')) || {
    name: 'User',
    email: 'user@example.com'
  };

  // Transform API data to match component needs
  const transformOrderStatus = (status) => {
    const statusMap = {
      'PLACED': 'pending',
      'PROCESSING': 'processing',
      'SHIPPED': 'shipped',
      'DELIVERED': 'delivered',
      'CANCELLED': 'cancelled',
      'RETURNED': 'returned'
    };
    return statusMap[status] || 'pending';
  };

  const transformStatusText = (status) => {
    const textMap = {
      'PLACED': 'Order Placed',
      'PROCESSING': 'Processing',
      'SHIPPED': 'Shipped',
      'DELIVERED': 'Delivered',
      'CANCELLED': 'Cancelled',
      'RETURNED': 'Returned'
    };
    return textMap[status] || status;
  };

  // Transform API orders to component format
  const myOrders = orders?.map(order => ({
    id: order.orderId,
    date: order.createdAt,
    items: order.items.length,
    total: order.pricing.total,
    status: transformOrderStatus(order.orderStatus),
    originalStatus: order.orderStatus,
    statusText: transformStatusText(order.orderStatus),
    trackingId: order.trackingId || null,
    estimatedDelivery: order.estimatedDelivery,
    deliveryDate: order.deliveredAt,
    paymentMethod: order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI',
    paymentStatus: order.paymentStatus,
    shippingAddress: `${order.shippingAddress.Address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}`,
    shippingDetails: order.shippingAddress,
    itemsList: order.items.map(item => ({
      id: item.product,
      name: item.name,
      size: item.size || 'One Size',
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      canReview: item.canReview || order.orderStatus === 'DELIVERED',
      isReviewed: item.isReviewed || false,
      isReturnable: item.isReturnable && order.orderStatus === 'DELIVERED'
    }))
  })) || [];


  const statusFilters = [
    { id: 'all', label: 'All Orders', count: myOrders.length },
    { id: 'pending', label: 'Pending', count: myOrders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: 'Processing', count: myOrders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: myOrders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: myOrders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: myOrders.filter(o => o.status === 'cancelled').length },
  ];

  const filteredOrders = myOrders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.itemsList.some(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReorder = (orderId) => {
    const order = myOrders.find(o => o.id === orderId);
    if (order) {
      // Add all items from this order to cart
      order.itemsList.forEach(item => {
        // Dispatch add to cart action
        console.log('Add to cart:', item);
      });
    }
  };

  const handleTrackOrder = (trackingId) => {
    window.open(`/track-order/${trackingId}`, '_blank');
  };

  const handleDownloadInvoice = (orderId) => {
    // Generate/download invoice
    console.log('Download invoice for:', orderId);
    // You can implement PDF generation or open invoice page
    window.open(`/invoice/${orderId}`, '_blank');
  };

  const handleWriteReview = (productId, orderId) => {
    console.log('Write review for product:', productId, 'from order:', orderId);
    // Navigate to review page or open modal
    // You can use navigate from react-router
  };

  const handleContactSupport = (orderId) => {
    console.log('Contact support for order:', orderId);
    // Open support chat with order context
    // You can open a modal or navigate to support page
  };

  const handleReturnItem = (itemId, orderId) => {
    console.log('Return item:', itemId, 'from order:', orderId);
    // Open return request modal
  };

  const handleViewDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading payment details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Failed to load orders</h3>
          <p className="text-gray-600 mb-6">There was an error loading your orders. Please try again.</p>
          <button 
            onClick={() => refetch()}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-light text-black mb-2">My Orders</h1>
              <p className="text-gray-600">Track, manage, and return your orders</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or item name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
  {/* Welcome & Stats */}
<div className="mb-8">
  <div className="bg-white border border-gray-200 rounded-xl p-6">
    <div className="flex items-center justify-between">
      {/* Welcome Message */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Welcome back, <span className="font-semibold">{currentUser.name?.split(' ')[0] || 'User'}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {myOrders.length} order{myOrders.length !== 1 ? 's' : ''} placed
        </p>
      </div>

      {/* Total Spent */}
      <div className="text-right">
        <p className="text-xs text-gray-500 uppercase tracking-wider">Total spent</p>
        <p className="text-xl font-semibold text-gray-900">
          ₹{myOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
        </p>
      </div>
    </div>
  </div>
</div>

        {/* Filters */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex flex-nowrap gap-2 min-w-max">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-black hover:bg-gray-50'
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                    activeFilter === filter.id
                      ? 'bg-white text-black'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                expanded={expandedOrder === order.id}
                onToggle={() => handleViewDetails(order.id)}
                onReorder={handleReorder}
                onTrack={handleTrackOrder}
                onDownloadInvoice={handleDownloadInvoice}
                onContactSupport={handleContactSupport}
                onWriteReview={handleWriteReview}
                onReturnItem={handleReturnItem}
              />
            ))
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchQuery
                  ? `No orders match "${searchQuery}". Try a different search term.`
                  : activeFilter !== 'all'
                  ? `You don't have any ${activeFilter} orders.`
                  : "You haven't placed any orders yet."}
              </p>
              {!searchQuery && (
                <button onClick={() => window.location.href = '/products'} className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">Start Shopping</button>
              )}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-black mb-6">Need help with your order?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-black">Contact Support</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">Get help with returns, refunds, or order issues</p>
              <button className="w-full py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Chat with Us
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Repeat className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-black">Return Policy</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">Easy returns within 7 days of delivery</p>
              <button className="w-full py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300">
                View Policy
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Truck className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-black">Shipping Info</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">Delivery times, tracking, and shipping costs</p>
              <button className="w-full py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
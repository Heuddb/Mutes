import React, { useState } from 'react';
import { Gift, CreditCard, Mail, Smartphone, Calendar, Download, Printer, Share2, Check } from 'lucide-react';

const GiftCardPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [design, setDesign] = useState('black');
  const [showPreview, setShowPreview] = useState(false);

  // Predefined amounts
  const amounts = [25, 50, 100, 150, 250, 500];
  
  // Card designs
  const designs = [
    { id: 'black', name: 'Classic Black', bgColor: 'bg-black', textColor: 'text-white' },
    { id: 'white', name: 'Minimal White', bgColor: 'bg-white', textColor: 'text-black', border: 'border border-gray-200' },
    { id: 'gradient', name: 'Monochrome', bgColor: 'bg-gradient-to-br from-gray-800 to-black', textColor: 'text-white' },
    { id: 'pattern', name: 'Geometric', bgColor: 'bg-gray-900', textColor: 'text-white', pattern: true }
  ];

  // Delivery options
  const deliveryOptions = [
    { id: 'email', name: 'Email', icon: Mail, description: 'Instant delivery' },
    { id: 'sms', name: 'Text Message', icon: Smartphone, description: 'Send to phone' },
    { id: 'print', name: 'Print at Home', icon: Printer, description: 'Print yourself' }
  ];

  const calculateTotal = () => {
    return selectedAmount * quantity;
  };

  const handleBuyNow = () => {
    const giftCard = {
      amount: selectedAmount,
      quantity,
      total: calculateTotal(),
      recipientEmail,
      recipientName,
      senderName,
      message,
      deliveryMethod,
      design,
      cardNumber: `MUTES-GC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      pin: Math.floor(1000 + Math.random() * 9000)
    };
    
    alert(`Gift card purchased successfully!\nCard: ${giftCard.cardNumber}\nTotal: $${giftCard.total}`);
    // In real app, you would process payment and send gift card
  };

  const handleShare = () => {
    alert('Gift card link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MUTES Gift Cards</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The perfect gift for any occasion. Give the gift of premium fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Card Builder */}
          <div className="space-y-8">
            {/* Amount Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Choose Amount</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {amounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedAmount === amount
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-xl font-bold">${amount}</div>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedAmount(0)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedAmount === 0
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm font-medium">Custom</div>
                </button>
              </div>
              
              {/* Custom Amount Input */}
              {selectedAmount === 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Custom Amount (Min: $10 - Max: $1000)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      placeholder="Enter amount"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <span className="text-2xl font-bold min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    <span className="text-xl">+</span>
                  </button>
                  <span className="text-gray-600 ml-4">${selectedAmount} each</span>
                </div>
              </div>
            </div>

            {/* Personalization */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Personalize Your Gift</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient's Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter recipient's name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient's Email</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="From"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personal Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal message..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deliveryOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setDeliveryMethod(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      deliveryMethod === option.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        deliveryMethod === option.id ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        <option.icon className={`w-5 h-5 ${deliveryMethod === option.id ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <span className="font-medium">{option.name}</span>
                    </div>
                    <p className={`text-sm ${deliveryMethod === option.id ? 'text-white/80' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Card Design</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {designs.map(cardDesign => (
                  <button
                    key={cardDesign.id}
                    onClick={() => setDesign(cardDesign.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      design === cardDesign.id
                        ? 'border-black ring-2 ring-black ring-offset-2'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`h-24 rounded-lg mb-3 flex items-center justify-center ${cardDesign.bgColor} ${cardDesign.border || ''} relative overflow-hidden`}>
                      {cardDesign.pattern && (
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 left-2 w-8 h-8 border-2 border-white rounded-full"></div>
                          <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white rotate-45"></div>
                        </div>
                      )}
                      <div className={`text-lg font-bold ${cardDesign.textColor} z-10`}>${selectedAmount}</div>
                    </div>
                    <div className="text-sm font-medium text-center">{cardDesign.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Checkout */}
          <div className="space-y-8">
            {/* Gift Card Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Gift Card Preview</h2>
              
              {/* Preview Card */}
              <div className="mb-8">
                <div className={`rounded-xl overflow-hidden shadow-lg mb-4 ${
                  designs.find(d => d.id === design)?.bgColor
                } ${designs.find(d => d.id === design)?.border || ''} ${
                  designs.find(d => d.id === design)?.textColor
                } h-48 relative`}>
                  {design === 'pattern' && (
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rotate-45"></div>
                    </div>
                  )}
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-2xl font-bold mb-1">MUTES</div>
                      <div className="text-sm opacity-80">GIFT CARD</div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold mb-2">${selectedAmount}</div>
                      {recipientName && (
                        <div className="text-sm opacity-80">To: {recipientName}</div>
                      )}
                      {senderName && (
                        <div className="text-sm opacity-80">From: {senderName}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-50 transition flex items-center justify-center"
                >
                  {showPreview ? 'Hide Details' : 'Show Card Details'}
                </button>
                
                {showPreview && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Card Number:</span>
                        <span className="font-mono font-medium">MUTES-GC-8A9B7C6D</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PIN Code:</span>
                        <span className="font-mono font-medium">••••</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expires:</span>
                        <span className="font-medium">December 31, 2026</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gift Card Amount</span>
                    <span className="font-medium">${selectedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">No additional fees</p>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mb-8">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Instant Delivery</p>
                    <p>Gift cards are delivered immediately via email or can be printed at home.</p>
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Never Expires</p>
                    <p>MUTES gift cards never expire and have no monthly fees.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now - ${calculateTotal()}
                </button>
                <button
                  onClick={handleShare}
                  className="w-full border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-50 transition flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Gift Card
                </button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4">Gift Card FAQs</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-1">How do I use a MUTES gift card?</p>
                  <p className="text-sm text-gray-600">Enter the gift card number and PIN at checkout to apply the balance to your order.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Can I use multiple gift cards?</p>
                  <p className="text-sm text-gray-600">Yes, you can combine up to 5 gift cards per order.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Do gift cards expire?</p>
                  <p className="text-sm text-gray-600">No, MUTES gift cards never expire and have no maintenance fees.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Can I check my balance?</p>
                  <p className="text-sm text-gray-600">Visit our gift card balance checker on the website or contact customer service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;
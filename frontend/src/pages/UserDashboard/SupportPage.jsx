import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, FileText, HelpCircle, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle, BookOpen, Shield, Truck, CreditCard, RefreshCw } from 'lucide-react';

const SupportPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularTopics = [
    { icon: <Truck className="w-5 h-5" />, title: 'Shipping & Delivery', count: 12 },
    { icon: <CreditCard className="w-5 h-5" />, title: 'Payment & Refunds', count: 8 },
    { icon: <RefreshCw className="w-5 h-5" />, title: 'Returns & Exchanges', count: 6 },
    { icon: <Shield className="w-5 h-5" />, title: 'Account & Security', count: 10 },
    { icon: <BookOpen className="w-5 h-5" />, title: 'Order Tracking', count: 5 },
  ];

  const faqCategories = [
    {
      category: 'Orders & Shipping',
      questions: [
        { id: 1, question: 'How long does shipping take?', answer: 'Standard shipping takes 5-7 business days. Express shipping delivers in 2-3 business days. International orders may take 10-15 business days.' },
        { id: 2, question: 'How can I track my order?', answer: 'Once your order ships, you will receive a tracking number via email. You can also track your order from your account dashboard.' },
        { id: 3, question: 'Do you ship internationally?', answer: 'Yes, we ship to over 50 countries. Shipping costs and delivery times vary by location.' },
      ]
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        { id: 4, question: 'What is your return policy?', answer: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.' },
        { id: 5, question: 'How do I initiate a return?', answer: 'Go to your order history, select the item to return, and follow the return process. We will provide a return label and instructions.' },
        { id: 6, question: 'How long do refunds take?', answer: 'Once we receive your return, refunds are processed within 5-7 business days. It may take additional time for your bank to post the refund.' },
      ]
    },
    {
      category: 'Account & Payments',
      questions: [
        { id: 7, question: 'How do I reset my password?', answer: 'Click "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your inbox.' },
        { id: 8, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.' },
        { id: 9, question: 'Is my payment information secure?', answer: 'Yes, we use SSL encryption and never store your full credit card information on our servers.' },
      ]
    }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-black text-white'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Call us directly',
      availability: 'Mon-Fri, 9AM-6PM',
      action: '+1 (555) 123-4567',
      color: 'bg-white text-black border border-black'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Send us an email',
      availability: 'Response within 24 hours',
      action: 'support@fashion.com',
      color: 'bg-white text-black border border-black'
    }
  ];

  const filteredFAQs = faqCategories.flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl  font-light text-black mb-4">
              How can we help you?
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Find answers, get support, or contact our team
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Popular Topics */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-black">Popular Topics</h2>
            <button className="text-sm text-gray-600 hover:text-black flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularTopics.map((topic, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:border-black transition-colors duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded group-hover:bg-black transition-colors duration-300">
                    <div className="group-hover:text-white transition-colors duration-300">
                      {topic.icon}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {topic.count} articles
                  </span>
                </div>
                <h3 className="font-medium text-black group-hover:text-gray-700 transition-colors duration-300">
                  {topic.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium text-black mb-8">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-black">{option.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {option.availability}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{option.description}</p>
                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${option.color}`}>
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-black">Frequently Asked Questions</h2>
            <div className="text-sm text-gray-500">
              {faqCategories.flatMap(c => c.questions).length} questions
            </div>
          </div>

          {searchQuery ? (
            // Search Results
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Found {filteredFAQs.length} results for "{searchQuery}"
              </div>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                    >
                      <span className="font-medium text-black">{faq.question}</span>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFAQ === faq.id ? 'rotate-90' : ''}`} />
                    </button>
                    {activeFAQ === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No results found</h3>
                  <p className="text-gray-500">Try different keywords or browse our categories</p>
                </div>
              )}
            </div>
          ) : (
            // Categorized FAQs
            <div className="space-y-8">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-medium text-black text-lg">{category.category}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((faq) => (
                      <div key={faq.id} className="group">
                        <button
                          onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                        >
                          <span className="font-medium text-black group-hover:text-gray-700">{faq.question}</span>
                          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFAQ === faq.id ? 'rotate-90' : ''}`} />
                        </button>
                        {activeFAQ === faq.id && (
                          <div className="px-6 pb-6">
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Center Tips */}
        <div className="border border-gray-200 rounded-xl p-8 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-medium text-black mb-4">Need more help?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you with any questions or issues you might have. 
                Check our status page for real-time updates on our services.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">All systems operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Average response time: 2 hours</span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-black mb-4">Before contacting us:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 text-sm">Check your order status in your account</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 text-sm">Have your order number ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-600 text-sm">Describe your issue in detail</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-black mb-6">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-black hover:bg-gray-50 p-3 rounded-lg transition-colors duration-300 flex items-center justify-between group"
              >
                <span>{link}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
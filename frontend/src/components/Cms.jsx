import { Package, Smile, Gift, CreditCard } from 'lucide-react';
import { assets } from '../assets/assets';

export default function Cms() {
  const features = [
    {
      icon: assets.box,
      title: "Free Fast Shipping",
      description: "Free shipping on orders $100"
    },
    {
      icon: assets.smile,
      title: "Our Happy Clients",
      description: "Online service center worldwide"
    },
    {
      icon: assets.gift,
      title: "Best Special Gifts",
      description: "Return policy available 365 days"
    },
    {
      icon: assets.card,
      title: "Secure Payments",
      description: "Coupon & offers on first purchase"
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-16 mt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <img src={feature.icon} alt='error' className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
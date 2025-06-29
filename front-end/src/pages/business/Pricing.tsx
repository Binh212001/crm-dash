import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 29,
      period: 'month',
      features: [
        'Up to 5 users',
        'Basic reporting',
        'Email support',
        '1GB storage',
        'Basic integrations'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 79,
      period: 'month',
      features: [
        'Up to 20 users',
        'Advanced reporting',
        'Priority support',
        '10GB storage',
        'Advanced integrations',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      features: [
        'Unlimited users',
        'Custom reporting',
        '24/7 support',
        'Unlimited storage',
        'All integrations',
        'Custom branding',
        'API access',
        'Dedicated account manager'
      ],
      popular: false
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg p-6 ${
              plan.popular ? 'ring-2 ring-blue-500 relative' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 px-4 rounded-md font-medium transition duration-200 ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {plan.popular ? 'Get Started' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Can I change plans anytime?</h3>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">We offer a 14-day free trial for all plans. No credit card required to start.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 
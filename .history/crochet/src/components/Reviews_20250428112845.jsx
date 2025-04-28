import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: "What is a Flash Sale?",
    answer: "A flash sale is a short-term discount or promotion on selected products, usually lasting a few hours or days."
  },
  {
    question: "How do I place an order?",
    answer: "You can place an order by clicking the 'Order' button on the product page. This will direct you to WhatsApp to confirm your order."
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be canceled within 1 hour of placement. After that, cancellations may not be guaranteed."
  },
  {
    question: "Are the products authentic?",
    answer: "Yes, all products listed are authentic and sourced directly from verified sellers or manufacturers."
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes, we offer delivery across Kenya. Delivery charges may vary depending on your location."
  }
];

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-700 focus:outline-none"
            >
              {faq.question}
              {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;

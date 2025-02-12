import React, { useState } from "react";
import faqs from "../data/faqs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function Accordion() {
  const [openFaqId, setOpenFaqId] = useState(null);

  const handleFaqClick = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="mb-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div
            className="bg-white p-6 cursor-pointer flex items-center justify-between"
            onClick={() => handleFaqClick(faq.id)}
          >
            <p className="text-lg font-medium text-gray-800">
              <span className="text-blue-500">Q{faq.id}:</span> {faq.question}
            </p>
            <span className="text-2xl text-gray-600">
              {openFaqId === faq.id ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </div>
          {openFaqId === faq.id && (
            <div className="bg-gray-50 p-6 border-t">
              <p className="text-gray-700">
                <span className="font-semibold text-green-500">Answer:</span>{" "}
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;

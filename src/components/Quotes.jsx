// src/Quotes.js
import React, { useState, useEffect } from 'react';

const Quotes = () => {
  const [quote, setQuote] = useState({
    "content" : '',
    "author" : '',
  });

  useEffect(() => {
    fetch('https://api.quotable.io/random') // Replace with the actual API endpoint
      .then((response) => response.json())
      .then((data) => setQuote(data));
  }, []);

  return (
    <div className=''>
      <p className='mt-8 text-md text-gray-600 max-w-3xl mx-4 md:mx-16 lg:mx-auto'>{quote.content}</p>
      <span className='mt-8 text-md text-gray-600 max-w-3xl mx-4 md:mx-16 lg:mx-auto font-extrabold'>-{quote.author}</span>
    </div>
  );
};

export default Quotes;

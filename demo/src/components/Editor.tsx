'use client';
import React, { useState } from 'react';
import parseCron from 'crontext';

export const Editor = () => {
  const [text, setText] = useState('Every minute');
  return (
    <div className="w-full flex flex-col">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        className="block p-4 border-2 rounded-lg sm:text-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-sky-500 focus:border-sky-500"
      />
      <span className="text-3xl">{parseCron(text)}</span>
    </div>
  );
};

export default Editor;

// w-full border p-4 bg-gray-700 border-gray-600 placeholder-gray-400 text-white rounded-lg focus:border-sky-500 focus:ring-sky-500
// block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500

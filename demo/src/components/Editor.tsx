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

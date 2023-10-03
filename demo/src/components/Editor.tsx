'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import parseCron from 'crontext';

export const Editor = () => {
  const [text, setText] = useState('Every minute');
  console.log(parseCron(text));
  return (
    <div className="w-full flex flex-col">
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        className="text-xl p-8 dark:bg-neutral-900 bg-white border-sky-500"
      />
      <span className="text-3xl tracking-[0.75rem] pt-12 m-auto">
        {parseCron(text)}
      </span>
    </div>
  );
};

export default Editor;

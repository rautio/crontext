'use client';
import React, { useState, useEffect } from 'react';
import parseCron from 'crontext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Copy from '@/icons/Copy';

export const Editor = () => {
  const [text, setText] = useState('Every minute');
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);
  return (
    <div className="w-full flex flex-col">
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        className="text-xl p-8 dark:bg-neutral-900 bg-white border-sky-500"
      />
      <div className="flex pt-12 m-auto">
        <Input
          readOnly
          value={parseCron(text)}
          className="text-2xl tracking-[0.75rem] w-30 text-center"
        />
        <Button
          onClick={() => {
            setIsCopied(true);
            navigator.clipboard.writeText(text);
          }}
        >
          {isCopied ? (
            <span className="text-sky-500">Copied!</span>
          ) : (
            <span className="flex leading-4">
              <Copy />
              Copy
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Editor;

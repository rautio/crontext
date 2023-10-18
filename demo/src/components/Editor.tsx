'use client';
import React, { useState, useEffect } from 'react';
import { parseText, nextDate, version } from 'crontext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Copy from '@/icons/Copy';

console.log({ crontext: version });

export const Editor = () => {
  const [text, setText] = useState('Every minute');
  const [isCopied, setIsCopied] = useState(false);
  const cron = parseText(text);
  const date = nextDate(cron, new Date());
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);
  return (
    <div className="w-full flex flex-col max-w-3xl md:w-3/5 sm:w-11/12">
      <span className="text-sm text-neutral-400">Type a schedule.</span>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        className="text-xl p-8 dark:bg-neutral-900 bg-white border-sky-500"
      />
      <div className="flex pt-8 m-auto">
        <Input
          readOnly
          value={cron}
          className="text-2xl tracking-[0.75rem] w-30 text-center"
        />
        <Button
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(cron);
            setIsCopied(true);
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
      <div className="text-sm text-neutral-400 text-center mt-4">
        Next Occurrence:{' '}
        <span className="text-neutral-50" suppressHydrationWarning>
          {date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

export default Editor;

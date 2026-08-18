import React from 'react';

interface SecTitleProps {
  text: string;
  className?: string;
}

export default function SecTitle({ text, className = '' }: SecTitleProps) {
  return (
    <header className={className}>
      <h3 className="w-full text-xl md:text-4xl font-bold text-text-primary capitalize">
        <span
          className="relative inline-block  
         content-[] md:before:content-[''] before:absolute before:left-0
            before:top-10.5 before:h-0.5
           before:w-[28.5%] before:bg-bg-danger 

          after:content-[''] after:absolute after:left-0 after:rounded-r-2xl after:bottom-[-5] 
          after:h-4.5 after:w-[74%] after:bg-bg-primary-fade after:z-[-1]"
        >
          {text}
        </span>
      </h3>
    </header>
  );
}

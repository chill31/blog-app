'use client';

import React, { useEffect } from "react";

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';

import '@/app/prose-styles.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);

export default function Prose({ children }: { children: React.ReactNode }) {

  useEffect(() => {
      hljs.highlightAll();
  
      hljs.configure({
        ignoreUnescapedHTML: true,
      });
  }, []);

  return (
    <div className="w-full prose prose-lg mt-5 !px-5">{children}</div>
  )
}
'use client';

import { Loader } from 'react-feather';

export default function Loading({ text = 'Loading...', className = '' }) {
  return (
    <div className={`card p-8 text-center text-[#5E6366] ${className}`}>
      <Loader size={32} className="animate-spin mx-auto mb-4 text-[#142A4E]" />
      <p className="text-[14px]">{text}</p>
    </div>
  );
}

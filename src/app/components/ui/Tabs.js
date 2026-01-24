'use client';

import { isValidElement } from 'react';

export default function Tabs({ tabs = [], activeTab, onChange, className = '' }) {
  return (
    <div className={`flex gap-2 mb-6 border-b border-[#ABAFB1] ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        // Check if it's a React component (function or forwardRef object)
        const isReactComponent = Icon && (
          typeof Icon === 'function' ||
          (typeof Icon === 'object' && Icon.$$typeof)
        );

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-[14px] font-semibold transition border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? 'text-[#142A4E] border-[#142A4E]'
                : 'text-[#5E6366] border-transparent hover:text-[#142A4E]'
            }`}
          >
            {Icon && (
              isReactComponent ? <Icon size={16} /> : <span>{Icon}</span>
            )}
            <span>{tab.label}</span>
            {tab.count !== undefined && <span>({tab.count})</span>}
          </button>
        );
      })}
    </div>
  );
}

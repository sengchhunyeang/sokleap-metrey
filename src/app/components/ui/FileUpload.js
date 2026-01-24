'use client';

import { useRef } from 'react';
import { UploadCloud } from 'react-feather';

export default function FileUpload({
  accept = '.xlsx,.xls',
  onUpload,
  loading = false,
  title = 'Upload a file',
  description = '',
  buttonText = 'Select File',
  loadingText = 'Uploading...',
  className = '',
}) {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`p-6 border-2 border-dashed border-[#ABAFB1] rounded-lg bg-[#F5F5FA] ${className}`}>
      <div className="text-center">
        <UploadCloud size={40} className="mx-auto mb-2 text-[#5E6366]" />
        <p className="text-[14px] text-[#5E6366] mb-2">{title}</p>
        {description && (
          <p className="text-[12px] text-[#ABAFB1] mb-4">{description}</p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id="file-upload"
          disabled={loading}
        />
        <label
          htmlFor="file-upload"
          className={`btn-primary inline-block cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? loadingText : buttonText}
        </label>
      </div>
    </div>
  );
}

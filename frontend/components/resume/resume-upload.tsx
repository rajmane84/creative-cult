'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useResumeParse } from '@/hooks/creative/resume/use-resume-parse';
import type { ResumeParseResponse } from '@/services/creative/resume';

interface ResumeUploadProps {
  onParseComplete?: (data: ResumeParseResponse) => void;
  onError?: () => void;
}

export function ResumeUpload({ onParseComplete, onError }: ResumeUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { parseResume, isParsing } = useResumeParse({
    onSuccess: onParseComplete,
    onError,
  });

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      return;
    }
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleParse = () => {
    if (selectedFile) {
      parseResume(selectedFile);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary/50',
          selectedFile ? 'border-primary bg-primary/5' : ''
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isParsing}
        />

        {!selectedFile ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Upload your resume
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Drag and drop a PDF file, or click to browse
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select File
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                disabled={isParsing}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleParse}
              disabled={isParsing}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isParsing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Parsing...
                </>
              ) : (
                'Parse Resume'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

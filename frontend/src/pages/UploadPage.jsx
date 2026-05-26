import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileText, FileSearch, Globe, Flag, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadPDF } from '../api/client';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError('');
    
    if (fileRejections.length > 0) {
      setError('Please upload a PDF under 20MB');
      setFile(null);
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 20 * 1024 * 1024, // 20MB
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const response = await uploadPDF(file);
      navigate(`/processing/${response.reportId}`, { 
        state: { filename: file.name, fileSize: file.size } 
      });
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-1 text-center mt-4">
        <h1 className="text-xl font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">
          Upload a PDF to fact-check
        </h1>
        <p className="text-sm text-[#6B6B6B] dark:text-[#9A9A9A]">
          We'll extract claims, search live web sources, and flag inaccuracies.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div 
          {...getRootProps()} 
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors min-h-[240px]
            ${isDragActive ? 'border-[#178BFF] bg-[#178BFF]/5' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-white dark:bg-[#1A1A1A]'}
          `}
        >
          <input {...getInputProps()} />
          
          {file ? (
            <div className="flex flex-col items-center justify-center gap-2 text-[#1A1A1A] dark:text-[#F0F0F0]">
              <div className="w-12 h-12 rounded-full bg-[#EAF3DE] text-[#3B6D11] flex items-center justify-center mb-2">
                <CheckCircle size={24} />
              </div>
              <p className="font-medium text-sm text-center">{file.name}</p>
              <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">{formatFileSize(file.size)}</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[#F5F5F3] dark:bg-[#252525] flex items-center justify-center text-[#6B6B6B] dark:text-[#9A9A9A] mb-2">
                <FileText size={24} />
              </div>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">
                Drag & drop a PDF, or browse files
              </p>
              <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">
                Max 20MB · PDF only
              </p>
            </>
          )}
        </div>
        
        {error && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#A32D2D] bg-[#FCEBEB] px-3 py-2 rounded-lg self-center mt-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`self-center flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors mt-2
            ${file && !isUploading
              ? 'bg-[#178BFF] hover:bg-[#0F7AE8] text-white' 
              : 'bg-black/5 dark:bg-white/5 text-[#9A9A9A] cursor-not-allowed'
            }
          `}
        >
          <Upload size={16} />
          {isUploading ? 'Analyzing...' : 'Analyse Document'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-4 flex flex-col gap-2 text-center items-center">
          <div className="w-8 h-8 rounded-full bg-[#EBEBEB] dark:bg-[#252525] flex items-center justify-center text-[#1A1A1A] dark:text-[#F0F0F0] mb-1">
            <FileSearch size={16} />
          </div>
          <p className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">Extracts claims</p>
          <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">Stats, dates, figures</p>
        </div>
        
        <div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-4 flex flex-col gap-2 text-center items-center">
          <div className="w-8 h-8 rounded-full bg-[#EBEBEB] dark:bg-[#252525] flex items-center justify-center text-[#1A1A1A] dark:text-[#F0F0F0] mb-1">
            <Globe size={16} />
          </div>
          <p className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">Live web check</p>
          <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">Cross-references sources</p>
        </div>
        
        <div className="bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 rounded-xl p-4 flex flex-col gap-2 text-center items-center">
          <div className="w-8 h-8 rounded-full bg-[#EBEBEB] dark:bg-[#252525] flex items-center justify-center text-[#1A1A1A] dark:text-[#F0F0F0] mb-1">
            <Flag size={16} />
          </div>
          <p className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#F0F0F0]">Flags inaccuracies</p>
          <p className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">Verified / False / Inaccurate</p>
        </div>
      </div>
    </div>
  );
}

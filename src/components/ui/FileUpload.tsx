import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
}

export const FileUpload = ({ label, error, accept = '.pdf,.docx', onChange, value }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}

      {value ? (
        <div className="flex items-center gap-3 p-4 rounded-lg border border-volt-400/30 bg-volt-400/5">
          <div className="w-9 h-9 rounded-lg bg-volt-400/10 flex items-center justify-center shrink-0">
            <FileText size={16} className="text-volt-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-body font-500 text-ink-100 truncate">{value.name}</p>
            <p className="text-xs text-ink-400">{formatSize(value.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => { onChange(null); if (inputRef.current) inputRef.current.value = ''; }}
            className="text-ink-400 hover:text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer
            transition-all duration-150
            ${dragging
              ? 'border-volt-400 bg-volt-400/5'
              : 'border-surface-border hover:border-ink-400 hover:bg-surface-elevated'
            }
            ${error ? 'border-red-500' : ''}
          `}
        >
          <UploadCloud size={24} className={dragging ? 'text-volt-400' : 'text-ink-400'} />
          <div className="text-center">
            <p className="text-sm font-body font-500 text-ink-200">
              Drop your resume here or <span className="text-volt-400">browse</span>
            </p>
            <p className="text-xs text-ink-400 mt-0.5">PDF or DOCX — max 10MB</p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

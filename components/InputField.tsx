import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  rows = 3,
  required = false
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 text-zinc-800 text-sm placeholder-zinc-400 transition-all resize-none shadow-sm hover:bg-zinc-100/50"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          id={id}
          className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 text-zinc-800 text-sm placeholder-zinc-400 transition-all shadow-sm hover:bg-zinc-100/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
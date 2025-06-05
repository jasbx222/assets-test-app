import React from 'react';

const Inputs = ({
  // You can add props here if needed
  value,
  onChange,
  placeholder = 'ادخل الاسم الكامل',
  label = 'الاسم الكامل',
  type = 'text',
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type?: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block h-[40px] w-full rounded-md border border-blue-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Inputs;

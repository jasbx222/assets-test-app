import React from 'react';

interface AddNewEssetsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewEssets: React.FC<AddNewEssetsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-navy-800">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="إغلاق"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1
          id="modal-title"
          className="text-center text-2xl font-bold text-navy-700 dark:text-white"
        >
          إضافة أصول جديدة
        </h1>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          يمكنك إضافة أصول جديدة من خلال النموذج التالي
        </p>

        <form className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اسم الأصل
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
              placeholder="أدخل اسم الأصل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع الأصل
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
              placeholder="أدخل نوع الأصل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              القسم
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
              placeholder="أدخل القسم"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-brand-500 px-4 py-2 font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            إضافة أصل
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEssets;

import React, { useState } from 'react';
import usePost from 'hooks/usePost';
import { HiX } from 'react-icons/hi';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify'
import useGet from 'hooks/useGet';
import { Asset } from 'types/data';
interface AddNewEssetsProps {
  isOpen: boolean;
  onClose: () => void;
  refetch:()=>void
}

const AddNewEssets: React.FC<AddNewEssetsProps> = ({ isOpen, onClose ,refetch}) => {
  const { add } = usePost();
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [note, setNote] = useState('');

  if (!isOpen) return null;
// const {data,refetch}=useGet(`${process.env.NEXT_PUBLIC_BASE_URL}/assets`)
  const handleAddNewAssetsFunction = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newAsset = {
        name: name,
        image: image,
        note: note,
      };

      await add(`${process.env.NEXT_PUBLIC_BASE_URL}/assets`, newAsset, true);
       toast.success('تمت إضافة الأصل بنجاح');

    refetch()
      onClose();
    } catch (error) {
    Swal.fire({
      title: `${error.message}`,
icon:"error",
  timer: 2000  
      })
    }
  };

  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 dark:bg-opacity-80">
      <div className="relative w-full grid grid-cols-1 gap-5 max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-navy-800">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500"
        >
          <HiX className="text-2xl" />
        </button>

        <h1 className="text-center text-2xl font-bold text-navy-700 dark:text-white">
          إضافة أصول جديدة
        </h1>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          يمكنك إضافة أصول جديدة من خلال النموذج التالي
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleAddNewAssetsFunction}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اسم الأصل
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              صورة الأصل
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              ملاحظات
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-brand-500 py-2 font-semibold text-white"
          >
            إضافة أصل
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEssets;

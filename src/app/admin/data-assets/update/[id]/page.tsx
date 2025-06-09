'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import useUpdateFaq from 'hooks/useUpdateFaq';
import { HiX } from 'react-icons/hi';

const Page = () => {
  const { id } = useParams();
  const { update } = useUpdateFaq();
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [note, setNote] = React.useState('');
  const route = useRouter();

  const handleAddNewAssetsFunction = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newAsset = {
        name: name,
        image: image,
        note: note,
      };

      await update(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assets/${id}`,
        newAsset,
        true
      );
      console.log('✅ تم تحديث الأصل بنجاح');
      route.push('/admin/data-assets');
    } catch (error) {
      console.error('❌ فشل في التحديث:', error);
    }
  };

  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 dark:bg-opacity-80">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-navy-800">
        <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white">
          تعديل الأصل
        </h2>
        <button
          onClick={() => route.push('/admin/data-assets')}
          className="absolute right-3 top-3 text-gray-500"
        >
          <HiX className="text-2xl" />
        </button>

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
            تحديث الأصل
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useUpdateFaq from 'hooks/useUpdateFaq';
import { HiX } from 'react-icons/hi';
import useShow from 'hooks/useShow';
import { Asset } from 'types/data';

const Page = () => {
  const { id } = useParams();
  const route = useRouter();

  const { data } = useShow<Asset>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
    id,
  );
  const { update } = useUpdateFaq();

  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setNote(data.note || '');
      setCurrentImageUrl(typeof data.image === 'string' ? data.image : null);
    }
  }, [data]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('note', note);
      if (image) formData.append('image', image);

      await update(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assets/${id}`,
        formData,
        true,
      );
      console.log('✅ تم تحديث الأصل بنجاح');
      // route.push('/admin/data-assets');
    } catch (error) {
      console.error('❌ فشل في التحديث:', error);
    }
  };

  return (
    <div className="bg-black fixed top-24 inset-0 z-50 flex items-center justify-center bg-opacity-50 dark:bg-opacity-80">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-navy-800">
        <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
          تعديل الأصل
        </h2>
        <button
          onClick={() => route.push('/admin/data-assets')}
          className="absolute right-3 top-3 text-gray-500"
          aria-label="إغلاق"
        >
          <HiX className="text-2xl" />
        </button>

        <form className="mt-5 space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اسم الأصل
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              صورة الأصل
            </label>
            {currentImageUrl && (
              <img
                src={currentImageUrl}
                alt="صورة الأصل الحالية"
                className="mb-2 h-32 w-full object-contain rounded-md border"
              />
            )}
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
            className="w-full rounded-md bg-brand-500 py-2 font-semibold text-white hover:bg-brand-600 transition"
          >
            تحديث الأصل
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

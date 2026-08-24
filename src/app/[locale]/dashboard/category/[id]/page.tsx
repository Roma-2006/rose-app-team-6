'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Eye, ArrowLeft } from 'lucide-react';

export default function UpdateCategoryPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`);
        const resData = await response.json();
        if (resData.status && resData.payload) {
          const parsed =
            typeof resData.payload === 'string' ? JSON.parse(resData.payload) : resData.payload;
          setTitle(parsed.title || '');
          setDescription(parsed.description || '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadCategory();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      const resData = await response.json();
      if (resData.status) {
        router.push('/admin/categories');
      } else {
        alert(resData.message || 'Failed to update.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-xs text-gray-400">Loading data...</div>;

  return (
    <main className="p-8 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="hover:text-gray-600 flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <span>/</span>
        <span>Categories</span>
        <span>/</span>
        <span className="text-[#A32A38] font-medium">Update Category</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-6">Update Category: {title}</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-5"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#A32A38] bg-gray-50/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Description</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#A32A38] bg-gray-50/20 resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs text-blue-500 hover:text-blue-600 font-medium inline-flex items-center gap-1"
          >
            <Eye size={13} /> View Category image
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#A32A38] hover:bg-[#8A222E] text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm disabled:opacity-40"
        >
          {submitting ? 'Updating...' : 'Update Category'}
        </button>
      </form>
    </main>
  );
}

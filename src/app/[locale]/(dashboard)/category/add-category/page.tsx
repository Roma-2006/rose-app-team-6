'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCategoryPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState(
    '/api/upload/temp/550e8400-e29b-41d4-a716-446655440000'
  );
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image: imagePath }),
      });

      const resData = await response.json();
      if (resData.status) {
        router.push('/admin/categories');
      } else {
        alert(resData.message || 'Failed to create category');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto w-full">
      <div className="text-xs text-gray-400 mb-6 flex gap-2 items-center">
        <span>Dashboard</span> <span>&gt;</span> <span>Category</span> <span>&gt;</span>{' '}
        <span className="text-[#A32A38] font-medium">Add Category</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-6">Add a New Category</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Title *</label>
          <input
            type="text"
            required
            placeholder="Flowers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#A32A38] bg-gray-50/20"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Description *</label>
          <textarea
            required
            rows={4}
            placeholder="Fresh flowers and bouquets"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#A32A38] bg-gray-50/20 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Image Reference URL
          </label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            className="w-full px-4 py-2.5 text-xs font-mono border border-gray-200 rounded-xl bg-gray-100 text-gray-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#A32A38] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#8A222E] transition-colors disabled:opacity-40"
        >
          {submitting ? 'Processing...' : 'Add Category'}
        </button>
      </form>
    </main>
  );
}

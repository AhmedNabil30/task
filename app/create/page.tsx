'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createItem } from '../services/api';
import Button from '../components/Button';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {}; // Define newErrors with index signature

    if (!title) {
      newErrors['title'] = 'Title is required';
    }
    if (!body) {
      newErrors['body'] = 'Body is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await createItem({ title, body });
    router.push('/');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create New Item
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm space-y-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
          {errors.title && <p className="text-red-600">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
          {errors.body && <p className="text-red-600">{errors.body}</p>}
        </div>
        <Button color="blue" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreatePage;

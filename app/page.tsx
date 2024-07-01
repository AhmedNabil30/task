'use client';

import { useEffect, useState } from 'react';
import { getItems, deleteItem } from './services/api';
import Link from 'next/link';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';

interface Item {
  id: number;
  title: string;
  body: string;
}

const IndexPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [sortedItems, setSortedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, totalItems } = await getItems(
          currentPage,
          10,
          searchQuery,
          filterQuery,
        );
        setItems(data);
        setSortedItems(data);
        setTotalPages(Math.ceil(totalItems / 10));
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [currentPage, searchQuery, filterQuery]);

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item: Item) => item.id !== id));
      setSortedItems(sortedItems.filter((item: Item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = () => {
    const newSortedItems = [...sortedItems].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setSortedItems(newSortedItems);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Items
      </h1>
      <div className="flex justify-between mb-4">
        <div>
          <Link href="/create">
            <Button color="blue">Create New Item</Button>
          </Link>
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            aria-label="Search"
          />
          <input
            type="text"
            placeholder="Filter by title..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            aria-label="Filter by title"
          />
          <Button onClick={handleSort} color="blue">
            {sortDirection === 'asc' ? 'A to Z' : 'Z to A'}
          </Button>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {sortedItems.map((item) => (
          <li
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center transition-transform transform hover:scale-105 duration-300"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.body}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/edit/${item.id}`}>
                <Button color="yellow">Edit</Button>
              </Link>
              <Button color="red" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          aria-label="Previous Page"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IndexPage;

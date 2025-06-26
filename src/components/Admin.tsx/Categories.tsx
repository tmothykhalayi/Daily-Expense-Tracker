
import { useState } from 'react';
import { useCategoryState, useCreateCategoryState, useDeleteCategoryState } from '@/hooks/useCategories';
import type { TCategory } from '@/Types/allTypes';

function Categories() {
  const { data: categories, isLoading, error, isError } = useCategoryState();
  const createCategoryMutation = useCreateCategoryState();
  const deleteCategoryMutation = useDeleteCategoryState();
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  console.log('Categories data:', categories);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      await createCategoryMutation.mutateAsync({
        name: newCategoryName.trim(),
        userId: 1,
        created_at: new Date().toISOString(),
      });
      setNewCategoryName('');
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategoryMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-red-800">Error Loading Categories</h3>
                <p className="text-red-700">Unable to fetch category data from the server</p>
              </div>
            </div>
            
            <div className="bg-red-100 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium">Error Details:</p>
              <p className="text-red-700 text-sm mt-1">{error?.message || 'Unknown error'}</p>
              <p className="text-red-600 text-xs mt-2">Endpoint: /categories</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          ➕ Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
          <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim() || createCategoryMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createCategoryMutation.isPending ? 'Adding...' : 'Add'}
            </button>
            <button
              onClick={() => {
                setIsAddingCategory(false);
                setNewCategoryName('');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">All Categories ({categories?.length || 0})</h2>
        
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category: TCategory) => (
              <div
                key={category.id}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Created: {new Date(category.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">User ID: {category.userId}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={deleteCategoryMutation.isPending}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                      title="Delete category"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Categories Found</h3>
            <p className="text-gray-600 mb-4">Start by creating your first category to organize expenses.</p>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Create First Category
            </button>
          </div>
        )}
      </div>

      {/* Category Statistics */}
      {categories && categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Category Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-gray-600">Total Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {categories.filter((cat: TCategory) => cat.userId === 1).length}
              </div>
              <div className="text-gray-600">Admin Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {new Set(categories.map((cat: TCategory) => cat.userId)).size}
              </div>
              <div className="text-gray-600">Unique Users</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;

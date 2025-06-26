import type { TCategory } from "@/Types/allTypes";
import { url } from "@/constants/url";

// Get all categories
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${url}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Get category by id
export const getCategoryById = async (id: number) => {
    try {
        const response = await fetch(`${url}/categories/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
};

// Create category
export const createCategory = async (category: Omit<TCategory, 'id'>) => {
    try {
        const response = await fetch(`${url}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Update (patch) category
export const patchCategory = async (id: number, category: Partial<TCategory>) => {
    try {
        const response = await fetch(`${url}/categories/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete category
export const deleteCategory = async (id: number) => {
    try {
        const response = await fetch(`${url}/categories/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

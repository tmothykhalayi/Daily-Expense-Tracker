import type { TExpense } from "@/Types/allTypes";
import { url } from "@/constants/url";

// Get all expenses
export const getAllExpenses = async () => {
    try {
        const response = await fetch(`${url}/expenses`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

// Get expense by id
export const getExpenseById = async (id: number) => {
    try {
        const response = await fetch(`${url}/expenses/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expense by ID:', error);
        throw error;
    }
};

// Create expense
export const createExpense = async (expense: TExpense) => {
    try {
        const response = await fetch(`${url}/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
};

// Update (patch) expense
export const patchExpense = async (id: number, expense: TExpense): Promise<any> => {
    try {
        const response = await fetch(`${url}/expenses/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

// Delete expense
export const deleteExpense = async (id: number) => {
    try {
        const response = await fetch(`${url}/expenses/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

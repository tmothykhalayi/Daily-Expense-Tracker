import type { TUser } from "@/Types/allTypes";
import { url } from "@/constants/url";

// GET ALL USERS
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${url}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

//get user by id
export const getUserById = async (id: number) => {
    try {
        const response = await fetch(`${url}/users/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}
 
//create user
export const createUser = async (Users: TUser) => {
    try {
        const response = await fetch(`${url}/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Users)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

//patch user
export const patchUser = async (id: number, Users: TUser) => {
    try {
        const response = await fetch(`${url}/users/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Users)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

//delete user
export const deleteUser = async (id: number) => {
    try {
        const response = await fetch(`${url}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
} 
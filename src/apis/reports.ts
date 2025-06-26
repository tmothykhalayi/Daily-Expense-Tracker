import { url } from "@/constants/url";
import type { TReports } from "@/Types/allTypes";

// Get all reports
export const getAllReports = async () => {
    try {
        const response = await fetch(`${url}/reports`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};

// Get report by id
export const getReportById = async (id: number) => {
    try {
        const response = await fetch(`${url}/reports/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching report by ID:', error);
        throw error;
    }
};

// Create report
export const createReport = async (report: TReports) => {
    try {
        const response = await fetch(`${url}/reports`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
};

// Patch a report
export const patchReport = async (report: TReports, id: number) => {
    try {
        const response = await fetch(`${url}/reports/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating report:', error);
        throw error;
    }
};

// Delete a report
export const deleteReport = async (id: number) => {
    try {
        const response = await fetch(`${url}/reports/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting report:', error);
        throw error;
    }
};

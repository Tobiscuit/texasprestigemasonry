'use server';

// Hono API powered Next.js actions

export async function getUnassignedJobs() {
    try {
        // Fetch to local Hono edge API when fully wired
        // For now, return a mock response to satisfy the compiler
        return [];
    } catch (error) {
        console.error('Error fetching unassigned jobs:', error);
        return [];
    }
}

export async function getAllTechnicians() {
    try {
        // For now, return a mock response to satisfy the compiler
        return [];
    } catch (error) {
        console.error('Error fetching technicians:', error);
        return [];
    }
}
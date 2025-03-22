import { Note } from '@/lib/types';
import axios from 'axios'

export const notesApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {}
})

export const getNotes = async () => {
    try {
        const url = '/notes';
        const response = await notesApi.get(url);
        return response.data; // Return the fetched notes
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const updateNote = async (note: Partial<Note> & { id: string }) => {
    try {
        const url = `/notes/${note.id}`;
        const response = await notesApi.patch(url, note);
        return response.data;
    } catch (error) {
        console.error(`Error updating note ${note.id}:`, error);
        throw error;
    }
};
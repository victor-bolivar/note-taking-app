import axios from 'axios'

export const notesApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {}
})

export const getNotes = async () => {
    try {
        //const url = id ? `/notes/${id}` : '/notes'; // Fetch a single note or all notes
        const url = '/notes';
        const response = await notesApi.get(url);
        return response.data; // Return the fetched notes
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error; // Re-throw the error for further handling
    }
};
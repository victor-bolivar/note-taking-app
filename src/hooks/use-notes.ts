import { getNotes } from '@/api/notes.api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useNotes = () => {
    const queryClient = useQueryClient(); // Get the query client instance

    const issueQuery = useQuery({
        queryKey: ['issues'],
        queryFn: () => getNotes(),
        staleTime: 1000 * 60,
    });

    // Function to invalidate and refetch
    const refetchNotes = () => {
        queryClient.invalidateQueries({ queryKey: ['issues'] });
    };

    return {
        issueQuery,
        refetchNotes, // Expose this function
    };
};

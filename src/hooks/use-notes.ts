import { getNotes } from '@/api/notes.api';
import { useQuery } from '@tanstack/react-query';

export const
    useNotes = () => {
        const issueQuery = useQuery({
            queryKey: ['issues'],
            queryFn: () => getNotes(),
            staleTime: 1000 * 60,
        });

        // You could also just return { data, isFetching, error }
        return {
            issueQuery,
        };
    };
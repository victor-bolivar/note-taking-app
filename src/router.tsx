import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorPage from './pages/ErrorPage';
import ActiveNotes from './pages/ActiveNotes';
import ArchivedNotes from './pages/ArchivedNotes';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'notes',
                element: <ActiveNotes />
            },
            {
                path: "archived",
                element: <ArchivedNotes />
            }
        ]
    }
]);
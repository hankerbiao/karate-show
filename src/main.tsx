import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import SettingPage from "./pages/SettingPage.tsx";
import MatchesPage from "./pages/MatchesPage.tsx";


const router = createBrowserRouter([
    {
        'path': '/',
        'element': <HomePage/>
    },
    {
        'path': '/settings',
        'element': <SettingPage
        />
    },
    {
        'path': '/matches',
        'element': <MatchesPage
        />
    }
])
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)

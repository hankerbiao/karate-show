import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import HomePage from "./pages/HomePage.tsx";
import SettingPage from "./pages/SettingPage.tsx";
import TestPage from "./pages/TestPage.tsx";


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
        'path': '/test',
        'element': <TestPage
        />
    }
])
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
)

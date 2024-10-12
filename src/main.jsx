import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './components/Home.jsx';
import Error from './components/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [

    ]
  },
  {
    path: "/contact",
    element: <App />
  }
])

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
<RouterProvider router={router}>
    <App />
  </RouterProvider>,
  </StrictMode>,
)

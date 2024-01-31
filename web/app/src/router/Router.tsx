import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

export default function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home/>,
          errorElement: <>404</>,
        },
      ]);
  return (
    <RouterProvider router={router} />
  )
}

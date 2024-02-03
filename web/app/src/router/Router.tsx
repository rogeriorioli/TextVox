import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import DocumentPage from '../pages/Document';
import Layout from '../Layout';

export default function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home/>,
          errorElement: <>404</>,
        },
        {
          path :'/document/:id',
          element : <DocumentPage/>,
          errorElement: <>404</>,
        }
      ]);
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

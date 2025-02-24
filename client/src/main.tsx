import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchLibrary from './pages/HomePage.js'
import SavedGames from './pages/SavedGames.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchLibrary />
      }, {
        path: '/saved',
        element: <SavedGames />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

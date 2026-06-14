import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './roots/root'
import { businessRouter } from './roots/root'

function App() {
  return <RouterProvider router={localStorage.getItem("apex_role") === "CUSTOMER" ? businessRouter : router} />
}

export default App

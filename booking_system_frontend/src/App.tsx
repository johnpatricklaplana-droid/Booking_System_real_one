import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './roots/root'
import { businessRouter } from './roots/root'
import { UserProvider } from './provider/UserContext'

function App() {
  return <UserProvider>
    <RouterProvider router={localStorage.getItem("apex_role") === "CUSTOMER" ? businessRouter : router} />
  </UserProvider>
}

export default App

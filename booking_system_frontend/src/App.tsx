import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './roots/root'
import { UserProvider } from './provider/UserContext'

function App() {
  return <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
}

export default App

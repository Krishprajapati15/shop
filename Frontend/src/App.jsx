import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  // set theme of app after checking the state from localstorage:
  if (localStorage.getItem("isDarkMode") === "false") {
    // set light mode
    document.body.parentElement.setAttribute("data-theme","cupcake")
  }
  // else do nothing as dark mode is enabled by default
  
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body

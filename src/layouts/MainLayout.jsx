import { Outlet } from "react-router-dom"
import Sidebar from "../components/user/Sidebar"
import { useState } from "react"
import Navbar from "../components/user/Navbar"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className='bg-github min-h-screen flex'>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            className="hidden lg:flex lg:w-1/6"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="flex flex-col p-6"
        animate={{ 
          width: isSidebarOpen ? '83.333333%' : '100%' 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div>
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="py-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  )
}

export default MainLayout
import { Outlet } from "react-router-dom"
import Sidebar from "../components/common/navigation/Sidebar"
import { useState, useEffect } from "react"
import Navbar from "../components/common/navigation/Navbar"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '@/context/AuthContext';
import BottomBar from "@/components/common/navigation/BottomBar"

function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isLargeScreen, setIsLargeScreen] = useState(false)
    const { role } = useAuth();
    const isAdmin = role === 'admin' ? true : false

    useEffect(() => {
      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 1024)
      }
      
      checkScreenSize()
      
      window.addEventListener('resize', checkScreenSize)
      
      // Cleanup
      return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
      <div className="bg-github min-h-screen w-full overflow-y-auto">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              className="fixed top-0 left-0 w-1/6 h-screen z-30 hidden lg:block"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sidebar isAdmin={isAdmin} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div 
          className={`min-h-screen ${isLargeScreen && isSidebarOpen ? 'md:pl-1/6' : ''}`}
          style={{
            paddingLeft: isLargeScreen && isSidebarOpen ? 'calc(16.666667%)' : '0px'
          }}
        >
          <div className="p-6">
            <Navbar setIsSidebarOpen={setIsSidebarOpen} isAdmin={isAdmin} />
            <div className="py-2 pb-20 md:pb-6">
              <Outlet />
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-0 left-0 w-full lg:hidden z-30">
          <BottomBar isAdmin={isAdmin} />
        </div>
      </div>
    )
}

export default MainLayout
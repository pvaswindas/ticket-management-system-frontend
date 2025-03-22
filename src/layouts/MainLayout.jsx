import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className='bg-github min-h-screen flex items-center justify-center'>
      <Outlet />
    </div>
  )
}

export default MainLayout
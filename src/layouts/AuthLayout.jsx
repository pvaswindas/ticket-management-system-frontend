import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className='bg-gradient-to-b px-6 lg:px-0 from-jungle-green via-deep-teal to-github-dark min-h-screen flex items-center justify-center'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
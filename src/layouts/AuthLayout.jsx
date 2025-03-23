import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className='bg-gradient-to-b from-jungle-green via-deep-teal to-github-dark min-h-screen flex items-center justify-center'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
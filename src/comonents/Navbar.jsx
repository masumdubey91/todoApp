import React from 'react'

const Navbar = () => {
  return (
   <nav className="h-16 bg-gradient-to-r from-violet-700 to-fuchsia-600 flex justify-center items-center shadow-lg">
    <h1 className="text-2xl font-extrabold tracking-wide text-white">
        📝 Task Manager
    </h1>
    {/* <p className="text-center text-gray-200 mt-2 mb-8">
        Stay productive. Manage your daily tasks effortlessly.
      </p> */}
</nav>
  )
}

export default Navbar

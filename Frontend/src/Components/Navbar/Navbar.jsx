import { BuildingStorefrontIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Navbar = () => {
    const toggleDarkMode = () => {
        const mode = document.body.parentElement.getAttribute("data-theme");
        if (mode === "dark") {
            document.body.parentElement.setAttribute("data-theme", "cupcake")
            localStorage.setItem("isDarkMode", "false")
        } else {
            document.body.parentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("isDarkMode", "true")
        }
    }
    return (
        <div className="navbar h-10  rounded-md shadow-md mb-3">
            <div className='md:w-[80%] md:mx-auto flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className="icon mx-2">
                        <BuildingStorefrontIcon className='w-6 h-6' />
                    </div>
                    <a className="text-xl font-bold">Shop Inventory Management</a>
                </div>
                <div className='flex items-center px-2'>
                    <SunIcon onClick={toggleDarkMode} className='dark:hidden h-6 w-6' />
                    <MoonIcon onClick={toggleDarkMode} className='hidden dark:block h-6 w-6' />
                </div>
            </div>
        </div>
    )
}

export default Navbar
import React from 'react'

export const Navbar = () => {
    return (
        <div className='w-full bg-blue-300 flex justify-between items-center px-4 h-20'>
            <div className='text-2xl'>
                CHAT APP
            </div>
            <div className='flex gap-4 text-xl'>
                <div className='cursor-pointer bg-black text-white px-4 py-2 rounded-xl'>Signin</div>
                <div className='cursor-pointer bg-black text-white px-4 py-2 rounded-xl'>Signup</div>
            </div>
        </div>
    );
}

import React from 'react'
import LogoImg from '../../assets/logo.png'

export default function Footer() {
    return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img className='mb-5 w-32' src={LogoImg} />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro fugiat saepe praesentium hic totam rem iure in. Doloribus repellat nam ipsum, ipsa ullam, dicta illum laboriosam autem, quae et consequuntur!</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivary</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+20-011-433-639-12</li>
                    <li>abdalaagamal226@gmail.com</li>
                </ul>
            </div>
        </div>
        <div >
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
        </div>
    </div>
    )
}

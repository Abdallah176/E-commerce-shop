import React, { useState } from 'react'
import { FiMail } from 'react-icons/fi'

export default function NewsLetterBox() {
  const [subscribed, setSubscribed] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <div className="bg-white shadow-md rounded-2xl px-6 py-12 text-center max-w-2xl mx-auto my-12">
      <p className="text-3xl font-bold text-gray-800 mb-3">Get 20% Off Your First Order</p>
      <p className="text-gray-500 mb-6">
        Subscribe to our newsletter and stay updated on the latest offers and trends.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row items-center gap-4 justify-center"
      >
        <div className="relative w-full sm:w-auto flex-1">
          <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300"
        >
          Subscribe
        </button>
      </form>

      {subscribed && (
        <p className="mt-4 text-green-600 font-medium animate-fade-in">
           You’ve successfully subscribed!
        </p>
      )}
    </div>
  )
}

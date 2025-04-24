import { FiRepeat, FiHeadphones } from 'react-icons/fi'
import { MdOutlineVerifiedUser } from 'react-icons/md'

export default function OurPolicy() {
  const policies = [
    {
      icon: <FiRepeat size={36} className="text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      title: 'Easy Exchange',
      description: 'Hassle-free exchange within a few steps.',
    },
    {
      icon: <MdOutlineVerifiedUser size={36} className="text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      title: '7 Days Return',
      description: 'Free returns within 7 days of purchase.',
    },
    {
      icon: <FiHeadphones size={36} className="text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />,
      title: '24/7 Support',
      description: 'We are here for you anytime, anywhere.',
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-10 md:px-20 mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
        Why Shop With Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="group bg-white shadow-md hover:shadow-lg rounded-2xl p-6 text-center transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-gray-100">
                {policy.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{policy.title}</h3>
            <p className="text-gray-500 text-sm">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

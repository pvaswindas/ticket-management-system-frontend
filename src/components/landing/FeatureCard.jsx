import React from 'react'

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-github p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-jungle-green/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

export default FeatureCard

import React from 'react'
import { CheckCircle } from 'lucide-react'

function IntegrationSection() {
  return (
    <section id="integration" className="bg-github py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
              alt="Enterprise Integration" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-8">Seamless Enterprise Integration</h2>
            <div className="grid gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-jungle-green">Enterprise-Ready Infrastructure</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-jungle-green" />
                    SAML/SSO Authentication
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-jungle-green" />
                    Role-Based Access Control
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-jungle-green">Security & Compliance</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-jungle-green" />
                    ISO 27001 Certified
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-jungle-green" />
                    End-to-End Encryption
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationSection
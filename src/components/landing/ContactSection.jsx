import React from 'react'
import { CheckCircle } from 'lucide-react'

function ContactSection() {
  return (
    <section id="contact" className="bg-gradient-to-b from-github to-jungle-green text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Get in Touch
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Our enterprise team is ready to assist you with any questions about our ticket management solution.
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                24/7 Enterprise Support
              </p>
              <p className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Dedicated Account Manager
              </p>
              <p className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Custom Implementation Support
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
              alt="Enterprise Support Team" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
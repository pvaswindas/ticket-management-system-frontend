import React from 'react'
import { Ticket, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import FeatureCard from './FeatureCard'

function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Enterprise Support Management Solution
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Ticket className="h-8 w-8 text-jungle-green" />}
            title="Centralized Ticketing"
            description="Unified platform for managing all internal support requests across departments"
          />
          <FeatureCard 
            icon={<CheckCircle className="h-8 w-8 text-jungle-green" />}
            title="Automated Workflow"
            description="Streamlined processes with custom automation rules and SLA management"
          />
          <FeatureCard 
            icon={<Clock className="h-8 w-8 text-jungle-green" />}
            title="Priority Management"
            description="Advanced prioritization system with escalation protocols"
          />
          <FeatureCard 
            icon={<BarChart3 className="h-8 w-8 text-jungle-green" />}
            title="Performance Analytics"
            description="Comprehensive reporting and insights for operational excellence"
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
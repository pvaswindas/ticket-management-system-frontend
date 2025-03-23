import React from 'react'
import { Ticket, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TicSol from "../../assets/icons/ticket.png"

function HeroSection() {
    const navigate = useNavigate()
    return (
        <header className="bg-gradient-to-tr from-github-dark to-dark-jungle-green text-white">
            <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={TicSol} alt="" className="w-10" />
                    <span className="text-2xl font-bold">TicSol</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#features" className="hover:text-gray-200 transition">Features</a>
                    <a href="#integration" className="hover:text-gray-200 transition">Integration</a>
                    <a href="#contact" className="hover:text-gray-200 transition">Contact</a>
                </div>
                <button
                    className="bg-github text-white px-6 py-2 rounded-full font-semibold hover:bg-charcoal-gray
                    transition flex items-center cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                </button>
            </nav>
            <div className="container mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
                <div className="text-left">
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8">
                        Enterprise-Grade Ticket Management
                    </h1>
                    <p className="text-lg md:text-xl md:mb-12 text-gray-100">
                        Streamline your internal support operations with our comprehensive ticket management system, designed specifically for enterprise needs.
                    </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" 
                        alt="Enterprise Support Dashboard" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>
    )
}

export default HeroSection
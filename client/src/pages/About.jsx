import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-x-hidden select-none selection:bg-amber-100 selection:text-black">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-100/40 via-yellow-100/25 to-transparent blur-[120px]" />
        <div className="absolute top-[30%] -right-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl from-amber-100/30 to-transparent blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #111 1px, transparent 1px),
            linear-gradient(to bottom, #111 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col min-h-screen justify-between">
        
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-200/60 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:shadow group-hover:scale-105">
              <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-extrabold tracking-tight text-lg text-gray-900">auditflow</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors flex items-center">
              <span className="text-[10px] text-gray-300 mr-1.5 font-medium">01</span> Home
            </Link>
            <Link to="/about" className="text-xs font-semibold text-black flex items-center">
              <span className="text-[10px] text-amber-500 mr-1.5 font-medium">02</span> About us
            </Link>
            <Link to="/dashboard" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors flex items-center">
              <span className="text-[10px] text-gray-300 mr-1.5 font-medium">03</span> Investment
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all duration-300 px-5 py-2.5 rounded-full shadow-md flex items-center space-x-1.5"
              >
                <span>Dashboard</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to="/login" className="text-xs font-bold text-gray-700 hover:text-black transition-colors px-3 py-2">
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="text-xs font-bold bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-300 px-5 py-2.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
              >
                Sign up
              </Link>
            </SignedOut>
          </div>
        </header>

        {/* Content Section */}
        <main className="my-auto py-16 flex flex-col space-y-12">
          
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-full px-3 py-1.5 shadow-sm">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500">
                02 / ABOUT US
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight">
              An open ledger for autonomous investment research
            </h1>
            <p className="text-gray-600/90 text-base md:text-lg leading-relaxed font-medium">
              Auditflow was built on a simple premise: investment tools should not be black boxes. We combine advanced multi-agent LangGraph workflows with clear audit trails so that every thesis, news sentiment scan, and valuation model is completely traceable and verifiable.
            </p>
          </div>

          {/* Grid Layout of Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            
            {/* Tech Item 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <span className="text-orange-600 font-bold text-xs">LG</span>
              </div>
              <h3 className="text-lg font-extrabold text-black">LangGraph Workflows</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                Our analysis is driven by hierarchical LangGraph state machines. These agents retrieve data, cross-reference news, verify statements, and outline reasoning trails before compiling final findings.
              </p>
            </div>

            {/* Tech Item 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs">CK</span>
              </div>
              <h3 className="text-lg font-extrabold text-black">Clerk Authentication</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                Enterprise-grade security powered by Clerk. Secure sessions, instant SSO fallback redirect routing, and seamless profile management keep your private research secure and isolated.
              </p>
            </div>

            {/* Tech Item 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xs">AT</span>
              </div>
              <h3 className="text-lg font-extrabold text-black">Full Audit Trails</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                Every API call, retrieved news article snippet, and intermediate agent reasoning step is logged. Click through the timeline to see exactly how our AI agents formulated their buy/sell theses.
              </p>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200/35 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-gray-400">
          <div className="flex items-center space-x-8">
            <span className="text-[10px] font-extrabold tracking-wider uppercase">Our partners</span>
            <div className="flex items-center space-x-6 font-bold tracking-tight text-sm">
              <span className="hover:text-black cursor-pointer transition-colors">alchemy</span>
              <span className="hover:text-black cursor-pointer transition-colors tracking-wide uppercase text-xs">binance</span>
              <span className="hover:text-black cursor-pointer transition-colors">coinbase</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <span className="text-white text-xs font-black">N</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default About;

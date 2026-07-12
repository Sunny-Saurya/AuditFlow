import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-x-hidden select-none selection:bg-amber-100 selection:text-black">
      
      {/* Background Gradients and Ambient Glows */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        {/* Warm Golden Glow Top Left */}
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-100/40 via-yellow-100/25 to-transparent blur-[120px]" />
        
        {/* Soft Glow Center Right */}
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl from-amber-100/30 via-orange-50/20 to-transparent blur-[100px]" />

        {/* Soft Glow Bottom Left */}
        <div className="absolute bottom-[5%] -left-[15%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-amber-50/30 via-transparent to-transparent blur-[100px]" />
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
        
        {/* Header / Navbar */}
        <header className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-200/60 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:shadow group-hover:scale-105">
              {/* Geometric Hexagon/Diamond Logo */}
              <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-heading font-bold tracking-tight text-lg text-gray-900">auditflow</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-xs font-semibold text-black transition-colors flex items-center">
              <span className="text-[10px] text-amber-500 mr-1.5 font-medium">01</span> Home
            </Link>
            <Link to="/about" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors flex items-center">
              <span className="text-[10px] text-gray-300 mr-1.5 font-medium">02</span> About us
            </Link>
            <Link to="/dashboard" className="text-xs font-semibold text-gray-400 hover:text-black transition-colors flex items-center">
              <span className="text-[10px] text-gray-300 mr-1.5 font-medium">03</span> Investment
            </Link>
          </nav>

          {/* Auth Buttons */}
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

        {/* Hero Section Container */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-full px-3 py-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500">
                Research you can inspect
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-[44px] sm:text-[56px] md:text-[68px] lg:text-[72px] font-bold leading-[0.98] tracking-[-0.04em] text-gradient">
              Investing is <br />
              easy and <br />
              affordable <br />
              for everyone
            </h1>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/signup" 
                className="bg-black text-white hover:bg-neutral-800 transition-all duration-300 px-8 py-4 text-xs font-bold tracking-wider rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2 group"
              >
                <span>GET STARTED</span>
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a 
                href="#learn-more" 
                className="bg-white hover:bg-neutral-50 border border-black/15 text-black transition-all duration-300 px-8 py-4 text-xs font-bold tracking-wider rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                LEARN MORE
              </a>
            </div>

            {/* Subtitle / Description */}
            <p className="text-gray-600/80 text-sm md:text-[15px] font-medium leading-relaxed max-w-lg pt-4">
              We combine live research, structured decisioning, and a visible audit trail so you can review the reasoning behind every thesis instead of relying on a black box.
            </p>

            {/* Feature Tags / Badges */}
            <div className="flex flex-wrap gap-3 pt-6">
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 text-xs font-semibold text-gray-850 shadow-sm">
                <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-bold mr-2 uppercase tracking-wide border border-orange-100">Live</span>
                Streaming analysis
              </div>
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 text-xs font-semibold text-gray-850 shadow-sm">
                <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[10px] font-bold mr-2 uppercase tracking-wide border border-green-100">Mongo</span>
                Session history
              </div>
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 text-xs font-semibold text-gray-850 shadow-sm">
                <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[10px] font-bold mr-2 uppercase tracking-wide border border-indigo-100">React</span>
                Modern product UI
              </div>
            </div>

          </div>

          {/* Right Column: Visual Illustration (Floating Cards Grid) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center h-[550px] md:h-[650px] w-full">
            
            {/* Grid container with fixed scale/layout matching image */}
            <div className="relative w-full max-w-[500px] md:max-w-[560px] h-[500px] md:h-[580px] z-10">
              
              {/* Card 1: Control your finance (Top-left, capsule shape) */}
              <div className="absolute top-[12%] left-[0%] w-[150px] h-[56px] bg-white rounded-full border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center px-4 space-x-3 hover:translate-y-[-2px] transition-transform duration-300">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold text-neutral-800 leading-tight">Control your</span>
                  <span className="text-[10px] font-extrabold text-neutral-800 leading-tight">finance</span>
                </div>
              </div>

              {/* Card 2: Black square card (Top-middle) */}
              <div className="absolute top-[8%] left-[34%] w-[84px] h-[84px] bg-black rounded-[28px] shadow-lg hover:scale-105 transition-transform duration-300" />

              {/* Card 3: Ease & convenience (Top-right) */}
              <div className="absolute top-[8%] left-[54%] right-[0%] h-[84px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 flex flex-col justify-center hover:translate-y-[-2px] transition-transform duration-300">
                <h3 className="text-xs font-extrabold text-neutral-800 mb-0.5">Ease & convenience</h3>
                <p className="text-[10px] text-gray-400 font-medium">Clear workflows and fast actions.</p>
              </div>

              {/* Card 4: Mini Bar Chart Icon Card (Middle-left) */}
              <div className="absolute top-[30%] left-[34%] w-[84px] h-[84px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <line x1="12" y1="20" x2="12" y2="8" />
                  <line x1="18" y1="20" x2="18" y2="12" />
                </svg>
              </div>

              {/* Card 5: Transparency & reliability (Middle-right) */}
              <div className="absolute top-[28%] left-[54%] right-[0%] h-[100px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 flex flex-col justify-center hover:translate-y-[-2px] transition-transform duration-300">
                <h3 className="text-xs font-extrabold text-neutral-800 mb-0.5">Transparency & reliability</h3>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Every call, note, and decision is visible.</p>
              </div>

              {/* Card 6: Analytics Vertical Card (Bottom-left) */}
              <div className="absolute top-[46%] left-[0%] w-[150px] h-[180px] bg-white rounded-[32px] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.04)] p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-300">
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Analytics</span>
                  <span className="text-3xl font-extrabold text-black tracking-tighter">21</span>
                  <span className="text-sm font-extrabold text-neutral-800">023.45</span>
                  <span className="text-[10px] font-bold text-gray-400">USD</span>
                </div>
                
                {/* Horizontal color block representation bars */}
                <div className="flex flex-col space-y-1.5 mt-2">
                  <div className="h-2 w-full bg-black rounded-sm" />
                  <div className="h-2 w-[70%] bg-neutral-100 rounded-sm border border-neutral-200" />
                  <div className="h-2 w-[85%] bg-neutral-800 rounded-sm" />
                </div>
              </div>

              {/* Card 7: Black Vertical Block Card (Bottom-middle) */}
              <div className="absolute top-[49%] left-[34%] w-[84px] h-[110px] bg-black rounded-[28px] shadow-lg hover:scale-105 transition-transform duration-300" />

              {/* Card 8: Expert knowledge with LIVE badge (Bottom-right) */}
              <div className="absolute top-[51%] left-[54%] right-[0%] h-[126px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-neutral-800">Expert knowledge</h3>
                  <span className="bg-black text-white text-[7px] font-extrabold tracking-widest px-2 py-0.5 rounded-full uppercase">LIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="h-10 bg-neutral-50 rounded-lg border border-neutral-200/40" />
                  <div className="h-10 bg-neutral-100 rounded-lg" />
                  <div className="h-10 bg-neutral-50 rounded-lg border border-neutral-200/40" />
                </div>
              </div>

              {/* Card 9: Yellow concentric interactive element (Bottom-most right) */}
              <div className="absolute top-[76%] left-[54%] right-[0%] h-[100px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-xl border border-neutral-200 flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg bg-amber-400 border border-neutral-800 shadow-sm" />
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* Footer Partners / Bottom branding */}
        <footer className="border-t border-gray-200/35 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Partners list */}
          <div className="flex items-center space-x-8">
            <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase">Our partners</span>
            <div className="flex items-center space-x-6 text-gray-400 font-bold tracking-tight text-sm">
              <span className="hover:text-black cursor-pointer transition-colors">alchemy</span>
              <span className="hover:text-black cursor-pointer transition-colors tracking-wide uppercase text-xs">binance</span>
              <span className="hover:text-black cursor-pointer transition-colors">coinbase</span>
            </div>
          </div>

          {/* Floating branding/logo in bottom corner */}
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

export default LandingPage;

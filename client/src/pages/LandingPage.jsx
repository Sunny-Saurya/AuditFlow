import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeChartMonth, setActiveChartMonth] = useState('Monthly');
  const [activeTab, setActiveTab] = useState('Monthly');

  const handleGuestLogin = () => {
    localStorage.setItem('auditflow_guest_mode', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-x-hidden select-none selection:bg-amber-100 selection:text-black">
      
      
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-100/40 via-yellow-100/25 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl from-amber-100/30 via-orange-50/20 to-transparent blur-[100px]" />
        <div className="absolute bottom-[5%] -left-[15%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-amber-50/30 via-transparent to-transparent blur-[100px]" />
      </div>

      
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

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        
        
        <div className="sticky top-4 z-50 px-4 sm:px-6 pt-2">
          <header className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-[32px] px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-between transition-all duration-300">
            
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
                <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-heading font-extrabold tracking-tight text-xl text-black">auditflow</span>
            </Link>

            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors">Product</Link>
              <a href="#built-for-everyone" className="text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors">Features</a>
              <a href="#built-for-everyone" className="text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors">Pricing</a>
              <a href="#testimonials" className="text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors">Resources</a>
            </nav>

            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <SignedIn>
                <Link 
                  to="/dashboard" 
                  className="text-xs sm:text-sm font-semibold bg-black text-white hover:bg-neutral-800 transition px-5 py-2.5 rounded-2xl shadow-md flex items-center space-x-1.5"
                >
                  <span>Dashboard</span>
                  <span className="text-amber-400">⚡</span>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <button 
                  onClick={handleGuestLogin}
                  className="hidden sm:flex items-center space-x-1 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-3.5 py-2 rounded-2xl transition"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-1" />
                  <span>Guest</span>
                </button>
                <Link 
                  to="/login" 
                  className="bg-white border border-gray-200/80 text-black hover:bg-neutral-50 transition px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold shadow-sm"
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-black text-white hover:bg-neutral-800 transition px-5 py-2 rounded-2xl text-xs sm:text-sm font-semibold shadow-md"
                >
                  Sign up
                </Link>
              </SignedOut>
            </div>
          </header>
        </div>

        
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-12 max-w-7xl mx-auto px-6 md:px-12 w-full">
          
          
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full px-3.5 py-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-600">
                RESEARCH YOU CAN INSPECT
              </span>
            </div>

            
            <h1 className="font-heading text-[44px] sm:text-[56px] md:text-[68px] lg:text-[72px] font-bold leading-[0.98] tracking-[-0.04em] text-black">
              Investing is <br />
              easy and <br />
              affordable <br />
              for everyone
            </h1>

            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/signup" 
                className="bg-black text-white hover:bg-neutral-800 transition-all duration-300 px-8 py-4 text-xs font-bold tracking-wider rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2 group"
              >
                <span>GET STARTED</span>
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <button 
                onClick={handleGuestLogin}
                className="bg-amber-500 hover:bg-amber-600 text-black transition-all duration-300 px-8 py-4 text-xs font-bold tracking-wider rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-1.5"
              >
                <span>TRY AS GUEST (INSTANT)</span>
                <span>⚡</span>
              </button>
              <a 
                href="#built-for-everyone" 
                className="bg-white hover:bg-neutral-50 border border-gray-300 text-black transition-all duration-300 px-8 py-4 text-xs font-bold tracking-wider rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                LEARN MORE
              </a>
            </div>

            
            <p className="text-gray-600 text-sm md:text-[15px] font-medium leading-relaxed max-w-lg pt-4">
              We combine live research, structured decisioning, and a visible audit trail so you can review the reasoning behind every thesis instead of relying on a black box.
            </p>



          </div>

          
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center h-[550px] md:h-[650px] w-full">
            <div className="relative w-full max-w-[500px] md:max-w-[560px] h-[500px] md:h-[580px] z-10">
              
              
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

              
              <div className="absolute top-[8%] left-[34%] w-[84px] h-[84px] bg-black rounded-[28px] shadow-lg hover:scale-105 transition-transform duration-300" />

              
              <div className="absolute top-[8%] left-[54%] right-[0%] h-[84px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 flex flex-col justify-center hover:translate-y-[-2px] transition-transform duration-300">
                <h3 className="text-xs font-extrabold text-neutral-800 mb-0.5">Ease & convenience</h3>
                <p className="text-[10px] text-gray-400 font-medium">Clear workflows and fast actions.</p>
              </div>

              
              <div className="absolute top-[30%] left-[34%] w-[84px] h-[84px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <line x1="12" y1="20" x2="12" y2="8" />
                  <line x1="18" y1="20" x2="18" y2="12" />
                </svg>
              </div>

              
              <div className="absolute top-[28%] left-[54%] right-[0%] h-[100px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 flex flex-col justify-center hover:translate-y-[-2px] transition-transform duration-300">
                <h3 className="text-xs font-extrabold text-neutral-800 mb-0.5">Transparency & reliability</h3>
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Every call, note, and decision is visible.</p>
              </div>

              
              <div className="absolute top-[46%] left-[0%] w-[150px] h-[180px] bg-white rounded-[32px] border border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.04)] p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-300">
                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Analytics</span>
                  <span className="text-3xl font-extrabold text-black tracking-tighter">21</span>
                  <span className="text-sm font-extrabold text-neutral-800">023.45</span>
                  <span className="text-[10px] font-bold text-gray-400">USD</span>
                </div>
                
                
                <div className="flex flex-col space-y-1.5 mt-2">
                  <div className="h-2 w-full bg-black rounded-sm" />
                  <div className="h-2 w-[70%] bg-neutral-100 rounded-sm border border-neutral-200" />
                  <div className="h-2 w-[85%] bg-neutral-800 rounded-sm" />
                </div>
              </div>

              
              <div className="absolute top-[49%] left-[34%] w-[84px] h-[110px] bg-black rounded-[28px] shadow-lg hover:scale-105 transition-transform duration-300" />

              
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

              
              <div className="absolute top-[76%] left-[54%] right-[0%] h-[100px] bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-xl border border-neutral-200 flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg bg-amber-400 border border-neutral-800 shadow-sm" />
                </div>
              </div>

            </div>
          </div>
        </main>

        

        
        <section id="built-for-everyone" className="max-w-7xl mx-auto px-6 py-20 w-full border-t border-gray-200/50 mt-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-4">
              Built for everyone
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
              Thousands of businesses, from startups to enterprises, use auditflow to handle quantitative research and valuation synthesis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#FBFBFA] rounded-2xl h-56 p-5 border border-gray-100/80 relative flex flex-col justify-between overflow-hidden">
                
                <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-gray-150 shadow-2xl relative z-10 max-w-[240px] w-full mx-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-xs font-extrabold text-black">Valuation Report</span>
                  </div>
                  <div className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center cursor-pointer" onClick={() => setActiveChartMonth(activeChartMonth === 'Monthly' ? 'Quarterly' : 'Monthly')}>
                    <span>{activeChartMonth}</span>
                    <svg className="w-2.5 h-2.5 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md z-20 animate-bounce">
                  +17% ALPHA
                </div>

                
                <div className="flex items-end justify-around h-32 pt-6 px-4 space-x-3">
                  <div className="flex flex-col items-center space-y-1 w-full">
                    <div className="w-full bg-purple-400 rounded-t-lg h-16 group-hover:h-20 transition-all duration-500" />
                    <span className="text-[9px] font-bold text-gray-400">Mon</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1 w-full">
                    <div className="w-full bg-orange-500 rounded-t-lg h-24 group-hover:h-28 transition-all duration-500" />
                    <span className="text-[9px] font-bold text-gray-400">Tue</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1 w-full">
                    <div className="w-full bg-purple-600 rounded-t-lg h-28 group-hover:h-32 transition-all duration-500" />
                    <span className="text-[9px] font-bold text-gray-400">Wed</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1 w-full">
                    <div className="w-full bg-red-500 rounded-t-lg h-20 group-hover:h-24 transition-all duration-500" />
                    <span className="text-[9px] font-bold text-gray-400">Thu</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1 w-full">
                    <div className="w-full bg-amber-400 rounded-t-lg h-14 group-hover:h-18 transition-all duration-500" />
                    <span className="text-[9px] font-bold text-gray-400">Fri</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-xl font-extrabold text-black">For financial professionals</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  Use a single cloud system for your equities, financial models, SEC filings, and quantitative research workflows.
                </p>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#FBFBFA] rounded-2xl h-56 p-5 border border-gray-100/80 relative flex items-center justify-center overflow-hidden">
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36 rounded-full border border-gray-200/60" />
                  <div className="w-56 h-56 rounded-full border border-gray-200/40 absolute" />
                  <div className="w-72 h-72 rounded-full border border-gray-100 absolute" />
                </div>

                
                <div className="absolute w-52 h-20 bg-neutral-100/80 rounded-2xl shadow border border-gray-200/60 transform translate-y-6 scale-90 opacity-70" />
                <div className="absolute w-56 h-20 bg-neutral-100 rounded-2xl shadow border border-gray-200/80 transform translate-y-3 scale-95 opacity-85" />

                
                <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200/80 shadow-2xl flex items-center space-x-3 relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-md text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <span className="text-xs font-extrabold text-black">Make Data-Driven Decisions</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-xl font-extrabold text-black">For managers & leaders</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  Get always up-to-date SEC data, monitor valuation performance, and review multi-agent audit logs across the company.
                </p>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#FBFBFA] rounded-2xl h-56 p-5 border border-gray-100/80 relative flex items-center justify-center overflow-hidden">
                
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px)', backgroundSize: '28px 100%' }} />

                
                <div className="absolute w-36 h-28 bg-white rounded-2xl border border-gray-200 shadow-md transform -translate-x-12 -translate-y-2 rotate-[-6deg] p-3 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-neutral-200 rounded" />
                    <div className="h-1.5 w-2/3 bg-neutral-150 rounded" />
                  </div>
                </div>
                <div className="absolute w-36 h-28 bg-white rounded-2xl border border-gray-200 shadow-md transform translate-x-12 translate-y-2 rotate-[6deg] p-3 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-neutral-200 rounded" />
                    <div className="h-1.5 w-3/4 bg-neutral-150 rounded" />
                  </div>
                </div>

                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-500 flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border-2 border-white/40">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-xl font-extrabold text-black">For legal & risk teams</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  auditflow helps legal & compliance teams by streamlining SEC filing checks, contract audit trails, and policy verification.
                </p>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#FBFBFA] rounded-2xl h-56 p-5 border border-gray-100/80 relative flex flex-col justify-between overflow-hidden">
                
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200/80 shadow-md flex items-center justify-center text-orange-500 font-extrabold">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-200/70 shadow-sm text-[9px] font-extrabold">
                    <button onClick={() => setActiveTab('Daily')} className={`px-2 py-1 rounded-lg transition ${activeTab === 'Daily' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}>Daily</button>
                    <button onClick={() => setActiveTab('Weekly')} className={`px-2 py-1 rounded-lg transition ${activeTab === 'Weekly' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}>Weekly</button>
                    <button onClick={() => setActiveTab('Monthly')} className={`px-2 py-1 rounded-lg transition ${activeTab === 'Monthly' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}>Monthly</button>
                  </div>
                </div>

                
                <div className="flex items-end justify-between h-32 pt-4 px-2 space-x-3">
                  <div className="flex flex-col items-center justify-end h-full w-full">
                    <div className="w-full bg-neutral-200/80 rounded-t-lg h-12 group-hover:h-16 transition-all duration-500" />
                  </div>
                  <div className="flex flex-col items-center justify-end h-full w-full">
                    <div className="w-full bg-neutral-200/80 rounded-t-lg h-20 group-hover:h-24 transition-all duration-500" />
                  </div>
                  <div className="flex flex-col items-center justify-end h-full w-full relative">
                    <div className="absolute -top-1 bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow z-10">46%</div>
                    <div className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg h-24 group-hover:h-28 transition-all duration-500 shadow-md" />
                  </div>
                  <div className="flex flex-col items-center justify-end h-full w-full">
                    <div className="w-full bg-neutral-200/80 rounded-t-lg h-16 group-hover:h-20 transition-all duration-500" />
                  </div>
                  <div className="flex flex-col items-center justify-end h-full w-full">
                    <div className="w-full bg-neutral-200/80 rounded-t-lg h-24 group-hover:h-28 transition-all duration-500" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-xl font-extrabold text-black">All employee & data at once</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  Instant quantitative measurements, valuation benchmarks, and SEC extraction consolidated across US and India markets.
                </p>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#FBFBFA] rounded-2xl h-56 p-5 border border-gray-100/80 relative flex items-center justify-center overflow-hidden">
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36 rounded-full border border-gray-200/60" />
                  <div className="w-56 h-56 rounded-full border border-gray-200/40 absolute" />
                  <div className="w-72 h-72 rounded-full border border-gray-100 absolute" />
                </div>

                <div className="absolute w-56 h-20 bg-neutral-100/90 rounded-2xl shadow border border-gray-200/80 transform translate-y-4 scale-95 opacity-80" />

                
                <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200/80 shadow-2xl flex items-center space-x-3 relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-md text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span className="text-xs font-extrabold text-black">Access Real-Time Insights</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-xl font-extrabold text-black">Access Real-Time Insights</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  Live streaming analysis nodes connecting Alpha Vantage API, Tavily web scanner, and Gemini LLM synthesis right before your eyes.
                </p>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/70 shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#FBFBFA] rounded-2xl h-56 p-5 border border-gray-100/80 relative flex items-center justify-center overflow-hidden">
                
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-gray-300/80 animate-spin-slow" />
                  
                  
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 shadow-lg flex items-center justify-center text-black font-extrabold z-10 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>

                  
                  <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                    
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Analyst" className="w-full h-full object-cover animate-spin-reverse-slow" />
                    </div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Analyst" className="w-full h-full object-cover animate-spin-reverse-slow" />
                    </div>
                    <div className="absolute top-8 left-4 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100" alt="Analyst" className="w-full h-full object-cover animate-spin-reverse-slow" />
                    </div>
                    <div className="absolute top-8 right-4 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Analyst" className="w-full h-full object-cover animate-spin-reverse-slow" />
                    </div>
                    <div className="absolute bottom-8 left-4 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Analyst" className="w-full h-full object-cover animate-spin-reverse-slow" />
                    </div>
                    <div className="absolute bottom-8 right-4 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100" alt="Analyst" className="w-full h-full object-cover animate-spin-reverse-slow" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-xl font-extrabold text-black">For teams & employees</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed mt-1.5">
                  Seamless pair research, shared audit trails, and verifiable decision logs across your entire investment desk.
                </p>
              </div>
            </div>

          </div>
        </section>

        
        <section className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center overflow-hidden w-full">
          
          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 shadow-md flex items-center justify-center text-orange-500 mb-6">
            <svg className="w-6 h-6 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black max-w-3xl leading-tight mb-16">
            Integrate with your existing tools in seconds
          </h2>

          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto py-8">
            
            
            <div className="bg-white rounded-[32px] border border-gray-200/80 shadow-[0_12px_40px_rgb(0,0,0,0.05)] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transform -rotate-12 hover:-translate-y-3 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl shadow-inner">
                T
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] border border-gray-200/80 shadow-[0_12px_40px_rgb(0,0,0,0.05)] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transform -rotate-6 hover:-translate-y-3 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-black text-2xl shadow-inner">
                M
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] border-2 border-black/10 shadow-[0_20px_50px_rgb(0,0,0,0.12)] w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center transform rotate-0 hover:-translate-y-3 hover:scale-110 transition-all duration-300 z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg text-white">
                <svg className="w-9 h-9 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] border border-gray-200/80 shadow-[0_12px_40px_rgb(0,0,0,0.05)] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transform rotate-6 hover:-translate-y-3 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 font-black text-xl shadow-inner">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
              </div>
            </div>

            
            <div className="bg-white rounded-[32px] border border-gray-200/80 shadow-[0_12px_40px_rgb(0,0,0,0.05)] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transform rotate-12 hover:-translate-y-3 hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-xl shadow-inner">
                O
              </div>
            </div>

          </div>

          
          <div className="mt-8">
            <h3 className="font-heading text-lg font-extrabold text-black">LangGraph & Gemini LLM</h3>
            <p className="text-gray-400 text-xs font-medium mt-1">Video feedback, SEC filing scanning & real-time valuation synthesis</p>
          </div>
        </section>

        
        <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center w-full">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-4">
            Words of Appreciation
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium max-w-xl mx-auto mb-24">
            Thousands of businesses, from startups to enterprises, use auditflow to handle quantitative research.
          </p>

          
          <div className="w-full max-w-2xl mx-auto relative px-2 sm:px-6 pb-12">
            
            
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-[40px] pt-20 px-6 sm:px-14 pb-28 shadow-[0_25px_60px_rgb(124,58,237,0.25)] relative overflow-hidden border border-purple-400/30">
              
              
              <div className="absolute top-0 left-0 right-0 h-40 bg-purple-900/20 transform -skew-y-6 pointer-events-none" />

              
              <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-gray-100 max-w-lg mx-auto relative z-20 -mt-24 transform hover:-translate-y-3 transition-transform duration-500 text-center">
                
                
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white -mt-20 mx-auto mb-4 bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250" alt="Sarah Mitchell" className="w-full h-full object-cover" />
                </div>

                <h3 className="font-heading text-2xl font-extrabold text-black">Sarah Mitchell</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 mb-4">Chief Equity Analyst at Nexa Capital</p>

                
                <div className="flex items-center justify-center space-x-1.5 text-amber-400 text-base font-extrabold mb-6">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  <span className="text-black ml-1.5 font-heading text-sm">5.0</span>
                </div>

                <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed italic">
                  "auditflow has completely revolutionized our equity research workflows, making tasks like financial modeling, 10-K extraction, and valuation tracking 10x more efficient. Our analysts stay organized and uncover deep insights effortlessly."
                </p>
              </div>

              
              <div className="absolute bottom-0 left-0 right-0 h-44 bg-[#F2F1EE] rounded-b-[40px] z-30 shadow-[0_-15px_35px_rgb(0,0,0,0.12)] flex items-end justify-center pb-6 border-t border-gray-200/60 pointer-events-none" style={{ clipPath: 'polygon(0% 25%, 50% 0%, 100% 25%, 100% 100%, 0% 100%)' }} />
            </div>

          </div>
        </section>

        
        <section className="max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="bg-white rounded-[40px] border border-gray-200/80 p-10 sm:p-16 shadow-sm relative overflow-hidden">
            
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10 pb-20 sm:pb-32">
              
              
              <div className="md:col-span-4 flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <span className="font-heading font-extrabold text-xl text-black tracking-tight">auditflow</span>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
                  auditflow is the AI financial audit & equity research platform that builds high-conviction theses—all in one place.
                </p>
              </div>

              
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                
                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-black text-black uppercase tracking-wider">Product</span>
                  <Link to="/dashboard" className="text-xs font-semibold text-gray-500 hover:text-black transition">CoreResearch</Link>
                  <Link to="/dashboard" className="text-xs font-semibold text-gray-500 hover:text-black transition">Valuation</Link>
                  <Link to="/dashboard" className="text-xs font-semibold text-gray-500 hover:text-black transition">AuditTrail</Link>
                  <Link to="/dashboard" className="text-xs font-semibold text-gray-500 hover:text-black transition">LiveNode</Link>
                </div>

                
                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-black text-black uppercase tracking-wider">Features</span>
                  <a href="#built-for-everyone" className="text-xs font-semibold text-gray-500 hover:text-black transition">Desk</a>
                  <a href="#built-for-everyone" className="text-xs font-semibold text-gray-500 hover:text-black transition">Time & SEC</a>
                  <a href="#built-for-everyone" className="text-xs font-semibold text-gray-500 hover:text-black transition">Analytics</a>
                  <a href="#built-for-everyone" className="text-xs font-semibold text-gray-500 hover:text-black transition">Pulse</a>
                </div>

                
                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-black text-black uppercase tracking-wider">Pricing</span>
                  <span className="text-xs font-semibold text-gray-500 hover:text-black cursor-pointer transition">Evaluator Mode</span>
                  <span className="text-xs font-semibold text-gray-500 hover:text-black cursor-pointer transition">Institutional</span>
                  <span className="text-xs font-semibold text-gray-500 hover:text-black cursor-pointer transition">Enterprise</span>
                </div>

                
                <div className="flex flex-col space-y-3.5">
                  <span className="text-xs font-black text-black uppercase tracking-wider">Follow us</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black font-extrabold text-xs cursor-pointer transition">📷</div>
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black font-extrabold text-xs cursor-pointer transition">𝕏</div>
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black font-extrabold text-xs cursor-pointer transition">🎵</div>
                  </div>
                </div>
              </div>

            </div>

            
            <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-none select-none whitespace-nowrap">
              <span className="font-heading font-black text-[90px] sm:text-[160px] md:text-[230px] lg:text-[270px] tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-transparent bg-clip-text opacity-30">
                auditflow
              </span>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;

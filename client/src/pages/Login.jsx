import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleGuestLogin = () => {
    localStorage.setItem('auditflow_guest_mode', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-hidden flex flex-col justify-center items-center py-12 px-4 select-none">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-amber-100/30 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mb-6 group">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-200/60 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:shadow group-hover:scale-105">
            <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-extrabold tracking-tight text-lg text-gray-900">auditflow</span>
        </Link>

        {/* Instant Guest Evaluation Card */}
        <div className="w-full mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-[24px] p-6 shadow-xl text-black border border-amber-400 flex flex-col items-center text-center">
          <span className="text-[10px] font-black uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full mb-2">Evaluator Fast-Track</span>
          <h3 className="text-lg font-black tracking-tight">Testing or Evaluating Auditflow?</h3>
          <p className="text-xs font-medium text-black/80 mt-1 mb-4">
            Skip account creation. Click below to launch straight into the interactive dashboard with full live stock measurement & LangGraph AI analysis.
          </p>
          <button
            onClick={handleGuestLogin}
            className="w-full bg-black hover:bg-neutral-900 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center space-x-2 uppercase tracking-wider"
          >
            <span>Launch as Guest Evaluator</span>
            <span>⚡</span>
          </button>
        </div>

        {/* Clerk Sign In component */}
        <div className="shadow-2xl rounded-[28px] border border-gray-100/80 overflow-hidden bg-white">
          <SignIn 
            signUpUrl="/signup" 
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                card: 'bg-white shadow-none p-6 md:p-8 rounded-none border-none',
                headerTitle: 'text-2xl font-extrabold text-black tracking-tight',
                headerSubtitle: 'text-sm text-gray-400 font-medium',
                socialButtonsBlockButton: 'border border-gray-200/80 hover:bg-neutral-50 rounded-xl transition text-xs font-bold text-gray-700',
                formButtonPrimary: 'bg-black hover:bg-neutral-800 transition text-xs font-bold tracking-wider rounded-xl py-3 border-none shadow-md',
                formFieldLabel: 'text-[10px] font-bold text-gray-500 uppercase tracking-wider',
                formFieldInput: 'border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-black focus:ring-black',
                footerActionText: 'text-xs text-gray-400 font-medium',
                footerActionLink: 'text-xs font-bold text-black hover:underline',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

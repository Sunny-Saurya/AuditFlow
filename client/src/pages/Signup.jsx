import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] font-sans relative overflow-hidden flex flex-col justify-center items-center py-12 px-4 select-none">
      
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-amber-100/30 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-amber-100/30 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        <Link to="/" className="flex items-center space-x-2 mb-8 group">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-200/60 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:shadow group-hover:scale-105">
            <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-extrabold tracking-tight text-lg text-gray-900">auditflow</span>
        </Link>

        
        <div className="shadow-2xl rounded-[28px] border border-gray-100/80 overflow-hidden bg-white">
          <SignUp 
            signInUrl="/login" 
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

export default Signup;

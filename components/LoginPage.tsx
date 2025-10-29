import React from 'react';
import { ParrotIcon } from './icons/ParrotIcon';
import { Button } from './common/Button';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100/30 via-white to-emerald-100/30">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 text-center animate-fade-in">
        <div className="flex flex-col items-center">
          <ParrotIcon className="h-20 w-20" />
          <h1 className="mt-4 font-poppins text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
            Babble Vibe
          </h1>
          <p className="mt-2 text-slate-600">Your language journey starts here.</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue="demo@babble.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                defaultValue="password"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Log In</Button>
        </form>

        <p className="mt-2 text-sm text-center text-slate-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

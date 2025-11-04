
import React from 'react';
import { Logo } from './icons/Logo';
import { Button } from './common/Button';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-yellow-100">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 text-center animate-fade-in">
        <div className="flex flex-col items-center">
          <Logo className="h-16 w-auto" />
          <p className="mt-4 text-gray-600">Your language journey starts here.</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue="demo@chirpolly.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                defaultValue="password"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Log In</Button>
        </form>

        <p className="mt-2 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};
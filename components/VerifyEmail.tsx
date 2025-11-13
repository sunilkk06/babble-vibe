import React, { useState } from 'react';
import { ParrotIcon } from './icons/ParrotIcon';
import { Button } from './common/Button';
import { auth } from '../services/firebase';
import { reload, sendEmailVerification } from 'firebase/auth';

export const VerifyEmail: React.FC = () => {
  const user = auth.currentUser;
  const [status, setStatus] = useState<'idle' | 'sending' | 'checking' | 'sent' | 'verified' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const doResend = async () => {
    try {
      setStatus('sending');
      setMessage(null);
      if (!user) throw new Error('Not signed in');
      await sendEmailVerification(user);
      setStatus('sent');
      setMessage('Verification email sent. Please check your inbox.');
    } catch (e: any) {
      setStatus('error');
      setMessage(e?.message ?? 'Failed to send verification email.');
    }
  };

  const doCheck = async () => {
    try {
      setStatus('checking');
      if (!auth.currentUser) throw new Error('Not signed in');
      await reload(auth.currentUser);
      if (auth.currentUser?.emailVerified) {
        setStatus('verified');
        window.location.replace('/#/');
      } else {
        setStatus('idle');
        setMessage('Still not verified. Click “Resend verification” and check again.');
      }
    } catch (e: any) {
      setStatus('error');
      setMessage(e?.message ?? 'Failed to check status.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-yellow-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 text-center animate-fade-in">
        <div className="flex flex-col items-center">
          <ParrotIcon className="h-16 w-auto" />
          <h1 className="mt-2 text-2xl font-bold text-slate-800">Verify your email</h1>
          <p className="text-sm text-slate-600">We sent a verification link to your email. Please verify to continue.</p>
        </div>

        {message && <p className={`text-sm ${status==='error' ? 'text-red-600' : 'text-teal-700'}`}>{message}</p>}

        <div className="space-y-3">
          <Button onClick={doResend} disabled={status==='sending'} className="w-full">
            {status==='sending' ? 'Sending…' : 'Resend verification'}
          </Button>
          <button onClick={doCheck} disabled={status==='checking'} className="w-full inline-flex items-center justify-center gap-x-2 rounded-md bg-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300">
            {status==='checking' ? 'Checking…' : 'I’ve verified — Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

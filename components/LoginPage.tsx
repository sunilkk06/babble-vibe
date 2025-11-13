
import React, { useState } from 'react';
import { ParrotIcon } from './icons/ParrotIcon';
import { Button } from './common/Button';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setInfo(null);
    try {
      if (mode === 'login') {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (!cred.user.emailVerified) {
          setInfo('Please verify your email. We can resend the link.');
          navigate('/verify-email');
        }
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(cred.user);
        await setDoc(doc(db, 'users', cred.user.uid), {
          uid: cred.user.uid,
          email: cred.user.email,
          provider: 'password',
          createdAt: serverTimestamp(),
        }, { merge: true });
        setInfo('Verification email sent. Please check your inbox to verify.');
        navigate('/verify-email');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setInfo(null);
    if (!email) { setError('Enter your email to receive reset link.'); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo('Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to send reset email');
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const u = res.user;
      const userRef = doc(db, 'users', u.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: u.uid,
          email: u.email,
          displayName: u.displayName ?? null,
          photoURL: u.photoURL ?? null,
          provider: 'google',
          createdAt: serverTimestamp(),
        }, { merge: true });
      }
    } catch (err: any) {
      setError(err?.message ?? 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-teal-100 to-yellow-100">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 text-center animate-fade-in">
        <div className="flex flex-col items-center">
          <ParrotIcon className="h-20 w-auto" />
          <p className="mt-2 text-teal-700 font-semibold italic">Chirp Your Way to Fluency</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-green-700">{info}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </Button>

          {mode === 'login' && (
            <div className="flex items-center justify-between mt-2">
              <button type="button" onClick={handleForgotPassword} className="text-sm font-medium text-teal-600 hover:text-teal-500">Forgot password?</button>
            </div>
          )}
        </form>

        <div className="relative">
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-slate-200"/>
            <span className="px-3 text-xs uppercase text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-200"/>
          </div>
          <button type="button" onClick={handleGoogle} disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400">
            <span className="text-lg">G</span>
            Continue with Google
          </button>
        </div>

        <p className="mt-3 text-sm text-center text-gray-600">
          {mode === 'login' ? (
            <>Don't have an account?{' '}<button onClick={() => setMode('signup')} className="font-medium text-teal-600 hover:text-teal-500">Create one</button></>
          ) : (
            <>Already have an account?{' '}<button onClick={() => setMode('login')} className="font-medium text-teal-600 hover:text-teal-500">Log in</button></>
          )}
        </p>
      </div>
    </div>
  );
};

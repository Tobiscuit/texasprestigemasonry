'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error: signInError } = await authClient.signIn.email({
                email,
                password,
            });

            if (signInError) {
                setError(signInError.message || 'Invalid email or password.');
            } else {
                router.push('/dashboard');
                onClose();
            }
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await authClient.signIn.social({ provider: 'google' });
            // The auth client will handle the redirect
        } catch {
            setError('Failed to initialize Google login.');
            setLoading(false);
        }
    };

    // Prevent clicks inside the modal from closing it
    const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-slate/60 backdrop-blur-xl p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={handleModalClick}
                        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-midnight-slate transition-colors p-2 rounded-full hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="bg-midnight-slate p-8 pb-6 text-center border-b border-gray-100 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-midnight-slate to-[#1a2b3c] opacity-50"></div>
                            <h2 className="text-2xl font-black text-white relative z-10 font-playfair tracking-tight">
                                Client Portal
                            </h2>
                            <p className="text-sandstone/70 text-sm mt-1 relative z-10">
                                Secure access for clients and staff.
                            </p>
                        </div>

                        <div className="p-8 pt-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-medium border border-red-100 text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Passwordless / OAuth Focus */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-3.5 rounded-2xl transition-all shadow-sm mb-6 disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-white text-gray-400 font-bold uppercase tracking-wider">Or email & password</span>
                                </div>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 font-medium text-black focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 font-medium text-black focus:ring-2 focus:ring-burnished-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-2 bg-midnight-slate hover:bg-[#1a2b3c] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex justify-center items-center group"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Secure Login
                                            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

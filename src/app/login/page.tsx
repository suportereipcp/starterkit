"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Importa nossa conexão real
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(formData: FormData) {
        setLoading(true);
        setError(null);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Tenta logar no Supabase
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    }

    return (
        <div className="min-h-screen bg-grey-lighter font-sans text-grey-darkest antialiased relative">
            {/* Top Colored Bar */}
            <div className="h-2 bg-primary w-full absolute top-0 left-0"></div>

            <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
                {/* Logo Section */}
                <div className="mb-8" style={{ maxWidth: '12rem' }}>
                    <Logo />
                </div>

                {/* Login Card Wrapper */}
                <div className="w-full max-w-sm bg-white shadow-md rounded-sm overflow-hidden">
                    {/* Header */}
                    <div className="py-8 px-6 text-center border-b border-grey-lighter">
                        <h2 className="text-black font-bold text-lg tracking-wide uppercase">
                            Welcome Back!
                        </h2>
                    </div>

                    {/* Form */}
                    <div className="p-8 bg-white">
                        <form action={handleLogin}>
                            <div className="mb-6">
                                <label className="block text-grey-darker text-sm font-bold mb-2 sr-only" htmlFor="email">
                                    E-Mail
                                </label>
                                <input
                                    className="appearance-none border border-grey-light rounded-sm w-full py-3 px-4 text-grey-darker leading-tight focus:outline-none focus:border-grey"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="E-Mail"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-grey-darker text-sm font-bold mb-2 sr-only" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="appearance-none border border-grey-light rounded-sm w-full py-3 px-4 text-grey-darker leading-tight focus:outline-none focus:border-grey"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="******************"
                                    required
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 text-center text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Button */}
                            <div className="flex items-center justify-between">
                                <button
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-sm focus:outline-none focus:shadow-outline uppercase tracking-wider transition-colors duration-200"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
}
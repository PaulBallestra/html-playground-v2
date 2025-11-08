'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    console.log('click')
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className={cn("bg-clip-padding rounded-4xl border border-base-content/10 p-8 md:p-10 space-y-8")}>
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-base-content">Bienvenue</h1>
            <p className="text-base-content/70">Connectez-vous pour continuer</p>
          </div>

          {/* Classic Login (commented out but ready to use) */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-full"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="input input-bordered w-full rounded-full"
            />
            <button className="btn btn-primary w-full rounded-full">
              Se connecter
            </button>
          </div>

          {/* Optional: Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-base-content/20"></div>
            <span className="text-xs text-base-content/50">ou</span>
            <div className="flex-1 h-px bg-base-content/20"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="btn btn-outline w-full rounded-full flex items-center justify-center gap-3 text-base-content hover:bg-base-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path>
                  <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path>
                  <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path>
                  <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path>
                </svg>
                <span className="font-medium">Continuer avec Google</span>
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-base-content/60">
            En continuant, vous acceptez nos{' '}
            <a href="#" className="link link-primary">Conditions d'utilisation</a> et notre{' '}
            <a href="#" className="link link-primary">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
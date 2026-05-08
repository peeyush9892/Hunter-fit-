'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Zap, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const DEMO_CREDENTIALS = {
  email: 'kai.blackwood@hunterfit.io',
  password: 'Hunter#2026',
};

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Backend integration point: POST /api/auth/login
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));

    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      toast.success('Welcome back, Hunter.', { description: 'System access granted.', icon: '⚡' });
      setTimeout(() => router.push('/'), 800);
    } else {
      setError('email', { message: 'Invalid credentials — use the demo accounts below to sign in' });
      setIsLoading(false);
    }
  };

  const autofill = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div className="animate-fade-in-scale">
      {/* System message header */}
      <div className="system-message-panel rounded-xl px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-primary" />
          <p className="font-display text-xs text-primary tracking-widest">SYSTEM NOTIFICATION</p>
        </div>
        <p className="font-display text-sm text-foreground mt-1 font-bold">Hunter Authentication Required</p>
        <p className="text-xs text-foreground-muted font-sans mt-0.5">Prove your identity to access the System.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-display text-xs tracking-widest text-foreground-muted mb-1.5">
            HUNTER ID (EMAIL)
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type="email"
              {...register('email', {
                required: 'Hunter ID is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
              })}
              className="input-hunter w-full pl-9 pr-4 py-3 rounded-xl text-sm font-sans"
              placeholder="hunter@hunterfit.io"
            />
          </div>
          {errors.email && <p className="text-xs text-danger mt-1 font-sans">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-display text-xs tracking-widest text-foreground-muted mb-1.5">
            ACCESS CODE (PASSWORD)
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Access code is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              className="input-hunter w-full pl-9 pr-10 py-3 rounded-xl text-sm font-sans"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-danger mt-1 font-sans">{errors.password.message}</p>}
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('remember')}
              className="w-4 h-4 rounded border-border bg-input accent-primary"
            />
            <span className="font-display text-xs text-foreground-muted tracking-wider">REMEMBER SESSION</span>
          </label>
          <button type="button" className="font-display text-xs text-primary hover:text-glow-primary tracking-wider transition-colors">
            FORGOT CODE?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl btn-primary-glow text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Zap size={16} />
              ACCESS SYSTEM
            </>
          )}
        </button>
      </form>

      {/* Demo credentials */}
      <div className="mt-5 p-4 rounded-xl border border-border bg-background-elevated">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display text-xs text-foreground-muted tracking-widest">DEMO CREDENTIALS</p>
          <button
            onClick={autofill}
            className="px-2 py-1 rounded text-xs font-display tracking-wider btn-ghost-glow"
          >
            AUTOFILL
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs text-foreground-subtle tracking-wider">EMAIL</span>
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-xs text-foreground">{DEMO_CREDENTIALS.email}</span>
              <button onClick={() => copyToClipboard(DEMO_CREDENTIALS.email, 'Email')} className="text-foreground-muted hover:text-primary transition-colors">
                <Copy size={12} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-display text-xs text-foreground-subtle tracking-wider">PASSWORD</span>
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-xs text-foreground">{DEMO_CREDENTIALS.password}</span>
              <button onClick={() => copyToClipboard(DEMO_CREDENTIALS.password, 'Password')} className="text-foreground-muted hover:text-primary transition-colors">
                <Copy size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-foreground-muted mt-4 font-sans">
        No account yet?{' '}
        <button onClick={onSwitchToSignup} className="text-primary hover:text-glow-primary transition-colors font-display tracking-wider">
          REGISTER HUNTER
        </button>
      </p>
    </div>
  );
}
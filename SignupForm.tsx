'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ChevronRight, Dumbbell, Flame, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


interface SignupFormData {
  name: string;
  email: string;
  password: string;
  goal: string;
  fitnessLevel: string;
}

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const goals = [
  { id: 'goal-muscle', value: 'muscle', label: 'MUSCLE GAIN', icon: Dumbbell, desc: 'Build mass and strength', color: 'primary' },
  { id: 'goal-fat', value: 'fat-loss', label: 'FAT LOSS', icon: Flame, desc: 'Burn fat, get lean', color: 'warning' },
  { id: 'goal-strength', value: 'strength', label: 'STRENGTH', icon: Shield, desc: 'Maximize raw power', color: 'accent' },
  { id: 'goal-aesthetics', value: 'aesthetics', label: 'AESTHETICS', icon: Zap, desc: 'Sculpt your physique', color: 'success' },
];

const levels = [
  { id: 'level-beginner', value: 'beginner', label: 'BEGINNER', desc: 'Under 1 year training', rank: 'E' },
  { id: 'level-intermediate', value: 'intermediate', label: 'INTERMEDIATE', desc: '1–3 years training', rank: 'C' },
  { id: 'level-advanced', value: 'advanced', label: 'ADVANCED', desc: '3+ years training', rank: 'A' },
];

const goalColorMap: Record<string, string> = {
  primary: 'border-primary/50 bg-primary/10 text-primary',
  warning: 'border-warning/50 bg-warning/10 text-warning',
  accent: 'border-accent/50 bg-accent/10 text-accent-bright',
  success: 'border-success/50 bg-success/10 text-success',
};

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({ defaultValues: { goal: '', fitnessLevel: '' } });

  const selectedGoal = watch('goal');
  const selectedLevel = watch('fitnessLevel');

  // Backend integration point: POST /api/auth/register
  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    toast.success('Hunter registered! The System acknowledges you.', {
      icon: '🔥',
      description: `Welcome, ${data.name}. Your journey begins now.`,
    });
    setTimeout(() => router.push('/'), 1000);
  };

  const steps = [
    { num: 1, label: 'IDENTITY' },
    { num: 2, label: 'MISSION' },
    { num: 3, label: 'RANK' },
  ];

  return (
    <div className="animate-fade-in-scale">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <React.Fragment key={`signup-step-${s.num}`}>
            <div className={`flex items-center gap-1.5 ${step >= s.num ? 'text-primary' : 'text-foreground-subtle'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-display text-xs font-bold border transition-all duration-300 ${
                step > s.num ? 'bg-primary border-primary text-primary-foreground' :
                step === s.num ? 'border-primary text-primary bg-primary/10': 'border-foreground-subtle text-foreground-subtle'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="font-display text-xs tracking-widest hidden sm:block">{s.label}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 transition-all duration-300 ${step > s.num ? 'bg-primary' : 'bg-border'}`} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-in-up">
            <div className="system-message-panel rounded-xl px-4 py-3 mb-4">
              <p className="font-display text-xs text-primary tracking-widest mb-0.5">SYSTEM NOTIFICATION</p>
              <p className="font-display text-sm text-foreground font-bold">New Hunter Registration</p>
              <p className="text-xs text-foreground-muted font-sans">The System will assign your starting rank.</p>
            </div>

            <div>
              <label className="block font-display text-xs tracking-widest text-foreground-muted mb-1.5">HUNTER NAME</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input
                  type="text"
                  {...register('name', { required: 'Hunter name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                  className="input-hunter w-full pl-9 pr-4 py-3 rounded-xl text-sm font-sans"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && <p className="text-xs text-danger mt-1 font-sans">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block font-display text-xs tracking-widest text-foreground-muted mb-1.5">HUNTER EMAIL</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
                  })}
                  className="input-hunter w-full pl-9 pr-4 py-3 rounded-xl text-sm font-sans"
                  placeholder="hunter@email.com"
                />
              </div>
              {errors.email && <p className="text-xs text-danger mt-1 font-sans">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-display text-xs tracking-widest text-foreground-muted mb-1.5">ACCESS CODE</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum 8 characters required' },
                  })}
                  className="input-hunter w-full pl-9 pr-10 py-3 rounded-xl text-sm font-sans"
                  placeholder="Min 8 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-primary transition-colors">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger mt-1 font-sans">{errors.password.message}</p>}
            </div>

            <button type="button" onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl btn-primary-glow text-sm flex items-center justify-center gap-2 mt-2">
              NEXT: SELECT MISSION <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Goal selection */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-in-up">
            <div>
              <p className="font-display text-sm font-bold text-foreground mb-1">SELECT YOUR PRIMARY MISSION</p>
              <p className="text-xs text-foreground-muted font-sans mb-4">The System will tailor your training protocol.</p>
              <input type="hidden" {...register('goal', { required: 'Select a mission objective' })} />
              <div className="grid grid-cols-2 gap-3">
                {goals.map(goal => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.value;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setValue('goal', goal.value)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? `${goalColorMap[goal.color]} border-opacity-100`
                          : 'bg-background/40 border-border hover:border-border-glow'
                      }`}
                    >
                      <Icon size={20} className={`mb-2 ${isSelected ? '' : 'text-foreground-muted'}`} />
                      <p className={`font-display text-xs font-bold tracking-wider ${isSelected ? '' : 'text-foreground'}`}>
                        {goal.label}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5 font-sans">{goal.desc}</p>
                    </button>
                  );
                })}
              </div>
              {errors.goal && <p className="text-xs text-danger mt-2 font-sans">{errors.goal.message}</p>}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl btn-ghost-glow text-sm">BACK</button>
              <button type="button" onClick={() => selectedGoal && setStep(3)}
                className={`flex-1 py-3 rounded-xl btn-primary-glow text-sm flex items-center justify-center gap-2 ${!selectedGoal ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!selectedGoal}>
                NEXT <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Fitness level */}
        {step === 3 && (
          <div className="space-y-4 animate-slide-in-up">
            <div>
              <p className="font-display text-sm font-bold text-foreground mb-1">CURRENT POWER LEVEL</p>
              <p className="text-xs text-foreground-muted font-sans mb-4">The System will assign your starting rank.</p>
              <input type="hidden" {...register('fitnessLevel', { required: 'Select your power level' })} />
              <div className="space-y-3">
                {levels.map(level => {
                  const isSelected = selectedLevel === level.value;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setValue('fitnessLevel', level.value)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary/10 border-primary/50 text-primary' :'bg-background/40 border-border hover:border-border-glow'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-display text-sm font-black text-white flex-shrink-0 ${
                        level.rank === 'E' ? 'gradient-rank-e rank-badge-glow-e' :
                        level.rank === 'C'? 'gradient-rank-c rank-badge-glow-c' : 'gradient-rank-a rank-badge-glow-a'
                      }`}>
                        {level.rank}
                      </div>
                      <div>
                        <p className={`font-display text-xs font-bold tracking-wider ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {level.label}
                        </p>
                        <p className="text-xs text-foreground-muted font-sans">{level.desc}</p>
                      </div>
                      {isSelected && <div className="ml-auto w-2 h-2 rounded-full bg-primary pulse-glow" />}
                    </button>
                  );
                })}
              </div>
              {errors.fitnessLevel && <p className="text-xs text-danger mt-2 font-sans">{errors.fitnessLevel.message}</p>}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl btn-ghost-glow text-sm">BACK</button>
              <button
                type="submit"
                disabled={isLoading || !selectedLevel}
                className={`flex-1 py-3 rounded-xl btn-accent-glow text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap size={16} />
                    ARISE
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-foreground-muted font-sans">
              By registering you agree to our{' '}
              <span className="text-primary cursor-pointer hover:underline">Terms</span> and{' '}
              <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        )}
      </form>

      <p className="text-center text-xs text-foreground-muted mt-4 font-sans">
        Already a hunter?{' '}
        <button onClick={onSwitchToLogin} className="text-primary font-display tracking-wider hover:text-glow-primary transition-colors">
          LOGIN
        </button>
      </p>
    </div>
  );
}
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function Onboarding({ onComplete, onCancel }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState('High School Student');

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-6 w-full max-w-container-max mx-auto bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-surface rounded-xl border border-outline-variant shadow-sm p-6 md:p-10 flex flex-col gap-8"
      >
        <div className="flex justify-center mb-2">
          <img 
            alt="UniPath Logo" 
            className="h-12 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbo_s1OXeFLwao3-UVDUyOVFVyb7JWaxT3uWxgeAJiMrMwz0bVRusA6MZ_4-myIcUmc_nJUrKIhXhgYmQI6vOCuSUyDLviYWwJVbxuuF04eTUZgrk2aqJxWYLiy4n0mR3jlucOVuGiWMNnfhD4IurLnsnKkwBc4fjBGIi3FDrY4lBGg_DCXRuS6_F5HS2Dugk5RhMvPXcM1Kw0nDX0MJg-jR-Z4ZeDxVK1TlifzpZOyenDVfcqfYB1EqR3Q93Ygxa_QU7JmxoE_ll6"
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="font-headline-lg text-headline-lg text-primary">Setup Your Academic Profile</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Step {step} of 3: Basic Information</p>
        </div>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between relative px-2 mb-4">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container -z-10 -translate-y-1/2"></div>
          
          {[
            { n: 1, label: 'Basic Info' },
            { n: 2, label: 'Academics' },
            { n: 3, label: 'Preferences' }
          ].map((item) => (
            <div key={item.n} className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-label-sm ring-4 ring-surface ${
                step === item.n ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {item.n}
              </div>
              <span className={`font-label-sm text-label-sm ${step === item.n ? 'text-primary' : 'text-on-surface-variant'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Full Name</label>
            <input 
              className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all font-body-md text-body-md text-on-surface placeholder:text-outline" 
              placeholder="Enter your full name" 
              type="text" 
            />
          </div>

          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface">Current Education Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'High School Student',
                'Undergraduate Student',
                'Postgraduate Student',
                'Working Professional'
              ].map((item) => (
                <label key={item} className="relative flex cursor-pointer group">
                  <input 
                    type="radio" 
                    name="educationLevel" 
                    className="peer sr-only" 
                    checked={level === item}
                    onChange={() => setLevel(item)}
                  />
                  <div className="w-full p-4 rounded-lg border border-outline-variant bg-surface peer-checked:border-primary peer-checked:bg-surface-container-low peer-checked:ring-1 peer-checked:ring-primary transition-all flex items-center justify-between group-hover:border-primary/50">
                    <span className="font-body-md text-body-md text-on-surface">{item}</span>
                    <CheckCircle className={`text-primary transition-opacity ${level === item ? 'opacity-100' : 'opacity-0'}`} size={20} />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-outline-variant mt-8">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-6 py-3 rounded-lg border border-outline-variant font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={onComplete}
              className="px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm"
            >
              Next Step
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

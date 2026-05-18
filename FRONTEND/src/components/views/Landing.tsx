import { ArrowRight, CheckCircle, ListPlus, PlayCircle, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { View } from '../../types';

interface LandingProps {
  onStart: () => void;
  onRegister?: () => void;
}

export default function Landing({ onStart, onRegister }: LandingProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full max-w-container-max mx-auto px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 flex flex-col items-start space-y-6 z-10"
        >
          <div className="inline-flex items-center space-x-2 bg-surface-container-low border border-outline-variant rounded-full px-4 py-1.5">
            <CheckCircle className="text-primary" size={16} />
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">For Vietnamese Students</span>
          </div>
          <h1 className="font-bold text-5xl leading-tight text-on-surface">
            Your Pathway to <br /> <span className="text-primary">Global Education</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            UniPath analyzes your academic profile to deliver personalized university recommendations worldwide. Data-driven insights for structured optimism.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3 rounded font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
            >
              Start Your Path
            </button>
            <button className="w-full sm:w-auto bg-transparent border border-outline-variant text-on-surface px-8 py-3 rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
              <PlayCircle size={20} />
              How it works
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[500px]"
        >
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="col-span-1 row-span-2 rounded-xl overflow-hidden shadow-sm border border-outline-variant">
              <img 
                alt="Students on campus" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKfUS1HzP5AS2194sVYSeJkou5-Fm546E_QyurovMXTE6mt4DIXHCzREzEArGu2DBoc30AlK-do3dHUJc9XdmMX-o2bBzeIB18Nw9RLQ6ju5fjwtT0gbFaQrpbsZrDEwuh36eiZFExMrvb1ks41P8xsuIbKRI-RCHlB1X_HKe6mZnotfZqRoqpgHpKw6QUH_-d3SDxUTuYsZd5Xy9eri1BoBsPDlJNbFF04ljDKY_ZcEfqxiLT_PpGqRmru4VjbbOl54-DxKgsWla_"
              />
            </div>
            <div className="col-span-1 rounded-xl bg-surface p-6 shadow-sm border border-outline-variant flex flex-col justify-center">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">95%</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Acceptance Rate for Top Matches</p>
            </div>
            <div className="col-span-1 rounded-xl overflow-hidden shadow-sm border border-outline-variant relative">
              <img 
                alt="Library" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4F914pKaFO-tRglmZsM_mCwJ5Oy4Owj4MYECv14BVf7PyS27eOACanxlkY_woGijD6rLVj8_is8fKk4HRIZkjEKmtYHm01FURTSlyZP0f44lN0KC8wJkYHRvd_3goi4xrUmzx_Cl_d_oL0ApzE1ulcmZD4cPlrcl47aum426_H4B3S8PdYOug4ERrUyJ0_18ywvg0mh-J4lIQFc2_LSSW4B7a5dncC_695BYdwRXAiy_A0e-PnijD_ZH4-HlXNKc8BH1yzaSl4TDi"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent flex items-end p-4">
                <span className="font-label-md text-label-md text-on-primary">Over 500+ Institutions</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="w-full bg-surface-container-low py-20">
        <div className="max-w-container-max mx-auto px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">How UniPath Works</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">A streamlined, data-backed approach to finding your ideal university match. Simple steps to a structured future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center relative z-10 bg-surface p-8 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 border-4 border-surface shadow-sm">
                <UserPlus size={32} className="text-primary" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">1. Build Profile</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Input your academic records, extracurriculars, and personal preferences to create a comprehensive baseline.</p>
            </div>
            <div className="flex flex-col items-center text-center relative z-10 bg-surface p-8 rounded-xl border border-primary/20 shadow-[0_8px_16px_-4px_rgba(0,51,102,0.08)] ring-1 ring-primary/10">
              <div className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center mb-6 border-4 border-surface shadow-sm">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ListPlus size={32} />
                </motion.div>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">2. Smart Match</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Our algorithm analyzes thousands of programs to suggest 'Safe' and 'Reach' options tailored exactly to you.</p>
            </div>
            <div className="flex flex-col items-center text-center relative z-10 bg-surface p-8 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 border-4 border-surface shadow-sm">
                <ListPlus size={32} className="text-primary" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">3. Shortlist & Apply</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Refine your selections, track application deadlines, and manage documents in one centralized dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-container-max mx-auto px-10 py-20">
        <div className="bg-primary-container rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="w-full md:w-2/3 mb-8 md:mb-0 relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-primary-container mb-4 text-white">Ready to find your perfect university match?</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container/80 max-w-xl text-white/80">Join thousands of Vietnamese students who have successfully navigated their study abroad journey with UniPath.</p>
          </div>
          <div className="w-full md:w-auto relative z-10 flex-shrink-0">
            <button 
              onClick={onRegister ?? onStart}
              className="w-full sm:w-auto bg-on-primary text-primary-container px-8 py-4 rounded font-label-md text-label-md hover:bg-surface transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Create Free Account
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer — matches Figma */}
      <footer className="w-full border-t border-outline-variant bg-surface">
        <div className="max-w-[1280px] mx-auto px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              alt="UniPath Logo"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLfsX9jyvBw1om9PM_UzGEFpxYYzzmC5WN9gHID78iGAToOsxuuRMasO0e8lHIRxxWVFRs1wMogpZfuLjC_kd8Al0sIpINoc-Q8Cv-oHWRuqQGpfyg1BLsZvR0HjNKFTaV3GscWyn-jZqsmfyTF1w1Zgx0sszbv9JgoumYBRckO72dv0mdJ0egljBOX4SjYHjJXnYvW-Qv5grbaRroN8ONfJ2zegaAOhWiZPMLjzfoUJCNwmwPX-G9XH1504tDYUe1SvFtguU9IO42"
            />
            <div>
              <p className="text-xs text-on-surface-variant">© 2024 UniPath. Academic authority and supportive clarity.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant">
            <button className="hover:text-primary transition-colors">About Us</button>
            <button className="hover:text-primary transition-colors">Contact Support</button>
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

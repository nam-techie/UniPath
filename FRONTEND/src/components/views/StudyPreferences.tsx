import { Compass, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function StudyPreferences() {
  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Study Preferences</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Refine your study goals to help us provide more accurate university matches and enrollment strategies.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Geographic & Academic Preferences */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Compass size={22} />
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-primary">Global Destinations</h3>
            </div>

            <div className="space-y-8">
              <div>
                <label className="font-label-md text-label-md text-on-surface block mb-4 uppercase tracking-wider text-xs font-bold">Target Countries (Multi-select)</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'USA', active: true },
                    { name: 'UK', active: true },
                    { name: 'Australia', active: false },
                    { name: 'Canada', active: false },
                    { name: 'Germany', active: false },
                    { name: 'Singapore', active: false }
                  ].map(c => (
                    <button 
                      key={c.name}
                      className={`px-6 py-2 rounded-full border transition-all text-sm font-bold ${
                        c.active 
                          ? 'bg-primary text-on-primary border-primary shadow-sm' 
                          : 'bg-background text-on-surface-variant border-outline-variant hover:border-primary/50'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                  <button className="px-6 py-2 rounded-full border border-dashed border-outline-variant bg-surface-container-low text-primary font-bold text-sm hover:bg-surface-container transition-colors">+ Add Country</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-label-md text-label-md text-on-surface block font-bold text-xs uppercase tracking-wider">Primary Field of Study</label>
                  <select className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="cs">
                    <option value="cs">Computer Science & IT</option>
                    <option value="business">Business & Finance</option>
                    <option value="engineering">Engineering</option>
                    <option value="arts">Arts & Humanities</option>
                    <option value="sciences">Natural Sciences</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="font-label-md text-label-md text-on-surface block font-bold text-xs uppercase tracking-wider">Preferred Intake Season</label>
                  <div className="flex gap-8 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="intake" className="w-5 h-4 text-primary border-outline-variant focus:ring-primary" defaultChecked />
                      <span className="font-body-md text-on-surface group-hover:text-primary transition-colors font-medium">Fall Intake</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="intake" className="w-5 h-4 text-primary border-outline-variant focus:ring-primary" />
                      <span className="font-body-md text-on-surface group-hover:text-primary transition-colors font-medium">Spring Intake</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Aspirations Bento Card */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <TrendingUp size={22} />
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-primary">Career Goals & Aspirations</h3>
            </div>

            <div className="space-y-4">
              <label className="font-label-md text-label-md text-on-surface block font-medium">What are your long-term career goals?</label>
              <textarea 
                className="w-full bg-background border border-outline-variant rounded-xl px-5 py-4 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface placeholder:text-outline leading-relaxed" 
                placeholder="Describe your professional ambitions and how this degree helps you achieve them..." 
                rows={6}
              ></textarea>
              <p className="text-xs text-on-surface-variant flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                This information helps us tailor university suggestions to your future industry needs.
              </p>
            </div>
          </motion.section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Profile Completeness View */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary-container/5 border border-primary/20 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-label-md text-primary font-bold uppercase tracking-wider text-xs">Profile Progress</h4>
                <span className="font-display font-bold text-primary">65%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="bg-secondary h-2 rounded-full"
                ></motion.div>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-snug">You're 65% through your profile. Finish study preferences to unlock premium recommendations.</p>
            </motion.section>

            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm">
                Update Profile
              </button>
              <button className="w-full py-4 border border-outline-variant rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors text-center font-bold">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

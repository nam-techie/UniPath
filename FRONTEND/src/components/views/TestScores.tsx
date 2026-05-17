import { Edit3, Globe, PlusCircle, Verified } from 'lucide-react';
import { motion } from 'motion/react';

export default function TestScores() {
  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Test Scores & Certifications</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Manage your standardized test results and English proficiency certifications to strengthen your university applications.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* English Proficiency Card */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Globe size={22} />
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-primary">English Proficiency</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Test Type</label>
                <select className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" defaultValue="ielts">
                  <option value="ielts">IELTS Academic</option>
                  <option value="toefl">TOEFL iBT</option>
                  <option value="duolingo">Duolingo English Test</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Test Date</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" type="date" defaultValue="2024-03-15" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Overall Score</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" placeholder="e.g. 8.0" type="text" defaultValue="7.5" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">TRF / Reference Number</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" placeholder="Optional" type="text" />
              </div>
            </div>
          </motion.section>

          {/* Standardized Tests Card */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Edit3 size={22} />
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-primary">Standardized Tests (SAT/ACT)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Test Type</label>
                <select className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" defaultValue="sat">
                  <option value="sat">SAT</option>
                  <option value="act">ACT</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Total Score</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" placeholder="e.g. 1520" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Evidence-Based Reading & Writing</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" placeholder="e.g. 740" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface block">Math Score</label>
                <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md" placeholder="e.g. 780" type="text" />
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column: Other Certificates */}
        <div className="lg:col-span-4 space-y-8">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
              <Verified size={20} className="text-primary" />
              <h3 className="font-label-md text-label-md font-bold text-primary uppercase">Other Certificates</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'AP Calculus BC', score: '5' },
                { name: 'AP Physics 1', score: '4' }
              ].map((cert) => (
                <div key={cert.name} className="p-4 bg-background border border-outline-variant rounded-lg flex items-center justify-between group hover:border-primary transition-colors">
                  <span className="font-label-md text-on-surface">{cert.name}</span>
                  <span className="text-primary font-bold text-lg">{cert.score}</span>
                </div>
              ))}
              
              <button className="w-full py-4 border-2 border-dashed border-outline-variant rounded-lg text-on-surface-variant font-label-md hover:bg-surface-container hover:border-primary transition-all flex items-center justify-center gap-2">
                <PlusCircle size={18} />
                Add Certificate
              </button>
            </div>
          </motion.section>

          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container transition-colors shadow-sm">
              Update Profile
            </button>
            <button className="w-full py-3 px-4 border border-outline-variant rounded-lg font-label-md text-on-surface hover:bg-surface-container transition-colors text-center">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

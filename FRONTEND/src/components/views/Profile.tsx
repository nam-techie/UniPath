import { Globe, GraduationCap, MapPin, Search, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [studyTarget, setStudyTarget] = useState<'domestic' | 'abroad'>('domestic');
  const [thptBlock, setThptBlock] = useState('A00');
  const [thptScore, setThptScore] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('unipath_profile');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.studyTarget) setStudyTarget(data.studyTarget);
      if (data.thptBlock) setThptBlock(data.thptBlock);
      if (data.thptScore) setThptScore(data.thptScore);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('unipath_profile', JSON.stringify({
      studyTarget,
      thptBlock,
      thptScore
    }));
    alert('Profile saved! Go to Recommendations tab to see your matches.');
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Comprehensive Profile</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Complete your profile to receive personalized university recommendations and structural support for your study abroad journey.</p>
      </header>

      {/* Study Target Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-surface border border-outline-variant rounded-full p-1 inline-flex">
          <button 
            onClick={() => setStudyTarget('domestic')}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${studyTarget === 'domestic' ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}`}
          >
            Domestic (Vietnam)
          </button>
          <button 
            onClick={() => setStudyTarget('abroad')}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${studyTarget === 'abroad' ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}`}
          >
            Study Abroad
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Primary Inputs */}
        <div className="lg:col-span-8 space-y-8">
          {studyTarget === 'abroad' && (
            <>
              {/* Academic Background Bento Card */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="font-headline-md text-[20px] font-semibold text-primary">Academic Background</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface block">Current High School / Institution</label>
                    <input 
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface placeholder:text-outline" 
                      placeholder="e.g. Hanoi Amsterdam High School" 
                      type="text" 
                      defaultValue="Hanoi - Amsterdam High School for the Gifted"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface block">Current GPA</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface pr-20" 
                        placeholder="3.8" 
                        type="text" 
                        defaultValue="3.8"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <select className="h-full bg-transparent border-transparent py-0 pl-2 pr-7 text-on-surface-variant focus:ring-0 sm:text-sm rounded-r-lg font-label-md">
                          <option>/ 4.0</option>
                          <option>/ 10.0</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface block">Expected Graduation</label>
                    <input 
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface" 
                      type="month" 
                      defaultValue="2025-06"
                    />
                  </div>
                </div>
              </motion.section>

              {/* English Proficiency Bento Card */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Globe size={22} />
                  </div>
                  <h3 className="font-headline-md text-[20px] font-semibold text-primary">English Proficiency</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface block">Primary Test Type</label>
                    <select className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface">
                      <option value="ielts">IELTS Academic</option>
                      <option value="toefl">TOEFL iBT</option>
                      <option value="duolingo">Duolingo English Test (DET)</option>
                      <option value="pte">PTE Academic</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface block">Overall Score</label>
                    <input 
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface placeholder:text-outline" 
                      placeholder="e.g. 7.5" 
                      type="text" 
                      defaultValue="7.5"
                    />
                  </div>
                </div>
              </motion.section>
            </>
          )}

          {studyTarget === 'domestic' && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <GraduationCap size={22} />
                </div>
                <h3 className="font-headline-md text-[20px] font-semibold text-primary">National High School Exam (THPT)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block">Exam Block (Khối thi)</label>
                  <select 
                    value={thptBlock}
                    onChange={(e) => setThptBlock(e.target.value)}
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface"
                  >
                    <option value="A00">A00 (Toán, Lý, Hóa)</option>
                    <option value="A01">A01 (Toán, Lý, Anh)</option>
                    <option value="B00">B00 (Toán, Hóa, Sinh)</option>
                    <option value="C00">C00 (Văn, Sử, Địa)</option>
                    <option value="D01">D01 (Toán, Văn, Anh)</option>
                    <option value="D07">D07 (Toán, Hóa, Anh)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block">Total Score (Điểm thi)</label>
                  <input 
                    value={thptScore}
                    onChange={(e) => setThptScore(e.target.value)}
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface placeholder:text-outline" 
                    placeholder="e.g. 26.5" 
                    type="number" 
                    step="0.01"
                    min="0"
                    max="30"
                  />
                </div>
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Column: Mini Cards & Summary */}
        <div className="lg:col-span-4 space-y-8">
          {studyTarget === 'abroad' && (
            <>
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                  <Search size={20} className="text-primary" />
                  <h3 className="font-label-md text-label-md font-bold text-primary uppercase">Study Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-on-surface-variant mb-2">Target Destinations</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'USA', active: true },
                        { name: 'UK', active: false },
                        { name: 'Australia', active: true },
                      ].map(c => (
                        <span key={c.name} className={`px-3 py-1 rounded text-sm font-semibold border ${
                          c.active
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-transparent text-on-surface border-outline-variant'
                        }`}>{c.name}</span>
                      ))}
                      <span className="px-3 py-1 rounded text-sm font-medium border border-outline-variant text-on-surface">Canada</span>
                      <span className="px-3 py-1 rounded text-sm font-medium border border-outline-variant text-on-surface">+ Add</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant mb-1">Primary Field of Study</p>
                    <select className="w-full bg-background border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                      <option>Select major/field</option>
                      <option value="cs">Computer Science &amp; IT</option>
                      <option value="bus">Business &amp; Finance</option>
                      <option value="eng">Engineering</option>
                    </select>
                  </div>
                </div>
              </motion.section>

              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                  <Wallet size={20} className="text-primary" />
                  <h3 className="font-label-md text-label-md font-bold text-primary uppercase">Financial Profile</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-on-surface-variant">Annual Budget (Tuition)</span>
                      <span className="font-bold text-sm text-primary">$30,000 USD</span>
                    </div>
                    <div className="relative">
                      <input type="range" min="10000" max="100000" defaultValue="30000" className="w-full h-1.5 accent-primary bg-surface-container rounded-full appearance-none cursor-pointer" />
                      <div className="flex justify-between text-[10px] text-outline mt-1">
                        <span>$10k</span>
                        <span>$50k</span>
                        <span>$100k+</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background border border-outline-variant rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-on-surface">Require Scholarships</p>
                      <p className="text-xs text-on-surface-variant">Need financial aid to attend</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" onChange={() => {}} />
                      <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </motion.section>
            </>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-3 px-4 border border-outline-variant rounded-lg font-medium text-sm text-on-surface hover:bg-surface-container transition-colors text-center">
              Save Draft
            </button>
            <button onClick={handleSave} className="w-full py-3 bg-primary text-on-primary rounded-lg font-medium text-sm hover:opacity-90 transition-colors shadow-sm">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

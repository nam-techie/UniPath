import { BarChart3, CheckCircle2, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Budget() {
  const [budget, setBudget] = useState(35000);

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Budget & Finance Planning</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Plan your educational finances, estimate costs, and track your funding status to ensure a smooth study abroad transition.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Tuition Card */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <Wallet size={22} />
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-primary">Tuition & Living Expenses</h3>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface font-bold text-xs uppercase tracking-wider">Annual Tuition Budget</label>
                  <div className="flex items-center gap-2 bg-background p-2 px-4 rounded-xl border border-outline-variant">
                    <span className="text-outline">$</span>
                    <input 
                      className="w-24 bg-transparent text-right font-display font-bold text-lg text-primary border-none outline-none focus:ring-0 p-0" 
                      type="number" 
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                    />
                    <span className="text-on-surface-variant font-label-sm text-xs font-bold">USD</span>
                  </div>
                </div>
                <div className="relative pt-2">
                  <input
                    className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                    max="100000"
                    min="10000"
                    step="1000"
                    type="range"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[11px] font-bold text-outline mt-3 uppercase tracking-widest">
                    <span>$10k</span>
                    <span>$50k</span>
                    <span>$100k+</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-label-md text-label-md text-on-surface block font-bold text-xs uppercase tracking-wider">Estimated Living Expenses (Monthly)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-medium">$</span>
                    <input 
                      className="w-full bg-background border border-outline-variant rounded-xl pl-8 pr-4 py-4 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface font-medium" 
                      placeholder="e.g. 1,500" 
                      type="text" 
                      defaultValue="1,200"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="font-label-md text-label-md text-on-surface block font-bold text-xs uppercase tracking-wider">Currency Preference</label>
                  <select className="w-full bg-background border border-outline-variant rounded-xl px-4 py-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium">
                    <option value="usd">USD - US Dollar</option>
                    <option value="eur">EUR - Euro</option>
                    <option value="gbp">GBP - British Pound</option>
                    <option value="vnd">VND - Vietnamese Dong</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Financial Aid Card */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <BarChart3 size={22} />
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-primary">Financial Aid & Scholarships</h3>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-background rounded-xl border border-outline-variant group hover:border-primary transition-colors">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">Require Financial Assistance</p>
                  <p className="text-sm text-on-surface-variant mt-1">Check this if you need scholarships or grants to fund your studies</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input checked className="sr-only peer" type="checkbox" onChange={() => {}} />
                  <div className="w-12 h-7 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="space-y-3">
                <label className="font-label-md text-label-md text-on-surface block font-bold text-xs uppercase tracking-wider">Target Scholarship Amount</label>
                <input 
                  className="w-full bg-background border border-outline-variant rounded-xl px-5 py-4 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container transition-all text-on-surface font-medium placeholder:text-outline" 
                  placeholder="e.g. $10,000" 
                  type="text" 
                />
              </div>
            </div>
          </motion.section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Proof of Funds status card */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-outline-variant pb-4">
              <CheckCircle2 size={20} className="text-primary" />
              <h3 className="font-label-md text-label-md font-bold text-primary uppercase text-xs tracking-wider">Proof of Funds</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-secondary/5 rounded-xl border border-secondary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1 rounded-full bg-secondary text-on-secondary shadow-sm">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-display font-bold text-on-background">Status: Ready</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">You have indicated sufficient funds for most target university requirements.</p>
              </div>

              <div className="space-y-3">
                <label className="font-label-md text-label-md text-on-surface block font-bold text-xs uppercase tracking-wider">Bank Balance Proof Status</label>
                <select className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 font-body-md focus:ring-1 focus:ring-primary outline-none font-medium">
                  <option value="ready">Verified Document Available</option>
                  <option value="pending">Under Review</option>
                  <option value="not_started">Not Started</option>
                </select>
              </div>
            </div>
          </motion.section>

          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm">
              Update Financial Profile
            </button>
            <button className="w-full py-4 border border-outline-variant rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors text-center font-bold">
              Generate Budget Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

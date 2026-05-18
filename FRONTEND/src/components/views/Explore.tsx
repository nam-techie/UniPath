import { ChevronLeft, ChevronRight, Heart, Languages, Star, ArrowUpDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ExploreProps {
  onProgramClick: () => void;
}

export default function Explore({ onProgramClick }: ExploreProps) {
  const [activeTab, setActiveTab] = useState<'programmes' | 'universities' | 'scholarships'>('programmes');
  const [activeDegree, setActiveDegree] = useState<string>('Undergraduate');

  const programs = [
    {
      id: 1,
      university: 'Curtin University',
      rating: 4.3,
      reviews: 70,
      location: 'Perth, Australia +1',
      rank: 'Top 1% in Worldwide',
      title: 'Bachelor of Science (Science)',
      description: 'This Bachelor of Science (Science) degree from Curtin University is designed to be a flexible degree that can respond to new and unpredictable...',
      tags: ['B.Sc.', 'Full-time +2', 'On-campus'],
      duration: '3 years',
      tuition: '₫833,078,384',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr_hDixNEfys1RoRmEQY1DlxhGopfJcP71To3aJGGCny_bWZPf8NuReVyABzpbmn2nQCdqfxC8dHOX_sfDwpzxUKoHUcoak-qOd12abimESwhg34OQyMTtX4Jzm2PQB-tE9ymWqYu3-DMfSov4Ft-bXCeDxtIzXGiGDdL3oJAA9No6AZzg_tX8bdNz72mKmuUJdI_WzdLZ9A38fBYtkKMIGSwAuYtv9jd8OOAY33VgBAWr73lCtwMVn7LVU8u66IkQqNHdIF3DgEkG'
    },
    {
      id: 2,
      university: 'Federation University Australia',
      rating: 4.1,
      reviews: 33,
      location: 'Ballarat, Australia +1',
      rank: 'Top 6% in Worldwide',
      title: 'Information Technology (AI and Data Science)',
      description: 'This Information Technology (AI and Data Science) programme from Federation University Australia gives you a broad knowledge applica...',
      tags: ['Bachelor', 'Full-time +2', 'On-campus +2'],
      duration: '3 years',
      tuition: '₫779,915,994',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr_hDixNEfys1RoRmEQY1DlxhGopfJcP71To3aJGGCny_bWZPf8NuReVyABzpbmn2nQCdqfxC8dHOX_sfDwpzxUKoHUcoak-qOd12abimESwhg34OQyMTtX4Jzm2PQB-tE9ymWqYu3-DMfSov4Ft-bXCeDxtIzXGiGDdL3oJAA9No6AZzg_tX8bdNz72mKmuUJdI_WzdLZ9A38fBYtkKMIGSwAuYtv9jd8OOAY33VgBAWr73lCtwMVn7LVU8u66IkQqNHdIF3DgEkG'
    }
  ];

  const tabs = [
    { id: 'programmes' as const, label: 'Programmes' },
    { id: 'universities' as const, label: 'Universities' },
    { id: 'scholarships' as const, label: 'Scholarships' },
  ];

  const degreeOptions = ['Undergraduate', 'Postgraduate', 'Ph.D.'];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
        <div className="bg-surface rounded-xl border border-outline-variant p-6 shadow-sm">
          <h2 className="text-base font-bold text-on-surface mb-6">Filters</h2>
          
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Country</h3>
            <div className="space-y-2">
              {['USA', 'Canada', 'Australia', 'UK', 'Singapore'].map(country => (
                <label key={country} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary accent-primary" 
                    defaultChecked={country === 'USA'}
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">{country}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 border-b border-outline-variant pb-6">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Field of Study</h3>
            <select className="w-full border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option>Computer Science</option>
              <option>Business Administration</option>
              <option>Engineering</option>
              <option>Medicine</option>
            </select>
          </div>

          <div className="mb-6 border-b border-outline-variant pb-6">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Tuition Budget (per year)</h3>
            <div className="space-y-2">
              {['Under $20k', '$20k - $40k', '$40k - $60k', 'Over $60k'].map(budget => (
                <label key={budget} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="budget"
                    className="w-4 h-4 text-primary border-outline-variant focus:ring-primary accent-primary" 
                    defaultChecked={budget === '$20k - $40k'}
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">{budget}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-on-surface mb-3">Degree Level</h3>
            <div className="flex flex-wrap gap-2">
              {degreeOptions.map(deg => (
                <button
                  key={deg}
                  onClick={() => setActiveDegree(deg)}
                  className={`px-3 py-1 border rounded-full text-xs font-semibold transition-colors ${
                    activeDegree === deg
                      ? 'bg-primary text-on-primary border-primary'
                      : 'border-outline-variant text-on-surface-variant hover:bg-surface-container hover:border-primary/50'
                  }`}
                >
                  {deg}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results List */}
      <section className="flex-grow">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-on-surface">633 Bachelor's degrees in Computer Science &amp; IT in Australia</h1>
          {/* Tab bar — matching Figma */}
          <div className="flex items-center gap-6 mt-4 border-b border-outline-variant overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium pb-2 whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-primary border-primary font-bold'
                    : 'text-on-surface-variant border-transparent hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end items-center gap-4 mt-4 text-sm text-on-surface-variant">
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              <span>VND</span>
              <Languages size={18} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
              <span>Sort</span>
              <ArrowUpDown size={18} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {programs.map((program, idx) => (
            <motion.article 
              key={program.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative p-4"
            >
              <button className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
                <Heart size={20} />
              </button>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-background rounded-lg border border-outline-variant flex items-center justify-center flex-shrink-0">
                  <img alt="Univ Logo" className="w-6 h-6 object-contain" src={program.logo} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm text-on-surface font-semibold">{program.university}</span>
                    <div className="flex items-center gap-0.5 text-on-surface text-[11px]">
                      <span className="font-semibold">{program.rating}</span>
                      <Star size={12} className="text-secondary fill-secondary" />
                      <span className="text-on-surface-variant">({program.reviews})</span>
                    </div>
                  </div>
                  <div className="text-[11px] leading-tight text-on-surface-variant flex gap-2">
                    <span>{program.location}</span>
                    <span className="text-outline">•</span>
                    <span>{program.rank}</span>
                  </div>
                  <h2 
                    onClick={onProgramClick}
                    className="text-base font-bold text-on-surface mt-2 hover:text-primary cursor-pointer transition-colors"
                  >
                    {program.title}
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 md:line-clamp-1">{program.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {program.tags.map(tag => (
                      <span key={tag} className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-medium border border-outline-variant/30">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 gap-4">
                    <span className="text-[11px] text-secondary font-semibold uppercase tracking-wider bg-secondary/10 px-2 py-0.5 rounded">Featured</span>
                    <div className="text-right leading-tight w-full sm:w-auto">
                      <div className="text-xs text-on-surface mb-1">
                        {program.duration} • <span className="font-bold text-primary">{program.tuition}</span>/yr
                      </div>
                      <button 
                        onClick={onProgramClick}
                        className="text-primary text-xs font-bold hover:underline"
                      >
                        View Programme Information
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold text-sm shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant text-sm transition-colors border border-transparent">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant text-sm transition-colors border border-transparent">3</button>
          <span className="text-on-surface-variant px-2">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant text-sm transition-colors border border-transparent">15</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-outline-variant">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="UniPath Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLfsX9jyvBw1om9PM_UzGEFpxYYzzmC5WN9gHID78iGAToOsxuuRMasO0e8lHIRxxWVFRs1wMogpZfuLjC_kd8Al0sIpINoc-Q8Cv-oHWRuqQGpfyg1BLsZvR0HjNKFTaV3GscWyn-jZqsmfyTF1w1Zgx0sszbv9JgoumYBRckO72dv0mdJ0egljBOX4SjYHjJXnYvW-Qv5grbaRroN8ONfJ2zegaAOhWiZPMLjzfoUJCNwmwPX-G9XH1504tDYUe1SvFtguU9IO42"
              />
              <div>
                <p className="text-xs text-on-surface-variant">© 2024 EduPath Vietnam. Academic Excellence &amp; Supportive Guidance.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-on-surface-variant">
              {['About Us', 'University Partners', 'Privacy Policy', 'Terms of Service', 'Contact Support'].map(l => (
                <button key={l} className="hover:text-primary transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

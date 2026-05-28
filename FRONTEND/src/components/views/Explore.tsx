import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Heart, Languages, Star, ArrowUpDown, Building2, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { University } from '../../types/university';
import { universityService } from '../../services/universityService';
import { ProgramResponse } from '../../types/program';
import { programService } from '../../services/programService';

interface ExploreProps {
  onProgramClick: () => void;
}

export default function Explore({ onProgramClick }: ExploreProps) {
  const [activeTab, setActiveTab] = useState<'programmes' | 'universities' | 'scholarships'>('universities');
  const [activeDegree, setActiveDegree] = useState<string>('Undergraduate');
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<ProgramResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) items.push(i);
    } else {
      items.push(0);
      if (currentPage > 2) items.push('...');
      
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages - 2, currentPage + 1);
      
      if (currentPage <= 2) end = 3;
      if (currentPage >= totalPages - 3) start = totalPages - 4;
      
      for (let i = start; i <= end; i++) items.push(i);
      
      if (currentPage < totalPages - 3) items.push('...');
      items.push(totalPages - 1);
    }
    return items;
  };

  const handleTabChange = (tab: 'programmes' | 'universities' | 'scholarships') => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (activeTab === 'universities') {
      const fetchUniversities = async () => {
        try {
          setLoading(true);
          const response = await universityService.getAllUniversities(currentPage, 10);
          if (response.success) {
            setUniversities(response.data.content);
            setTotalPages(response.data.totalPages);
          }
        } catch (error) {
          console.error("Failed to fetch universities:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUniversities();
    } else if (activeTab === 'programmes') {
      const fetchPrograms = async () => {
        try {
          setLoading(true);
          const response = await programService.getAllPrograms(currentPage, 10);
          if (response.success) {
            setPrograms(response.data.content);
            setTotalPages(response.data.totalPages);
          }
        } catch (error) {
          console.error("Failed to fetch programs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPrograms();
    }
  }, [activeTab, currentPage]);

  // Removed mock programs array

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
          <h1 className="text-2xl font-bold text-on-surface">
            {activeTab === 'universities' ? `Explore ${universities.length > 0 ? universities.length : ''} Universities in Vietnam` : `Explore ${programs.length > 0 ? programs.length : ''} Programmes in Vietnam`}
          </h1>
          {/* Tab bar — matching Figma */}
          <div className="flex items-center gap-6 mt-4 border-b border-outline-variant overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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
          {activeTab === 'universities' ? (
            loading ? (
              <div className="flex justify-center p-8 text-on-surface-variant font-medium">Đang tải danh sách trường đại học...</div>
            ) : universities.length > 0 ? (
              universities.map((uni, idx) => (
                <motion.article 
                  key={uni.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative p-4"
                >
                  <button className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
                    <Heart size={20} />
                  </button>
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-background rounded-lg border border-outline-variant flex items-center justify-center flex-shrink-0 p-1">
                      {uni.logoUrl ? (
                        <img alt={`${uni.name} Logo`} className="w-full h-full object-contain" src={uni.logoUrl} />
                      ) : (
                        <Building2 size={24} className="text-outline" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm text-on-surface font-semibold">{uni.code !== 'UNKNOWN' ? uni.code : 'ĐH'}</span>
                        <div className="flex items-center gap-0.5 text-on-surface text-[11px]">
                           <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">{uni.institutionType || 'Đại học'}</span>
                        </div>
                      </div>
                      <h2 
                        className="text-lg font-bold text-on-surface mt-1 hover:text-primary cursor-pointer transition-colors"
                      >
                        {uni.name}
                      </h2>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 gap-4">
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                          {uni.websiteUrl && (
                            <a href={uni.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                              <Globe size={14} /> Website chính thức
                            </a>
                          )}
                        </div>
                        <div className="text-right leading-tight w-full sm:w-auto">
                          <button 
                            className="text-primary text-xs font-bold hover:underline"
                          >
                            Xem thông tin tuyển sinh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="flex justify-center p-8 text-on-surface-variant font-medium">Chưa có dữ liệu trường đại học.</div>
            )
          ) : (
            loading ? (
              <div className="flex justify-center p-8 text-on-surface-variant font-medium">Đang tải danh sách ngành học...</div>
            ) : programs.length > 0 ? (
              programs.map((program, idx) => (
                <motion.article 
                  key={program.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative p-4"
                >
                  <button className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
                    <Heart size={20} />
                  </button>
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-background rounded-lg border border-outline-variant flex items-center justify-center flex-shrink-0 p-1">
                      {program.universityLogo ? (
                        <img alt={`${program.universityName} Logo`} className="w-full h-full object-contain" src={program.universityLogo} />
                      ) : (
                        <Building2 size={24} className="text-outline" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm text-on-surface font-semibold">{program.universityName}</span>
                      </div>
                      <div className="text-[11px] leading-tight text-on-surface-variant flex gap-2">
                        <span>{program.universityCode}</span>
                        {program.programType && (
                          <>
                            <span className="text-outline">•</span>
                            <span>{program.programType}</span>
                          </>
                        )}
                      </div>
                      <h2 
                        onClick={onProgramClick}
                        className="text-base font-bold text-on-surface mt-2 hover:text-primary cursor-pointer transition-colors"
                      >
                        {program.name}
                      </h2>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {program.admissionRequirements && program.admissionRequirements.map((req, i) => (
                          <span key={i} className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-medium border border-outline-variant/30">
                            {req.method === 'DIEM_THI' ? 'Thi THPT' : req.method} 
                            {req.blocks && req.blocks.length > 0 ? ` (${req.blocks.join(', ')})` : ''} 
                            {req.minScore ? `: ${req.minScore}` : ''}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 gap-4">
                        <span className="text-[11px] text-secondary font-semibold uppercase tracking-wider bg-secondary/10 px-2 py-0.5 rounded">
                           {program.tuitionFees && program.tuitionFees.length > 0 ? `${program.tuitionFees[0].amount.toLocaleString('vi-VN')} VND/${program.tuitionFees[0].period === 'NAM' ? 'năm' : 'kỳ'}` : 'Chưa có thông tin học phí'}
                        </span>
                        <div className="text-right leading-tight w-full sm:w-auto">
                          <button 
                            onClick={onProgramClick}
                            className="text-primary text-xs font-bold hover:underline"
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="flex justify-center p-8 text-on-surface-variant font-medium">Chưa có dữ liệu ngành học.</div>
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button 
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="First Page"
            >
              <ChevronsLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft size={20} />
            </button>
            
            {getPaginationItems().map((item, index) => (
              item === '...' ? (
                <span key={`ellipsis-${index}`} className="text-on-surface-variant px-2">...</span>
              ) : (
                <button 
                  key={item}
                  onClick={() => setCurrentPage(item as number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors shadow-sm ${
                    currentPage === item 
                      ? 'bg-primary text-on-primary' 
                      : 'text-on-surface-variant hover:bg-surface-container border border-transparent'
                  }`}
                >
                  {(item as number) + 1}
                </button>
              )
            ))}
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Last Page"
            >
              <ChevronsRight size={20} />
            </button>
          </div>
        )}

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

import { BookOpen, CheckCircle2, Heart, Star, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { programService } from '../../services/programService';

interface RecommendationsProps {
  onProgramClick: () => void;
}

export default function Recommendations({ onProgramClick }: RecommendationsProps) {
  const [recommendedPrograms, setRecommendedPrograms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const saved = localStorage.getItem('unipath_profile');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.studyTarget === 'domestic' && data.thptBlock && data.thptScore) {
          setIsLoading(true);
          try {
            const response = await programService.getRecommendedPrograms(data.thptBlock, parseFloat(data.thptScore), 0, 10);
            if (response.data && response.data.content) {
              const mapped = response.data.content.map(p => {
                // Find THPT req
                const thptReq = p.admissionRequirements?.find(r => r.method === 'THPT_EXAM');
                const minScore = thptReq ? thptReq.minScore : 0;
                const scoreDiff = parseFloat(data.thptScore) - minScore;
                
                let type = 'match';
                let matchScore = 80;
                if (scoreDiff >= 2) { type = 'safe'; matchScore = 95; }
                else if (scoreDiff < 0.5) { type = 'reach'; matchScore = 70; }
                else { matchScore = 85 + Math.round(scoreDiff * 5); }

                return {
                  id: p.id,
                  type,
                  university: p.universityName,
                  location: 'Vietnam',
                  logo: p.universityLogo || 'https://via.placeholder.com/150',
                  program: p.name,
                  matchScore,
                  tags: [p.programType || 'Standard', data.thptBlock],
                  tuition: p.tuitionFees?.length ? `${p.tuitionFees[0].amount} VND` : 'Contact details',
                  ielts: 'N/A',
                  deadline: 'Upcoming',
                  scholarships: [],
                  minScore
                };
              });
              setRecommendedPrograms(mapped);
            }
          } catch (error) {
            console.error('Failed to fetch recommendations', error);
          } finally {
            setIsLoading(false);
          }
          return;
        }
      }
      // Default mock for abroad or empty profile
      setRecommendedPrograms(mockPrograms);
    };

    fetchRecommendations();
  }, []);

  const mockPrograms = [
    {
      id: 1,
      type: 'safe' as const,
      university: 'RMIT University Vietnam',
      location: 'Ho Chi Minh City, Vietnam',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQuYKiX745ixwbIvSI6bOGrMtDMlbVZg2w7dYkZ4oGxCu1BLRoqNUFdz9Yu8oaHKDiRilXXDsSkn1CSuvuaI_-OnYkBNGuE73pZCVdEhvHcs9OmSUNJEguQzX0DWdh3vhuYCmpA5PUaDlom7eX5M1txjL7Tj3fp6O-F2ReI56kt-BSVQuYfjI2BVUAanDOFPv_nDgDA3xtOA8JQEVXLdSphyMTHzGX8v82GrjqTaL1I61WVCZ7NoFbPCUrzmCkUPbcEKzWUf14gl04',
      program: 'Bachelor of Information Technology',
      matchScore: 96,
      tags: ['Bachelor', 'On-campus', '3 Years'],
      tuition: '~320M VND/yr',
      ielts: '6.0',
      deadline: 'Rolling',
      scholarships: ['Early Bird 10%'],
    },
    {
      id: 2,
      type: 'match' as const,
      university: 'University of Melbourne',
      location: 'Melbourne, Australia',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQuYKiX745ixwbIvSI6bOGrMtDMlbVZg2w7dYkZ4oGxCu1BLRoqNUFdz9Yu8oaHKDiRilXXDsSkn1CSuvuaI_-OnYkBNGuE73pZCVdEhvHcs9OmSUNJEguQzX0DWdh3vhuYCmpA5PUaDlom7eX5M1txjL7Tj3fp6O-F2ReI56kt-BSVQuYfjI2BVUAanDOFPv_nDgDA3xtOA8JQEVXLdSphyMTHzGX8v82GrjqTaL1I61WVCZ7NoFbPCUrzmCkUPbcEKzWUf14gl04',
      program: 'Bachelor of Data Science',
      matchScore: 88,
      tags: ['Bachelor', 'On-campus', '3 Years'],
      tuition: '$48,000 AUD/yr',
      ielts: '6.5',
      deadline: '30 Nov 2024',
      scholarships: ['Global Scholar', 'VN Excellence'],
    },
    {
      id: 3,
      type: 'reach' as const,
      university: 'University of Toronto',
      location: 'Toronto, Canada',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApQGZj05LR-BxA5viAuXiR05Aue8bnNdnAbKPGzc0rfVx_sIm0tLdGiB5XiJQqr54cfCLSQzSjQKMLTBXD1lF08tlM750CGN8cwahVnv6X3Ozrr9aGacGd-HAJ6btRLP7pEPZLlbnrI1XBZTEplALq-xZKdElaNvEDVx7srLCmPnMCTSmdHVjsEV8xKFZAvHVY-fEEGtSoT0HLN0XWcWuVu_vi_8WoZ7oEHGjNwJxtmbdoCMV2iJS09qRJCbD5tFUeHraYKy4w_5x',
      program: 'B.Sc. Computer Science (AI Stream)',
      matchScore: 74,
      tags: ['Bachelor', 'On-campus', '4 Years'],
      tuition: 'CAD $58,000/yr',
      ielts: '7.0',
      deadline: '15 Jan 2025',
      scholarships: ["Dean's Scholarship"],
    },
    {
      id: 4,
      type: 'match' as const,
      university: 'Curtin University',
      location: 'Perth, Australia',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr_hDixNEfys1RoRmEQY1DlxhGopfJcP71To3aJGGCny_bWZPf8NuReVyABzpbmn2nQCdqfxC8dHOX_sfDwpzxUKoHUcoak-qOd12abimESwhg34OQyMTtX4Jzm2PQB-tE9ymWqYu3-DMfSov4Ft-bXCeDxtIzXGiGDdL3oJAA9No6AZzg_tX8bdNz72mKmuUJdI_WzdLZ9A38fBYtkKMIGSwAuYtv9jd8OOAY33VgBAWr73lCtwMVn7LVU8u66IkQqNHdIF3DgEkG',
      program: 'Bachelor of Science (Computer Science)',
      matchScore: 85,
      tags: ['Bachelor', 'Full-time', '3 Years'],
      tuition: '₫833,078,384/yr',
      ielts: '6.0',
      deadline: '31 Dec 2024',
      scholarships: ['Merit Award'],
    },
  ];

  const typeConfig = {
    safe:  { label: 'Safe',  color: 'bg-emerald-100 text-emerald-700 border-emerald-300',  icon: CheckCircle2,  bar: 'bg-emerald-500' },
    match: { label: 'Match', color: 'bg-secondary/15 text-secondary border-secondary/30',  icon: Star,          bar: 'bg-secondary' },
    reach: { label: 'Reach', color: 'bg-amber-100 text-amber-700 border-amber-300',         icon: TrendingUp,    bar: 'bg-amber-500' },
  };

  const stats = [
    { label: 'Safe Programs',  value: '2', sub: 'High acceptance probability',   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { label: 'Match Programs', value: '2', sub: 'Strong fit with your profile',  color: 'text-secondary',   bg: 'bg-secondary/5 border-secondary/20' },
    { label: 'Reach Programs', value: '1', sub: 'Stretch goals worth pursuing',  color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto py-8">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-on-surface">My Recommendations</h1>
            <p className="text-sm text-on-surface-variant">Personalized university matches based on your academic profile</p>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl border p-5 ${s.bg}`}
          >
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="font-semibold text-on-surface text-sm mt-1">{s.label}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Program cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedPrograms.map((prog, idx) => {
          const cfg = typeConfig[prog.type as keyof typeof typeConfig] || typeConfig.match;
          const TypeIcon = cfg.icon;
          return (
            <motion.article
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1 }}
              className="bg-surface border border-outline-variant rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card header */}
              <div className="p-5 flex items-start justify-between gap-3 border-b border-outline-variant/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface-container rounded-xl border border-outline-variant flex items-center justify-center flex-shrink-0">
                    <img alt={prog.university} src={prog.logo} className="w-8 h-8 object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-on-surface leading-tight truncate">{prog.university}</p>
                    <p className="text-xs text-on-surface-variant">{prog.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border flex items-center gap-1 ${cfg.color}`}>
                    <TypeIcon size={11} />
                    {cfg.label}
                  </span>
                  <button className="p-1.5 text-on-surface-variant hover:text-error transition-colors">
                    <Heart size={16} />
                  </button>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4 flex-grow">
                {/* Program name & match score */}
                <div>
                  <button
                    onClick={onProgramClick}
                    className="font-bold text-base text-on-surface hover:text-primary transition-colors text-left leading-snug group-hover:text-primary"
                  >
                    {prog.program}
                  </button>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {prog.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded text-[10px] font-medium border border-outline-variant/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match score bar */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-on-surface-variant font-medium">Profile Match</span>
                    <span className="text-xs font-bold text-on-surface">{prog.matchScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prog.matchScore}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${cfg.bar}`}
                    />
                  </div>
                </div>

                {/* Key info grid */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-surface-container-low rounded-lg p-2.5">
                    <p className="text-outline uppercase tracking-wider font-bold text-[9px] mb-1">Tuition</p>
                    <p className="font-bold text-on-surface text-[11px] leading-tight">{prog.tuition}</p>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-2.5">
                    <p className="text-outline uppercase tracking-wider font-bold text-[9px] mb-1">Required Score</p>
                    <p className="font-bold text-on-surface text-[11px]">{prog.minScore ? `${prog.minScore}` : prog.ielts}</p>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-2.5">
                    <p className="text-outline uppercase tracking-wider font-bold text-[9px] mb-1">Deadline</p>
                    <p className="font-bold text-on-surface text-[11px] leading-tight">{prog.deadline}</p>
                  </div>
                </div>

                {/* Scholarships */}
                {prog.scholarships.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {prog.scholarships.map(s => (
                      <span key={s} className="flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-semibold">
                        🏅 {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="flex gap-2 px-5 pb-5">
                <button
                  onClick={onProgramClick}
                  className="flex-1 py-2.5 bg-surface border border-outline-variant text-primary rounded-xl text-sm font-bold hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen size={14} />
                  View Details
                </button>
                <button className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-sm">
                  Shortlist
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
        </>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-outline-variant">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg text-on-surface">UniPath</p>
            <p className="text-on-surface-variant text-xs mt-0.5">© 2024 UniPath. Academic authority and supportive clarity.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-on-surface-variant">
            {['About Us', 'University Partners', 'Privacy Policy', 'Terms of Service', 'Contact Support'].map(l => (
              <button key={l} className="hover:text-primary transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

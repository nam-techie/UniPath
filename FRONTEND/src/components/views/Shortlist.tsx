import { CheckCircle2, Columns2, Download, MapPin, Trash2, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Shortlist() {
  const [shortlist, setShortlist] = useState([
    {
      id: 1,
      university: 'University of Melbourne',
      location: 'Melbourne, Australia',
      program: 'Bachelor of Data Science',
      duration: '3 Years Full-time • On Campus',
      status: 'Match',
      statusType: 'match' as const,
      tuition: '$48,000 AUD',
      living: '~$24,000 AUD',
      deadline: '30 Nov 2024',
      deadlineUrgent: true,
      ielts: '6.5 (No band < 6.0)',
      scholarships: ['Global Scholar', 'VN Excellence'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACQN9-PiapbNNVyQrkJ5klDC0iGsWSbHR_XZ4ngIoVaQzStqsJ7a8gUWvt07BrhjBojD2kToRyZYwi9IsHEJpVcNT_FwQTeBZt2DU5sjTfmy8zQ2cgGhdRO54Gf5EnTCljYtGt0eibzYO22_ASmIAazjGTHDVNx5wuCfMfmdwKs0xywxmmAaevg0yesXGL4qCBpsTRJeTgTtD76i8JI6iqjUDX_5GDHqvjSt-x7SyHNNwE7Qo8CfObmGHPArje4TBDar0KqchLkLVM',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQuYKiX745ixwbIvSI6bOGrMtDMlbVZg2w7dYkZ4oGxCu1BLRoqNUFdz9Yu8oaHKDiRilXXDsSkn1CSuvuaI_-OnYkBNGuE73pZCVdEhvHcs9OmSUNJEguQzX0DWdh3vhuYCmpA5PUaDlom7eX5M1txjL7Tj3fp6O-F2ReI56kt-BSVQuYfjI2BVUAanDOFPv_nDgDA3xtOA8JQEVXLdSphyMTHzGX8v82GrjqTaL1I61WVCZ7NoFbPCUrzmCkUPbcEKzWUf14gl04'
    },
    {
      id: 2,
      university: 'University College London',
      location: 'London, UK',
      program: 'BSc Computer Science',
      duration: '3 Years Full-time • On Campus',
      status: 'Reach',
      statusType: 'reach' as const,
      tuition: '£37,500',
      living: '~£18,000',
      deadline: '15 Jan 2025',
      deadlineUrgent: true,
      ielts: '7.0 (No band < 6.5)',
      scholarships: ["Dean's List"],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Pba-yBB31BDP154SUctRYhxV5Ka-DBJkVe6KyHDbOkt67m3fbKvZLVIdws9ewVdSHG0MmmhOwp_oUZcUtGBQihWTt8PD0_qmN26ZT_dLnUc6dKaLyUvnzjFlrUZot-pHlCDXJ--mzPaGK-94HrcpJi0OMRyPCbie76pr8lud3GH332T2wm41N2k5lqtaM9TeuId_8FE68t7YUS-RlhuZX4sEnimjfeNKDBZiR8KypoI1gU7LIXzzqALWPw0Gb_z0STY57jqwVwXd',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApQGZj05LR-BxA5viAuXiR05Aue8bnNdnAbKPGzc0rfVx_sIm0tLdGiB5XiJQqr54cfCLSQzSjQKMLTBXD1lF08tlM750CGN8cwahVnv6X3Ozrr9aGacGd-HAJ6btRLP7pEPZLlbnrI1XBZTEplALq-xZKdElaNvEDVx7srLCmPnMCTSmdHVjsEV8xKFZAvHVY-fEEGtSoT0HLN0XWcWuVu_vi_8WoZ7oEHGjNwJxtmbdoCMV2iJS09qRJCbD5tFUeHraYKy4w_5x'
    },
    {
      id: 3,
      university: 'RMIT University',
      location: 'Ho Chi Minh City, VN',
      program: 'Bachelor of IT',
      duration: '3 Years Full-time • On Campus',
      status: 'Safe',
      statusType: 'safe' as const,
      tuition: '~320M VND',
      living: '~120M VND',
      deadline: 'Rolling',
      deadlineUrgent: false,
      ielts: '6.5 (No band < 6.0)',
      scholarships: ['Early Bird 10%', 'Academic Merit'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACQN9-PiapbNNVyQrkJ5klDC0iGsWSbHR_XZ4ngIoVaQzStqsJ7a8gUWvt07BrhjBojD2kToRyZYwi9IsHEJpVcNT_FwQTeBZt2DU5sjTfmy8zQ2cgGhdRO54Gf5EnTCljYtGt0eibzYO22_ASmIAazjGTHDVNx5wuCfMfmdwKs0xywxmmAaevg0yesXGL4qCBpsTRJeTgTtD76i8JI6iqjUDX_5GDHqvjSt-x7SyHNNwE7Qo8CfObmGHPArje4TBDar0KqchLkLVM',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQuYKiX745ixwbIvSI6bOGrMtDMlbVZg2w7dYkZ4oGxCu1BLRoqNUFdz9Yu8oaHKDiRilXXDsSkn1CSuvuaI_-OnYkBNGuE73pZCVdEhvHcs9OmSUNJEguQzX0DWdh3vhuYCmpA5PUaDlom7eX5M1txjL7Tj3fp6O-F2ReI56kt-BSVQuYfjI2BVUAanDOFPv_nDgDA3xtOA8JQEVXLdSphyMTHzGX8v82GrjqTaL1I61WVCZ7NoFbPCUrzmCkUPbcEKzWUf14gl04'
    }
  ]);

  const statusConfig = {
    match: { label: 'Match', icon: CheckCircle2, bg: 'bg-secondary/20', text: 'text-secondary', border: 'border-secondary/30' },
    reach: { label: 'Reach', icon: TrendingUp, bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
    safe:  { label: 'Safe',  icon: CheckCircle2, bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  };

  const removeItem = (id: number) => setShortlist(prev => prev.filter(i => i.id !== id));

  return (
    <div className="max-w-[1280px] mx-auto py-8 lg:py-12">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">My Shortlist</h1>
          <p className="text-on-surface-variant text-sm">
            You have saved <span className="font-bold text-on-surface">{shortlist.length} programs</span> to compare.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant rounded-xl text-on-surface-variant hover:bg-surface-container transition-all text-sm font-medium">
            <Download size={16} />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-all text-sm font-medium shadow-sm">
            <Columns2 size={16} />
            Detailed Comparison
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shortlist.map((item, idx) => {
          const cfg = statusConfig[item.statusType];
          const StatusIcon = cfg.icon;
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image + status badge */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  alt={item.university}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* Status badge */}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 border ${cfg.bg} ${cfg.text} ${cfg.border} backdrop-blur-sm`}>
                  <StatusIcon size={12} />
                  {cfg.label}
                </span>
                {/* Uni info overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-lg p-1 border border-outline-variant/50 flex-shrink-0">
                    <img alt="" className="w-full h-full object-contain" src={item.logo} />
                  </div>
                  <div className="text-white min-w-0">
                    <p className="font-bold text-sm leading-tight truncate">{item.university}</p>
                    <p className="text-xs opacity-80 flex items-center gap-0.5 mt-0.5">
                      <MapPin size={10} /> {item.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex-grow flex flex-col gap-4">
                <div>
                  <h2 className="font-bold text-lg text-on-surface leading-snug">{item.program}</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.duration}</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-outline-variant/50 py-4 text-xs">
                  <div>
                    <p className="text-outline uppercase tracking-[0.08em] font-bold text-[10px]">Tuition / Year</p>
                    <p className="font-bold text-on-surface mt-0.5">{item.tuition}</p>
                  </div>
                  <div>
                    <p className="text-outline uppercase tracking-[0.08em] font-bold text-[10px]">Living Costs</p>
                    <p className="font-bold text-on-surface mt-0.5">{item.living}</p>
                  </div>
                  <div>
                    <p className="text-outline uppercase tracking-[0.08em] font-bold text-[10px]">Deadline</p>
                    <p className={`font-bold mt-0.5 flex items-center gap-1 ${item.deadlineUrgent ? 'text-error' : 'text-on-surface'}`}>
                      {item.deadlineUrgent && <span className="text-error">⏰</span>}
                      {item.deadline}
                    </p>
                  </div>
                  <div>
                    <p className="text-outline uppercase tracking-[0.08em] font-bold text-[10px]">IELTS Req.</p>
                    <p className="font-bold text-on-surface mt-0.5">{item.ielts}</p>
                  </div>
                </div>

                {/* Scholarships */}
                {item.scholarships.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.scholarships.map(s => (
                      <span key={s} className="flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-semibold">
                        🏅 {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons — match Figma */}
              <div className="flex items-center gap-2 px-4 pb-4">
                <button className="flex-1 py-2.5 bg-surface border border-outline-variant text-primary rounded-xl text-sm font-bold hover:bg-surface-container transition-all">
                  View Details
                </button>
                <button className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-sm">
                  Apply Now
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove"
                  className="w-10 h-10 flex items-center justify-center text-outline hover:text-error hover:bg-error-container/20 rounded-xl transition-all border border-outline-variant flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.article>
          );
        })}

        {/* Discover More card — match Figma */}
        <motion.div
          whileHover={{ y: -4 }}
          className="border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center p-10 text-center min-h-[380px] hover:border-primary/50 hover:bg-white transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-5 group-hover:bg-primary/5 transition-colors">
            <Plus size={28} className="text-outline group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-bold text-xl text-on-surface mb-2">Discover More Programs</h3>
          <p className="text-on-surface-variant text-sm mb-6 max-w-[200px]">
            Explore our database of 500+ universities to find your perfect match.
          </p>
          <button className="px-5 py-2 border border-outline-variant rounded-xl text-on-surface text-sm font-medium hover:border-primary hover:text-primary transition-colors">
            Go to Recommendations
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-10 border-t border-outline-variant">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-xl text-on-surface">UniPath</p>
            <p className="text-on-surface-variant text-xs mt-1">© 2024 UniPath. Academic authority and supportive clarity.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-on-surface-variant">
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

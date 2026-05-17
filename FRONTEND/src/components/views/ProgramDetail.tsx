import { Calendar, CheckCircle, ChevronRight, Clock, Download, Heart, Info, MapPin, Milestone, Receipt, School, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProgramDetail() {
  return (
    <div className="w-full max-w-container-max mx-auto space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
        <button className="hover:text-primary transition-colors">Universities</button>
        <ChevronRight size={14} />
        <button className="hover:text-primary transition-colors">University of Washington</button>
        <ChevronRight size={14} />
        <span className="text-on-surface font-semibold">Computer Science</span>
      </nav>

      {/* Hero Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary/10 text-secondary font-medium text-sm px-3 py-1 rounded-full flex items-center gap-1 border border-secondary/20">
              <CheckCircle size={14} className="fill-secondary/20" />
              Top Match
            </span>
            <span className="bg-surface-container-high text-on-surface font-medium text-sm px-3 py-1 rounded-full border border-outline-variant">STEM Designated</span>
          </div>
          <h1 className="font-bold text-3xl text-on-surface leading-tight">
            B.S. Computer Science <br />
            <span className="text-primary font-normal text-2xl">(Data Science Track)</span>
          </h1>
          <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
            <MapPin size={18} className="text-primary" />
            <span>Seattle, Washington, USA</span>
          </div>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-outline rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md">
            <Download size={18} />
            Download Brochure
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors shadow-sm font-label-md text-label-md">
            <Heart size={18} />
            Shortlist Program
          </button>
        </div>
      </section>

      {/* Main Content + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Main Photo Card */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-outline-variant aspect-[21/9] relative bg-surface-container">
            <img 
              alt="UW Campus" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0P2IGHp1sVZ6FjSqlPn0isczDFwSgGKnal_wWifvdSqbdvZ4xc6YO_iobS9wDddHWWbePpgxUJTEVIwJGTtqQKkOuKtnsPQ21SgDuom4ZnxKylCyhbA87MDvKCVdfaonkrIr_zQk22X-Ppj-ifKKizoVqZebSTv8PRPqmtXIE8iHD9HmhetM9am31Cu5UnKmBRByF7NElUXelbYEHQNJ-l4NsaWeQ8Yd1HMUSqAah83kWsah0iS4XMWdcU5YVKCJSoOcf-lLaRqLI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex items-end p-8">
              <p className="text-on-primary font-body-lg text-body-lg max-w-2xl text-shadow-sm leading-relaxed">
                Prepare to lead the data revolution at a top-tier institution nestled in the heart of a major tech hub.
              </p>
            </div>
          </div>

          {/* Program Overview */}
          <section className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
              <Info size={24} className="text-primary" />
              Program Overview
            </h2>
            <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <p>The Data Science track within the B.S. Computer Science program provides rigorous training in the fundamentals of computing and statistical analysis. Students will develop expertise in machine learning, large-scale data management, and data visualization.</p>
              <p>Graduates are highly sought after by tech giants in the Seattle area and beyond, with a 95% placement rate within six months of graduation.</p>
            </div>
          </section>

          {/* Admission Requirements */}
          <section className="bg-surface border border-outline-variant rounded-xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
              <Milestone size={24} className="text-primary" />
              Admission Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-background p-5 rounded-lg border border-outline-variant">
                <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider block mb-1">Minimum GPA</span>
                <div className="font-display text-4xl font-bold text-on-surface">3.5+</div>
                <span className="text-on-surface-variant text-sm mt-1 block">Unweighted (4.0 scale)</span>
              </div>
              <div className="bg-background p-5 rounded-lg border border-outline-variant">
                <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider block mb-1">English Proficiency</span>
                <div className="font-display text-4xl font-bold text-on-surface">IELTS 7.0+</div>
                <span className="text-on-surface-variant text-sm mt-1 block">or TOEFL iBT 92+</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-on-surface mb-4">Prerequisite Courses</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-on-surface-variant text-sm">
                <li className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg"><CheckCircle size={18} className="text-secondary" /> Calculus I &amp; II</li>
                <li className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg"><CheckCircle size={18} className="text-secondary" /> Intro to Programming</li>
                <li className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg"><CheckCircle size={18} className="text-secondary" /> Physics (Calculus-based)</li>
                <li className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg"><CheckCircle size={18} className="text-secondary" /> English Composition</li>
              </ul>
            </div>
          </section>

          {/* Scholarships */}
          <section className="bg-primary-container/5 border border-primary/20 rounded-xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Receipt size={160} />
            </div>
            <div className="relative z-10">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-tertiary-container text-on-tertiary-container"><Star size={20} className="fill-current" /></div>
                Scholarships for Vietnamese Students
              </h2>
              <p className="text-on-surface-variant mb-8 font-body-md">UniPath partner opportunities specifically available for this program.</p>
              <div className="space-y-4">
                <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                    <h3 className="font-label-md text-label-md font-bold text-on-surface text-lg">Global Husky Scholarship</h3>
                    <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full">Up to $10,000/yr</span>
                  </div>
                  <p className="text-on-surface-variant font-body-md">Merit-based award for international freshmen demonstrating exceptional academic achievement in STEM subjects.</p>
                </div>
                <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                    <h3 className="font-label-md text-label-md font-bold text-on-surface text-lg">Vietnam Tech Innovators Grant</h3>
                    <span className="inline-block px-3 py-1 bg-surface-container-highest text-primary font-label-sm text-label-sm rounded-full">$5,000 one-time</span>
                  </div>
                  <p className="text-on-surface-variant font-body-md">Requires a brief essay on applying data science to solve challenges in Southeast Asia. Deadline: Jan 15.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface border border-outline-variant rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-8 pb-4 border-b border-outline-variant">Key Details</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-surface-container rounded-lg text-primary"><Clock size={24} /></div>
                <div>
                  <span className="block text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">Duration</span>
                  <span className="block text-on-surface font-label-md text-label-md font-bold">4 Years (Full-time)</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-surface-container rounded-lg text-primary"><Calendar size={24} /></div>
                <div>
                  <span className="block text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">Next Start Date</span>
                  <span className="block text-on-surface font-label-md text-label-md font-bold">September 2024</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-error-container/20 rounded-lg text-error"><Clock size={24} /></div>
                <div>
                  <span className="block text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">Application Deadline</span>
                  <span className="block text-error font-label-md text-label-md font-bold">November 15, 2023</span>
                  <span className="block text-xs text-on-surface-variant mt-1">Early Action Round</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-outline-variant">
              <h4 className="font-label-md text-label-md font-bold text-on-surface mb-6 uppercase tracking-wider">Estimated Annual Cost</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center font-body-md">
                  <span className="text-on-surface-variant">Tuition & Fees</span>
                  <span className="font-medium text-on-surface">$40,000</span>
                </div>
                <div className="flex justify-between items-center font-body-md">
                  <span className="text-on-surface-variant">Living Costs (Est.)</span>
                  <span className="font-medium text-on-surface">$18,000</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant border-dashed">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Total per year</span>
                  <span className="font-display text-2xl font-bold text-primary">$58,000</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button className="w-full py-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm mb-4">
                Apply Through UniPath
              </button>
              <button className="w-full py-4 border border-outline-variant text-on-surface rounded-lg font-label-md text-label-md hover:bg-background transition-colors">
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

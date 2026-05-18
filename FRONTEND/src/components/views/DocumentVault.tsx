import { Badge, CheckCircle, FileText, History, Image as ImageIcon, Loader2, MoreVertical, Clock, Upload } from 'lucide-react';
import { motion } from 'motion/react';

export default function DocumentVault() {
  const documents = [
    {
      id: 'transcripts',
      title: 'Academic Transcripts',
      status: 'Uploaded',
      statusColor: 'bg-secondary/10 text-secondary',
      icon: FileText,
      file: { name: 'High_School_Transcript.pdf', type: 'pdf' }
    },
    {
      id: 'identity',
      title: 'Identity Documents',
      status: 'Uploaded',
      statusColor: 'bg-secondary/10 text-secondary',
      icon: Badge,
      file: { name: 'Passport_Copy_Main_Page.jpg', type: 'image' },
      expiry: '24 Oct 2029'
    },
    {
      id: 'sop',
      title: 'Personal Statement / CV',
      status: 'Pending',
      statusColor: 'bg-surface-container-high text-on-surface-variant',
      icon: History,
      file: { name: 'Draft_SOP_v2.docx', type: 'doc' },
      action: 'Submit Final Version'
    }
  ];

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Document Vault</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Manage and organize your essential study abroad documents in one secure place. Keep track of uploads and document status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {documents.map((doc, idx) => (
          <motion.section 
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary border border-outline-variant/30">
                  <doc.icon size={22} />
                </div>
                <h3 className="font-headline-md text-body-lg font-semibold text-primary">{doc.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${doc.statusColor}`}>
                {doc.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border border-outline-variant flex items-center justify-between group hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary" size={20} />
                  <span className="text-body-md text-on-surface font-medium">{doc.file.name}</span>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
                  <MoreVertical size={20} />
                </button>
              </div>

              {doc.expiry && (
                <p className="text-xs text-on-surface-variant italic pl-1 flex items-center gap-1">
                  <Clock size={12} />
                  Expiry Date: {doc.expiry}
                </p>
              )}

              {doc.action ? (
                <button className="w-full py-4 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container transition-colors shadow-sm text-center">
                  {doc.action}
                </button>
              ) : (
                <button className="w-full py-3 border-2 border-dashed border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container hover:border-primary transition-all flex items-center justify-center gap-2 font-label-md">
                  <Upload size={18} />
                  Upload New Version
                </button>
              )}
            </div>
          </motion.section>
        ))}

        {/* Recommendations Tracker Component Pattern from Image */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                <Badge size={22} />
              </div>
              <h3 className="font-headline-md text-body-lg font-semibold text-primary">Recommendation Letters</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase tracking-wider">
              1/2 Received
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-background rounded-lg border border-outline-variant flex items-center justify-between group hover:border-secondary transition-colors">
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface font-bold">Dr. Nguyen Van A</span>
                <span className="text-xs text-secondary font-medium flex items-center gap-1">
                  <CheckCircle size={12} /> Received & Verified
                </span>
              </div>
              <CheckCircle size={20} className="text-secondary" />
            </div>
            <div className="p-4 bg-background rounded-lg border border-outline-variant flex items-center justify-between group hover:border-primary transition-colors">
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface font-bold">Ms. Tran Thi B</span>
                <span className="text-xs text-on-surface-variant flex items-center gap-1">
                  <Clock size={12} /> Awaiting upload
                </span>
              </div>
              <button className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors">
                <Upload size={20} />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

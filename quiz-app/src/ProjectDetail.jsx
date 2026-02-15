import { getProjectBySlug } from './projectsData';
import IndustrialGallery from './IndustrialGallery';

const ORANGE = '#EE410B';

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ORANGE}15` }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="font-bold text-slate-800 text-base">{value}</p>
      </div>
    </div>
  );
}

export default function ProjectDetail({ slug, assetsBase = 'assets/' }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Проект не найден</h1>
        <a href={assetsBase.startsWith('..') ? '../index.html' : 'index.html'} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#EE410B] text-[#EE410B] font-semibold rounded-xl hover:bg-[#EE410B]/5 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          На главную
        </a>
      </div>
    );
  }

  const worksText = project.worksList.join(', ');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back to Home - fixed, clearly visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
          <a
            href={assetsBase.startsWith('..') ? '../index.html' : 'index.html'}
            className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-[#EE410B] hover:text-[#EE410B] hover:bg-[#EE410B]/5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            На главную
          </a>
        </div>
      </div>

      <main className="pt-14">
        {/* 1. Hero Section */}
        <section className="relative h-[50vh] min-h-[320px] md:min-h-[400px] overflow-hidden">
          <img
            src={assetsBase + project.image.replace('assets/', '')}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.src = assetsBase + project.fallback.replace('assets/', '');
              e.target.onerror = () => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-600', 'to-slate-700');
              };
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
              <p className="inline-flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </p>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* 2. Info Grid (4 columns) */}
        <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoItem
              icon={<svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              label="Срок"
              value={project.duration}
            />
            <InfoItem
              icon={<svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              label="Стоимость"
              value={project.price}
            />
            <InfoItem
              icon={<svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
              label="Тип"
              value={project.type}
            />
            <InfoItem
              icon={<svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              label="Контроль"
              value={project.control}
            />
          </div>
        </section>

        {/* 3. Narrative Text */}
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              На объекте в <strong>{project.location}</strong> мы выполнили {worksText}.
            </p>
          </div>
        </section>

        {/* 4. Industrial Gallery - "Также реализуем коммерческие и промышленные объекты" */}
        <section className="max-w-6xl mx-auto px-4 pb-16 md:pb-24">
          <IndustrialGallery assetsBase={assetsBase} />
        </section>
      </main>
    </div>
  );
}

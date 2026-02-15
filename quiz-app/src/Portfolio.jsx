import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    slug: 'elkibaeva',
    title: 'Свайно-ростверковый фундамент + капитальный погреб',
    location: 'Елкибаева, 2025',
    duration: '2 недели',
    cost: '1 640 000 ₽',
    desc: 'Сложный проект с интеграцией бетонного погреба под домом. Выполнено полное армирование и заливка.',
    badge: 'Личный контроль Хайруллина Самата',
    image: 'assets/20230519_144554.webp',
    fallback: 'assets/20230519_144554.png',
  },
  {
    id: 2,
    slug: 'zhukovo',
    title: 'Фундамент под ключ за 6 дней',
    location: 'Жуково, 2025',
    duration: '6 дней',
    cost: '600 000 ₽',
    desc: 'Полный цикл работ от планировки участка до финишной заливки в рекордно короткие сроки без потери качества.',
    badge: 'Личный контроль Хайруллина Самата',
    image: 'assets/20230510_122030.webp',
    fallback: 'assets/20230510_122030.png',
  },
  {
    id: 3,
    slug: 'bulgakovo',
    title: 'Свайно-ростверковый фундамент под дом',
    location: 'Булгаково, 2023',
    duration: '6 дней',
    cost: '715 000 ₽',
    desc: 'Классическое решение для частного домостроения. Идеальная геометрия и соблюдение всех норм ГОСТ.',
    badge: 'Личный контроль Хайруллина Самата',
    image: 'assets/20230519_154559.webp',
    fallback: 'assets/20230519_154559.png',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function PortfolioCard({ project, index, onImageClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      variants={item}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <button
        type="button"
        onClick={() => onImageClick(project)}
        className="w-full text-left block flex-shrink-0"
        aria-label={`Открыть фото: ${project.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white flex-shrink-0 -mb-[2px]">
          <div className="absolute inset-0 overflow-hidden bg-white" style={{ clipPath: 'inset(0 0 25% 0)' }}>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover block scale-[1.05] group-hover:scale-[1.08] transition-transform duration-500"
              loading="lazy"
              width={400}
              height={300}
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                if (project.fallback && e.target.src !== project.fallback) {
                  e.target.src = project.fallback;
                } else {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-600', 'to-slate-700');
                }
              }}
            />
          </div>
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/60 text-white text-[10px] sm:text-xs font-medium z-10">
            {project.badge || 'Личный контроль Хайруллина Самата'}
          </div>
        </div>
      </button>
      <div className="flex-grow flex flex-col px-4 pb-4 pt-2 md:px-5 md:pb-5 md:pt-3 min-w-0 -mt-px border-none bg-white">
        <h3 className="font-bold text-slate-800 text-xl md:text-lg mb-1.5 line-clamp-2 whitespace-normal min-h-[3.5rem]" title={project.title}>{project.title}</h3>
        <p className="inline-flex items-center gap-1.5 text-slate-600 text-base md:text-sm font-medium mb-2" title={project.location}>
          <svg className="w-4 h-4 text-[#EE410B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </p>
        <p className="text-slate-600 text-base md:text-sm leading-relaxed flex-grow line-clamp-2 mb-3">{project.desc}</p>
        <div className="flex flex-col gap-0.5 text-sm mb-3 py-2 border-t border-b border-slate-100 min-h-[3.5rem] justify-center">
          {project.duration && project.cost && (
            <span className="text-slate-600">
              Срок: {project.duration} | <span className="text-[#EE410B] font-bold">Стоимость: {project.cost}</span>
            </span>
          )}
        </div>
        <a
          href={project.slug ? `projects/${project.slug}.html` : '#'}
          className="inline-flex items-center justify-center w-full min-h-[56px] py-2.5 px-4 bg-transparent border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:text-slate-800 transition-colors cursor-pointer text-base touch-manipulation"
        >
          Подробнее
        </a>
      </div>
    </motion.article>
  );
}

function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
        aria-label="Закрыть"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-lg" style={{ clipPath: 'inset(0 0 25% 0)' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[85vh] object-contain object-top rounded-lg"
            loading="lazy"
            width={800}
            height={600}
            onError={(e) => {
              if (project.fallback && e.target.src !== project.fallback) {
                e.target.src = project.fallback;
              } else {
                e.target.alt = 'Изображение недоступно';
              }
            }}
          />
        </div>
        <div className="mt-3 text-center text-white">
          <p className="font-semibold">{project.title}</p>
          <p className="text-white/70 text-sm">{project.location}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [lightboxProject, setLightboxProject] = useState(null);

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-3">
          Наши объекты в Уфе
        </h2>
        <p className="text-slate-600 text-center text-base md:text-lg mb-10 max-w-2xl mx-auto">
          Примеры выполненных работ: свайно-ростверковые фундаменты под ключ
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PROJECTS.map((project, i) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={i}
              onImageClick={(p) => setLightboxProject(p)}
            />
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center">
          <button
            type="button"
            onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex md:inline-flex items-center justify-center w-full md:w-auto min-h-[56px] px-8 py-4 md:px-10 md:py-5 bg-[#EE410B] hover:bg-[#d63909] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-base md:text-lg touch-manipulation"
          >
            Хочу такой же расчёт
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightboxProject && (
          <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

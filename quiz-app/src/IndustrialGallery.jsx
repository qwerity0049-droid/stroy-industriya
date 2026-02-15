/**
 * Commercial & industrial gallery - "Также реализуем коммерческие и промышленные объекты"
 */
import { INDUSTRIAL_GALLERY_DATA } from './projectsData';

export default function IndustrialGallery({ assetsBase = 'assets/', className = '' }) {
  return (
    <section className={className}>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 md:mb-8">
        Также реализуем коммерческие и промышленные объекты
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {INDUSTRIAL_GALLERY_DATA.map((item, i) => (
          <figure key={i} className="group flex flex-col">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 mb-3 flex-shrink-0">
              <img
                src={assetsBase + item.src.replace('assets/', '')}
                alt={item.title}
                className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const el = e.target.parentElement;
                  if (!el.querySelector('.gallery-fallback')) {
                    const span = document.createElement('span');
                    span.className = 'gallery-fallback text-white/80 text-sm';
                    span.textContent = 'Изображение';
                    el.classList.add('bg-slate-400', 'flex', 'items-center', 'justify-center');
                    el.appendChild(span);
                  }
                }}
              />
            </div>
            <figcaption>
              <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-slate-500 text-sm text-center">
        Все работы под личным контролем инженера Самата Хайруллина.
      </p>
    </section>
  );
}

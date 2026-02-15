import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ORANGE = '#F57C00';

const STEPS = [
  { num: '01', title: 'Заявка и звонок', desc: 'Обсуждаем проект.' },
  { num: '02', title: 'Бесплатный выезд', desc: 'Замер нивелиром.' },
  { num: '03', title: 'Смета и договор', desc: 'Фиксируем цену.' },
  { num: '04', title: 'Строительство', desc: 'Бригада 5–20 чел.' },
  { num: '05', title: 'Сдача объекта', desc: 'Акт и гарантия.' },
];

function CompareSlider({ split, onSplitChange, className = '' }) {
  const sliderRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
      onSplitChange(pct);
    },
    [onSplitChange]
  );

  const handleStart = useCallback(
    (e) => {
      e.preventDefault();
      handleMove(e);
      const move = (ev) => handleMove(ev);
      const stop = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('mouseup', stop);
        document.removeEventListener('touchend', stop);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('touchmove', move, { passive: true });
      document.addEventListener('mouseup', stop);
      document.addEventListener('touchend', stop);
    },
    [handleMove]
  );

  return (
    <div
      ref={sliderRef}
      className={`compare-slider relative w-full rounded-xl overflow-hidden bg-charcoal aspect-square max-w-[480px] mx-auto ${className}`}
      style={{ '--split': `${split}%` }}
    >
      <div className="compare-slider__before absolute inset-0 overflow-hidden">
        <img
          src="assets/slider-before.webp"
          alt="До: разметка участка под фундамент"
          className="absolute inset-0 w-full h-full object-cover grayscale sepia-[0.3] opacity-90 contrast-[0.85] object-[center_75%]"
          loading="lazy"
          width={480}
          height={480}
          onError={(e) => {
            if (e.target.src.includes('.webp')) { e.target.onerror=null; e.target.src='assets/slider-before.png'; }
            else { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg,#4a3728 0%,#2d2218 100%)'; }
          }}
        />
      </div>
      <div className="compare-slider__after absolute inset-0 overflow-hidden">
        <img
          src="assets/slider-after.webp"
          alt="После: залитый бетонный фундамент"
          className="absolute inset-0 w-full h-full object-cover object-[center_75%]"
          loading="lazy"
          width={480}
          height={480}
          onError={(e) => {
            if (e.target.src.includes('.webp')) { e.target.onerror=null; e.target.src='assets/slider-after.png'; }
            else { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg,#6b7280 0%,#4b5563 100%)'; }
          }}
        />
      </div>
      <div
        className="compare-slider__divider absolute top-0 bottom-0 flex items-center justify-center select-none z-20"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)]" />
        <div className="relative w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center ring-2 ring-orange cursor-grab active:cursor-grabbing">
          <svg className="w-5 h-5 text-charcoal rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      <div className="absolute left-2 top-2 px-3 py-1.5 bg-black/70 rounded-lg text-white text-xs font-bold z-10">ДО</div>
      <div className="absolute right-2 top-2 px-3 py-1.5 bg-black/70 rounded-lg text-white text-xs font-bold z-10">ПОСЛЕ</div>
    </div>
  );
}

function StepCard({ step, index, lineProgress }) {
  return (
    <motion.div
      className="relative flex items-start gap-4"
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px 0px -80px 0px' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 0.8,
      }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-md" style={{ backgroundColor: ORANGE }}>
        {step.num}
      </div>
      <motion.div
        className="flex-1 min-w-0 rounded-xl shadow-lg border border-slate-100 p-4 sm:p-5 bg-white"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-2xl md:text-lg font-bold text-slate-800 mb-1">{step.title}</h3>
        <p className="text-slate-600 text-base md:text-sm leading-relaxed">{step.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessWithSlider() {
  const [split, setSplit] = useState(50);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 1]);

  return (
    <section
      id="work-process"
      ref={containerRef}
      className="w-full"
    >
      <div className="w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-2">
          Как мы работаем
        </h2>
        <p className="text-slate-600 text-center text-base mb-2 max-w-xl mx-auto">
          Вы заранее знаете сроки, этапы и итоговую стоимость.
        </p>
        <p className="text-slate-500 text-xs text-center mb-8 md:mb-10">Гарантия по договору. Личный контроль инженера Самата.</p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left: Slider - sticky on desktop, larger and symmetrical */}
          <div className="w-full lg:w-[50%] lg:sticky lg:top-24 order-1">
            <CompareSlider split={split} onSplitChange={setSplit} />
          </div>

          {/* Right: Process steps with living line */}
          <div className="flex-1 lg:w-[50%] order-2 min-w-0">
            <div className="relative pl-6 sm:pl-8">
              {/* Vertical track (background) */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 rounded-full" />

              {/* Living line - draws as user scrolls */}
              <motion.div
                className="absolute left-0 top-0 w-0.5 rounded-full origin-top -translate-x-1/2"
                style={{
                  height: '100%',
                  backgroundColor: ORANGE,
                  scaleY: lineProgress,
                }}
              />

              <div className="space-y-6 pb-4">
                {STEPS.map((step, i) => (
                  <StepCard key={step.num} step={step} index={i} lineProgress={lineProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

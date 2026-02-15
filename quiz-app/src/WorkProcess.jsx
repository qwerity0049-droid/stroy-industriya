import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ORANGE = '#F57C00';
const STEPS = [
  {
    num: '01',
    title: 'Заявка и звонок',
    desc: 'Обсуждаем проект, фиксируем ваши пожелания.',
    icon: '📞',
  },
  {
    num: '02',
    title: 'Бесплатный выезд',
    desc: 'Самат лично приезжает на замер с лазерным нивелиром.',
    icon: '📐',
  },
  {
    num: '03',
    title: 'Смета и договор',
    desc: 'Фиксируем цену. С этого момента стоимость работ не вырастет.',
    icon: '📋',
  },
  {
    num: '04',
    title: 'Строительство',
    desc: 'Заезд бригады (5–20 человек). Армирование, опалубка, заливка под контролем Самата.',
    icon: '🏗️',
  },
  {
    num: '05',
    title: 'Сдача объекта',
    desc: 'Подписание акта. Вы получаете крепкое основание и гарантию.',
    icon: '✅',
  },
];

function StepCard({ step, index, isMobile }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <span
        className="absolute top-4 right-4 text-6xl md:text-7xl font-bold text-slate-200/60 select-none"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {step.num}
      </span>
      <div className="relative z-10">
        <div className="text-3xl md:text-4xl mb-4">{step.icon}</div>
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function WorkProcess() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const horizontalX = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, -1200, -1200, -1200]);
  const lineProgress = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 1]);

  return (
    <section
      id="work-process"
      ref={containerRef}
      className="relative bg-white py-16 md:py-24 overflow-hidden min-h-[120vh] lg:min-h-[200vh]"
    >
      <div className="max-w-6xl mx-auto px-4 mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-slate-800 mb-3">
          Как мы работаем
        </h2>
        <p className="text-slate-600 text-center text-base md:text-lg max-w-2xl mx-auto">
          Вы заранее знаете сроки, этапы и итоговую стоимость.
        </p>
      </div>

      {/* Desktop: Horizontal scroll */}
      <div className="hidden lg:block relative" style={{ height: '420px' }}>
        <motion.div
          className="absolute top-0 left-1/2 flex gap-8 pl-[50vw] pr-8"
          style={{ x: horizontalX }}
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} isMobile={false} />
          ))}
        </motion.div>
        {/* Connecting line - horizontal */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 mx-8 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: '100%',
              backgroundColor: ORANGE,
              scaleX: lineProgress,
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>

      {/* Mobile: Vertical zig-zag with connecting line */}
      <div className="lg:hidden relative px-4 sm:px-6 pb-12">
        <div className="relative min-h-[600px]">
          {/* Vertical dashed track */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 rounded-full" style={{ marginLeft: '-2px' }} />
          {/* Orange fill - grows with scroll */}
          <motion.div
            className="absolute left-5 top-0 w-1 -ml-0.5 rounded-full origin-top"
            style={{
              height: '100%',
              backgroundColor: ORANGE,
              scaleY: lineProgress,
            }}
          />

          <div className="space-y-6 pt-2">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-md"
                  style={{ backgroundColor: ORANGE }}
                >
                  {step.num}
                </div>
                <motion.div
                  className={`flex-1 min-w-0 rounded-2xl shadow-lg border border-slate-100 p-5 bg-white relative overflow-hidden ${
                    i % 2 === 0 ? 'ml-2' : 'mr-2'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    className="absolute top-2 right-3 text-5xl font-bold text-slate-200/50 select-none"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {step.num}
                  </span>
                  <div className="text-2xl mb-2 relative z-10">{step.icon}</div>
                  <h3 className="text-base font-bold text-slate-800 mb-1 relative z-10">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

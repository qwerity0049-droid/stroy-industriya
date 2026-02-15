import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
  {
    id: 1,
    question: 'Как проверить качество и объём бетона?',
    answer: 'Проверяем каждую машину по паспорту завода и конусу.',
    videoPlaceholder: true,
  },
  {
    id: 2,
    question: 'Цена может вырасти в процессе?',
    answer: 'Нет, стоимость фиксируется в договоре.',
    videoPlaceholder: true,
  },
  {
    id: 3,
    question: 'Справитесь со сложным рельефом?',
    answer: 'Используем лазерный нивелир, подбираем тип фундамента под грунт Уфы.',
    videoPlaceholder: true,
  },
  {
    id: 4,
    question: 'Кто будет работать на объекте?',
    answer: 'Своя бригада от 5 до 20 человек под моим личным контролем.',
    videoPlaceholder: true,
  },
];

function ChevronDown({ open }) {
  return (
    <svg
      className="w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function VideoPlaceholder() {
  const [isLoading, setIsLoading] = useState(false);
  const [played, setPlayed] = useState(false);

  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-[180px] aspect-[9/16] max-h-[280px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
        {!played ? (
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setPlayed(true);
              }, 800);
            }}
            className="absolute inset-0 flex items-center justify-center w-full h-full group"
            aria-label="Воспроизвести видео"
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-2 border-slate-300 border-t-[#F57C00] rounded-full animate-spin" />
                <span className="text-xs text-slate-500">Загрузка...</span>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#F57C00]/90 flex items-center justify-center shadow-lg group-hover:bg-[#F57C00] group-hover:scale-110 transition-all duration-200">
                <span className="ml-1">
                  <PlayIcon />
                </span>
              </div>
            )}
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <span className="text-slate-500 text-sm">[Видео]</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left min-h-[56px] touch-manipulation"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-800 text-base">{item.question}</span>
        <ChevronDown open={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-slate-100">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
                {item.answer}
              </p>
              <VideoPlaceholder />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VideoFAQ() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="video-faq" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-[800px] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-3">
          Видео-ответы на частые вопросы
        </h2>
        <p className="text-slate-600 text-center text-base mb-10">
          Короткие видео от Самата — по делу и без воды
        </p>

        <div className="space-y-3">
          {FAQ_DATA.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-slate-500 text-sm">
          Остались вопросы?{' '}
          <button
            type="button"
            onClick={() => (window.openContactModal?.() || document.dispatchEvent(new CustomEvent('openContactModal')))}
            className="text-[#F57C00] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            Свяжитесь с нами
          </button>
        </p>
      </div>
    </section>
  );
}

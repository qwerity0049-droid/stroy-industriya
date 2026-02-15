import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
  {
    id: 1,
    question: 'Как я могу быть уверен, что мне привезут именно ту марку бетона?',
    answer: 'Мы работаем только с сертифицированными узлами Уфы. Каждая машина сопровождается паспортом качества. Самат лично проверяет подвижность смеси конусом перед заливкой. Если бетон не соответствует — мы его разворачиваем.',
  },
  {
    id: 2,
    question: 'Что если в процессе стройки цена вырастет? Так часто бывает.',
    answer: 'Только не у нас. Мы фиксируем финальную стоимость в официальном договоре. Все риски по подорожанию материалов мы берём на себя. Вы платите ровно столько, сколько было утверждено в смете.',
  },
  {
    id: 3,
    question: 'У меня сложный участок с уклоном и водой. Вы справитесь?',
    answer: 'Это наш профиль. Мы используем высокоточные нивелиры для расчёта перепадов и подбираем тип фундамента (например, плиту с рёбрами жёсткости) именно под ваш грунт, чтобы дом стоял десятилетиями.',
  },
  {
    id: 4,
    question: 'Кто именно будет работать на моём объекте?',
    answer: 'У нас свои укомплектованные бригады (от 5 до 20 человек) с профессиональным инструментом. Никаких случайных людей. Самат лично присутствует на ключевых этапах: разметка, армирование и приёмка бетона.',
  },
  {
    id: 5,
    question: 'Какие юридические гарантии я получу?',
    answer: 'Мы подписываем официальный договор и акты выполненных работ. У вас остаются все документы и чеки. Наша репутация в Уфе — наш главный актив, мы всегда на связи даже после сдачи объекта.',
  },
  {
    id: 6,
    question: 'Как быстро вы сможете зайти на объект?',
    answer: 'Обычно мы планируем график на 2 недели вперёд. Самат берёт не более 3 объектов одновременно, чтобы не терять в качестве. Позвоните сейчас, чтобы забронировать ближайшее свободное окно.',
  },
];

function ChevronDown({ open }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${open ? 'text-[#EE410B] rotate-180' : 'text-slate-500'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-white transition-all duration-200 ${
        isOpen
          ? 'border-2 border-[#EE410B]/40 shadow-md'
          : 'border border-slate-200 shadow-sm hover:border-slate-300'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-5 min-h-[60px] sm:min-h-[64px] text-left touch-manipulation active:bg-slate-50/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-base leading-snug pr-2 ${
            isOpen ? 'text-[#EE410B]' : 'text-slate-800'
          }`}
        >
          {item.question}
        </span>
        <ChevronDown open={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-slate-100">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-4">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="w-full max-w-[900px] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-3">
          Часто задаваемые вопросы
        </h2>
        <p className="text-slate-600 text-center text-base mb-10">
          Ответы на популярные вопросы о фундаментах и бетонных работах
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
          <a
            href="https://web.telegram.org/a/#8345273002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EE410B] font-semibold hover:underline"
          >
            Напишите Самату лично в Telegram
          </a>
        </p>
      </div>
    </section>
  );
}

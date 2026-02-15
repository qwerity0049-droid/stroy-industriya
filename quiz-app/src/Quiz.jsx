import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Success from './Success';

const BRAND_ORANGE = '#EE410B';
const MAX_DISCOUNT = 10;

const STEPS = [
  {
    id: 1,
    question: 'Что планируете строить?',
    options: ['Дом / Коттедж', 'Баня', 'Гараж', 'Забор'],
    discountAfter: 2,
  },
  {
    id: 2,
    question: 'Из чего будут стены?',
    options: ['Кирпич / Блок', 'Дерево', 'Каркас', 'Пока не знаю'],
    discountAfter: 4,
  },
  {
    id: 3,
    question: 'Особенности рельефа?',
    options: ['Ровный', 'Есть уклон', 'Высокие грунтовые воды', 'Нужен замер нивелиром'],
    discountAfter: 6,
  },
  {
    id: 4,
    question: 'Дополнительные работы?',
    options: [
      'Только фундамент',
      'Нужна еще отмостка',
      'Нужен дренаж',
      'Все под ключ (отмостка, дренаж, полы)',
    ],
    discountAfter: 8,
  },
  {
    id: 5,
    question: 'Когда планируете заливку?',
    options: [
      'В ближайшие 2 недели',
      'В течение месяца',
      'В этом сезоне',
      'Просто прицениваюсь',
    ],
    discountAfter: 10,
  },
];

function QuizOption({ option, isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(option)}
      className={`w-full text-left min-h-[56px] py-4 px-5 rounded-xl border-2 transition-all flex items-center gap-4 touch-manipulation ${
        isSelected
          ? 'border-[#EE410B] bg-[#EE410B]/5'
          : 'border-slate-200 hover:border-[#EE410B]/50 bg-white active:bg-slate-50'
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
          isSelected ? 'border-[#EE410B] bg-[#EE410B]' : 'border-slate-300'
        }`}
      >
        {isSelected && (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className="font-medium text-slate-800 text-base leading-snug">{option}</span>
    </motion.button>
  );
}

function usePhoneMask() {
  const format = (value) => {
    let digits = value.replace(/\D/g, '');
    if (digits.length > 0 && (digits[0] === '7' || digits[0] === '8')) digits = digits.slice(1);
    digits = digits.slice(0, 10);
    if (digits.length === 0) return '';
    let formatted = '+7';
    if (digits.length > 0) formatted += ' (' + digits.slice(0, 3);
    if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
    if (digits.length >= 7) formatted += '-' + digits.slice(6, 8);
    if (digits.length >= 9) formatted += '-' + digits.slice(8, 10);
    return formatted;
  };
  return { format };
}

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { format } = usePhoneMask();

  const currentStepData = STEPS.find((s) => s.id === step);
  const isFinalStep = step === 6;

  // Accumulating discount: +2% per step (2 -> 4 -> 6 -> 8 -> 10%)
  const answerCount = Object.keys(answers).length;
  const discountPercent = Math.min(answerCount * 2, MAX_DISCOUNT);

  const handleOptionSelect = (option) => {
    setAnswers((prev) => {
      const next = { ...prev, [step]: option };
      setTimeout(() => {
        if (step < 5) setStep(step + 1);
        else setStep(6);
      }, 300);
      return next;
    });
  };

  const handlePrev = () => {
    if (step === 6) setStep(5);
    else setStep(step - 1);
  };

  const handlePhoneChange = (e) => {
    setPhone(format(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const canProceed = step < 6 ? !!answers[step] : name.trim() && phone.replace(/\D/g, '').length >= 10;

  if (showSuccess) {
    return <Success />;
  }

  return (
    <section id="quiz" className="pt-6 pb-10 md:pt-8 md:pb-12">
      <div className="max-w-xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-4 text-slate-600 text-sm">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Расчёт сметы за 15 минут</span>
              {discountPercent > 0 && (
                <span className="font-bold" style={{ color: BRAND_ORANGE }}>· Скидка: {discountPercent}%</span>
              )}
            </div>

            {!isFinalStep ? (
              <>
                <h2 className="text-2xl md:text-2xl font-bold text-center text-slate-800 mb-2">
                  Рассчитаем фундамент в 3 вариантах под ваш бюджет и грунт за 15 минут
                </h2>
                <p className="text-slate-600 text-center text-base mb-4">
                  Сравним по цене, срокам и надёжности, чтобы вы выбрали лучшее решение без переплат
                </p>

                <div className="h-2.5 bg-slate-200 rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: BRAND_ORANGE }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 5) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-slate-500 text-sm mb-6">Шаг {step} из 5</p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {currentStepData && (
                      <>
                        <h3 className="text-lg md:text-xl font-semibold mb-5 text-slate-800">
                          {currentStepData.question}
                        </h3>
                        <div className="space-y-3">
                          {currentStepData.options.map((opt) => (
                            <QuizOption
                              key={opt}
                              option={opt}
                              isSelected={answers[step] === opt}
                              onSelect={handleOptionSelect}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={step === 1}
                    className="w-full md:w-auto min-h-[56px] px-6 py-3.5 border-2 border-slate-300 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition touch-manipulation"
                  >
                    Назад
                  </button>
                </div>
              </>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-2xl font-bold text-slate-800 mb-2">
                    Скидка 10% активирована!
                  </h2>
                  <p className="text-slate-600 mb-1">
                    Самат подготовит смету с учётом вашей выгоды. Куда прислать расчёт?
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[56px] px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:border-[#EE410B] focus:ring-0 outline-none touch-manipulation"
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full min-h-[56px] px-4 py-3.5 text-base border-2 border-slate-200 rounded-xl focus:border-[#EE410B] focus:ring-0 outline-none touch-manipulation"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={!canProceed}
                  className="w-full min-h-[56px] py-4 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 touch-manipulation"
                  style={{ backgroundColor: BRAND_ORANGE }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Получить расчёт
                </motion.button>
                <p className="mt-4 text-gray-500 text-xs text-center leading-relaxed">
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных в соответствии с{' '}
                  <a href="privacy.html" className="text-[#EE410B] hover:underline">Политикой конфиденциальности</a>.
                </p>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

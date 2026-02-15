import { motion } from 'framer-motion';

const BRAND_ORANGE = '#EE410B';

const cardAnimation = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Success() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12"
      style={{
        background: 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)',
        backgroundImage: `
          linear-gradient(160deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%),
          url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v20H0V0zm10 0h1v20h-1V0zM0 10h20v1H0v-1z' fill='%23475569' fill-opacity='0.05'/%3E%3C/svg%3E")
        `,
      }}
    >
      <motion.div
        className="w-full max-w-md"
        variants={contentStagger}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={cardAnimation}
          className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)]"
        >
          <div className="p-8 sm:p-10">
            {/* Status: Animated green checkmark */}
            <motion.div
              variants={contentItem}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.svg
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.5 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#dcfce7"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M8 12l3 3 5-6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                  />
                </motion.svg>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={contentItem}
              className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-3 leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Ваша скидка 10% зафиксирована!
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={contentItem}
              className="text-slate-600 text-base sm:text-lg text-center leading-relaxed mb-8"
            >
              Самат уже получил уведомление и скоро свяжется с вами для уточнения деталей.
            </motion.p>

            {/* Expert Profile */}
            <motion.div
              variants={contentItem}
              className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 pt-6 border-t border-slate-100"
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 ring-offset-2"
                  style={{ ringColor: BRAND_ORANGE }}
                >
                  <img
                    src="assets/samat-success.webp"
                    alt="Самат Хайруллин"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    width={96}
                    height={96}
                    onError={(e) => { e.target.onerror=null; e.target.src='assets/samat-success.png'; }}
                  />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span
                    className="font-semibold text-slate-800 text-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Самат Хайруллин
                  </span>
                  <motion.span
                    className="relative flex h-2 w-2"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </motion.span>
                </div>
                <p className="text-slate-500 text-sm sm:text-base italic leading-relaxed">
                  «Я лично проверяю каждый расчёт. Обычно это занимает от 15 до 40 минут.»
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={contentItem}
          className="text-slate-400 text-xs sm:text-sm text-center mt-6 sm:mt-8 max-w-xs mx-auto"
        >
          Работаем по Уфе и пригороду. Качество, проверенное временем.
        </motion.p>
      </motion.div>
    </section>
  );
}

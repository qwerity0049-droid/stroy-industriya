// Логотипы партнёров — готовые изображения
const PARTNERS = [
  { name: 'VELUX', img: 'assets/partner-velux.png' },
  { name: 'SCHÜCO', img: 'assets/partner-schuco.png' },
  { name: 'REHAU', img: 'assets/partner-rehau.png' },
  { name: 'VEKA', img: 'assets/partner-veka.png' },
  { name: 'Tarkett', img: 'assets/partner-tarkett.png' },
  { name: 'TEGOLA', img: 'assets/partner-tegola.png' },
  { name: 'ROCKWOOL', img: 'assets/partner-rockwool.png' },
  { name: 'ПЕНОПЛЭКС', img: 'assets/partner-penoplex.png' },
  { name: 'FAKRO', img: 'assets/partner-fakro.png' },
  { name: 'ТЕХНОНИКОЛЬ', img: 'assets/partner-technonicol.png' },
];

function PartnerLogo({ partner }) {
  return (
    <div
      className="partners-ticker-item flex-shrink-0 flex items-center justify-center w-[140px] md:w-[180px] h-[60px]"
      title={partner.name}
    >
      <img
        src={partner.img}
        alt={partner.name}
        className="max-h-full max-w-full object-contain grayscale brightness-[0.8] opacity-60 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all duration-300"
        loading="lazy"
      />
    </div>
  );
}

export default function Partners() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-center text-slate-800">Наши партнёры</h2>
      </div>
      <div className="relative">
        <div className="partners-ticker flex items-center gap-x-0.5 md:gap-x-1">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

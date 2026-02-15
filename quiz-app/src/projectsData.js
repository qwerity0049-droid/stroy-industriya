/**
 * Project detail data keyed by slug.
 * Used by ProjectDetail page and Portfolio cards.
 */
export const PROJECTS_DATA = {
  elkibaeva: {
    slug: 'elkibaeva',
    title: 'Свайно-ростверковый фундамент + капитальный погреб',
    location: 'Елкибаева, 2025',
    duration: '2 недели',
    price: '1 640 000 ₽',
    type: 'Свайно-ростверковый',
    control: 'Хайруллин Самат',
    image: 'assets/20230519_144554.png',
    fallback: 'assets/service-1.png',
    worksList: ['забили сваи', 'собрали армокаркас с опалубкой', 'залили бетон', 'дополнительно построили капитальный погреб'],
  },
  zhukovo: {
    slug: 'zhukovo',
    title: 'Фундамент под ключ за 6 дней',
    location: 'Жуково, 2025',
    duration: '6 дней',
    price: '600 000 ₽',
    type: 'Свайно-ростверковый',
    control: 'Хайруллин Самат',
    image: 'assets/20230510_122030.png',
    fallback: 'assets/service-2.png',
    worksList: ['планировка участка', 'пробурили и залили сваи', 'собрали каркас с опалубкой на ростверк', 'финишная заливка'],
  },
  bulgakovo: {
    slug: 'bulgakovo',
    title: 'Свайно-ростверковый фундамент под дом',
    location: 'Булгаково, 2023',
    duration: '6 дней',
    price: '715 000 ₽',
    type: 'Свайно-ростверковый',
    control: 'Хайруллин Самат',
    image: 'assets/20230519_154559.png',
    fallback: 'assets/service-3.png',
    worksList: ['забили сваи', 'собрали армокаркас с опалубкой', 'залили бетон'],
  },
};

/** Industrial gallery - "Также реализуем коммерческие и промышленные объекты" */
export const INDUSTRIAL_GALLERY_DATA = [
  {
    src: 'assets/image_2cb8d1.png',
    title: 'Армирование фундамента',
    description: 'Вязка сложных арматурных каркасов по проекту любой сложности.',
  },
  {
    src: 'assets/image_2cb8f2.png',
    title: 'Устройство основания',
    description: 'Подготовка и вязка ленточных и свайно-ростверковых фундаментов.',
  },
  {
    src: 'assets/image_2cb913.png',
    title: 'Бетонные полы и стяжка',
    description: 'Промышленные полы с упрочненным верхним слоем (топпинг).',
  },
  {
    src: 'assets/image_2cb94a.png',
    title: 'Готовые объекты',
    description: 'Сдача промышленных площадок и цехов с финишным защитным покрытием.',
  },
];

/** @deprecated Use INDUSTRIAL_GALLERY_DATA */
export const SECONDARY_GALLERY = INDUSTRIAL_GALLERY_DATA;

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] ?? null;
}

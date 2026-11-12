export type MixPiece = {
  id: string
  label: string
  opening: string
  matter: string
  wash: string
  accent: string
}

export const epochs: MixPiece[] = [
  {
    id: 'zamok',
    label: 'Середньовічний замок',
    opening: 'На гвинтових сходах чути кроки. У залі пахне воском.',
    matter: 'камінь і тіні від смолоскипів',
    wash: '#3c2a22',
    accent: '#e7c27a',
  },
  {
    id: 'kazka',
    label: 'Народна казка',
    opening: 'Стежка веде в бік, якого не було на карті. Звірі говорять тихо.',
    matter: 'лісові правила і замовляння',
    wash: '#5c2a4a',
    accent: '#f2c14e',
  },
  {
    id: 'antychnist',
    label: 'Античний портик',
    opening: 'Колони тримають небо. Мармур теплий від денного світла.',
    matter: 'пропорції і денне світло',
    wash: '#cbb892',
    accent: '#243056',
  },
  {
    id: 'shkola',
    label: 'Шкільний ранок',
    opening: 'Дзвінок ділить день на уроки. На парті лишається слід олівця.',
    matter: 'зошити і голоси в коридорі',
    wash: '#f4efe4',
    accent: '#243056',
  },
  {
    id: 'baroko',
    label: 'Барокова зала',
    opening: 'Позолота завивається в хмари. Музика заповнює всю стелю.',
    matter: 'орнамент і орган',
    wash: '#1a2744',
    accent: '#d4b483',
  },
]

export const forces: MixPiece[] = [
  {
    id: 'vr',
    label: 'Віртуальна реальність',
    opening: 'Браму відкривають поглядом у шолом. Ключ не потрібен.',
    matter: 'жести і світло інтерфейсу',
    wash: '#123044',
    accent: '#79e0ff',
  },
  {
    id: 'okean',
    label: 'Підводний космос',
    opening: "Над головою течія. У ній пливуть сузір'я.",
    matter: 'глибина і повільні орбіти',
    wash: '#0e3a4a',
    accent: '#9ee7ff',
  },
  {
    id: 'lis',
    label: 'Ліс і роботи',
    opening: 'Металеві садівники стоять і чекають наказу від крони.',
    matter: 'шарніри і листя',
    wash: '#1b6a46',
    accent: '#e7f2e4',
  },
  {
    id: 'orbita',
    label: 'Орбіта іншої планети',
    opening: 'За вікном два сонця. Підлога іноді зсовується під кроком.',
    matter: 'пил чужого ґрунту й ілюмінатори',
    wash: '#241b38',
    accent: '#f0d7a8',
  },
  {
    id: 'neon',
    label: 'Неонові схеми',
    opening: 'Уночі стіни спалахують контурами зі струму.',
    matter: 'контури і електричний колір',
    wash: '#8f1d3a',
    accent: '#ffd0e0',
  },
]

export function blend(epoch: MixPiece, force: MixPiece) {
  return {
    title: `${epoch.label} × ${force.label}`,
    text: `${epoch.opening} ${force.opening} Поруч опиняються ${epoch.matter} і ${force.matter}.`,
  }
}

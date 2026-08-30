// Bilingual labels for scene tones and game categories.
export const TONE_AR = {
  Funny: 'مضحك', Heartfelt: 'دافئ', Absurd: 'عبثي',
  Light: 'خفيف', Flirty: 'غزلي', Romantic: 'رومانسي',
};
export const WHO_LABEL = {
  ar: { all: 'الكل', any: 'أي عدد', couple: 'ثنائي', group: 'مجموعة' },
  en: { all: 'All', any: 'Any', couple: 'Couple', group: 'Group' },
};
export const GAME_CAT = {
  conversation: { ar: 'حوار', en: 'Conversation' },
  guessing:     { ar: 'تخمين', en: 'Guessing' },
  word:         { ar: 'كلمات', en: 'Word' },
  acting:       { ar: 'تمثيل', en: 'Acting' },
  paper:        { ar: 'ورق وقلم', en: 'Paper' },
  active:       { ar: 'حركة', en: 'Active' },
  cards:        { ar: 'أوراق لعب', en: 'Cards' },
  outdoor:      { ar: 'خارجي', en: 'Outdoor' },
  memory:       { ar: 'ذاكرة', en: 'Memory' },
  dice:         { ar: 'نرد', en: 'Dice' },
  travel:       { ar: 'سفر', en: 'Travel' },
};
// strip simple <b> tags from bundled game text for plain rendering
export function stripHtml(s) {
  return (s || '').replace(/<\/?b>/g, '').replace(/<[^>]+>/g, '').trim();
}

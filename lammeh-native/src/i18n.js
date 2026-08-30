// Tiny language helper. Arabic (RTL) or English.
import { I18nManager } from 'react-native';

export function pick(lang, ar, en) { return lang === 'ar' ? ar : en; }
export const isRTL = () => I18nManager.isRTL;

export const TX = {
  ar: {
    qHead: 'الأسئلة', onstage: 'المسرح', games: 'الألعاب',
    cards: 'بطاقة', decks: 'مجموعة', deck: 'مجموعة',
    free: 'مجانية', unlocked: 'مفتوحة', locked: 'مقفلة',
    unlock: 'افتح', buy: 'اشترِ', restore: 'استرجاع المشتريات',
    unlockContent: 'افتح المحتوى', cancel: 'إلغاء',
    pickDeck: 'اختر مجموعة من ٣٠ بطاقة.',
    deck1Free: 'المجموعة الأولى مجانية. افتح الباقي بشراء هذه المجموعة.',
    fullyOpen: 'مفتوحة بالكامل. استمتع بكل المجموعات.',
    tapCard: 'اضغط البطاقة لقلبها',
    next: 'التالية', prev: 'السابقة', shuffle: 'خلط',
    buyToUnlock: 'اشترِ لفتح كل مجموعات هذه الفئة.',
    restoreDone: 'تم استرجاع مشترياتك.',
    scenes: 'مشاهد', scripts: 'نصوص',
    pack: 'حزمة', allTones: 'كل الأجواء', drawScene: 'اسحب مشهداً',
    scenePack1Free: 'حزمة المشاهد الأولى مجانية. باقي الحزم تُفتح بالشراء.',
    scenePacksOpen: 'كل المشاهد مفتوحة.',
    buyScenePack: 'اشترِ لفتح هذه الحزمة من ٣٠ مشهداً.',
    setup: 'التهيئة', outro: 'الختام', scriptsAllFree: 'كل النصوص مجانية.',
    gamesPick: 'اختر فئة.', players: 'اللاعبون', needs: 'تحتاج', how: 'كيف تلعب',
    all: 'الكل', tapExpand: 'اضغط للتفاصيل',
  },
  en: {
    qHead: 'Questions', onstage: 'On Stage', games: 'Games',
    cards: 'cards', decks: 'decks', deck: 'Deck',
    free: 'Free', unlocked: 'Unlocked', locked: 'Locked',
    unlock: 'Unlock', buy: 'Buy', restore: 'Restore purchases',
    unlockContent: 'Unlock content', cancel: 'Cancel',
    pickDeck: 'Pick a deck of 30 cards.',
    deck1Free: 'Deck 1 is free. Unlock the rest by buying this pack.',
    fullyOpen: 'Fully unlocked. Enjoy every deck.',
    tapCard: 'Tap the card to flip it',
    next: 'Next', prev: 'Back', shuffle: 'Shuffle',
    buyToUnlock: 'Buy to unlock all decks in this group.',
    restoreDone: 'Your purchases were restored.',
    scenes: 'Scenes', scripts: 'Scripts',
    pack: 'Pack', allTones: 'All tones', drawScene: 'Draw a scene',
    scenePack1Free: 'Scene pack 1 is free. Unlock the rest by buying.',
    scenePacksOpen: 'All scenes unlocked.',
    buyScenePack: 'Buy to unlock this pack of 30 scenes.',
    setup: 'Setup', outro: 'Ending', scriptsAllFree: 'All scripts are free.',
    gamesPick: 'Pick a category.', players: 'Players', needs: 'Needs', how: 'How to play',
    all: 'All', tapExpand: 'Tap for details',
  },
};

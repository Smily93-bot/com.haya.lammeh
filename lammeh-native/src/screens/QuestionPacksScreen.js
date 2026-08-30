import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { TX } from '../i18n';
import { QUESTIONS, deckCount } from '../content';
import { DECK_SIZE } from '../config/store';
import { groupUnlocked, deckUnlocked, grant } from '../services/entitlements';
import { coinBalance, spendCoins } from '../services/coins';
import { QUESTION_DECK_COIN_COST } from '../config/store';

export default function QuestionPacksScreen({ lang, groupKey, onOpenDeck, refreshKey, onEntitlementsChanged }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const disp = { fontFamily: isAr ? FONTS.displayAr : FONTS.displayEn };
  const g = QUESTIONS[groupKey];
  const nDecks = deckCount(groupKey, DECK_SIZE);
  const unlocked = groupUnlocked(groupKey);
  const name = isAr ? g.labelAr : g.labelEn;

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }} contentContainerStyle={styles.wrap}>
      <Text style={[styles.head, disp]}>{g.emoji} {name}</Text>
      <Text style={styles.sub}>{t.pickDeck}</Text>
      <View style={styles.note}>
        <Text style={styles.noteTxt}>{unlocked ? '✅ ' + t.fullyOpen : '🔓 ' + t.deck1Free}</Text>
      </View>

      <View style={styles.grid}>
        {Array.from({ length: nDecks }, (_, i) => i + 1).map((d) => {
          const start = (d - 1) * DECK_SIZE;
          const count = Math.min(start + DECK_SIZE, g.items.length) - start;
          const isFree = d === 1;
          const open = deckUnlocked(groupKey, d);
          const badge = isFree ? t.free : open ? t.unlocked : t.locked;
          return (
            <Pressable
              key={d}
              style={[styles.deck, !open && styles.deckLocked]}
              onPress={async () => { if(open) return onOpenDeck(groupKey,d); if(coinBalance()<QUESTION_DECK_COIN_COST){ Alert.alert(isAr?'عملات غير كافية':'Not enough coins', isAr?`تحتاج ${QUESTION_DECK_COIN_COST} عملة لفتح هذه المجموعة.`:`You need ${QUESTION_DECK_COIN_COST} coins to unlock this deck.`); return; } const ok=await spendCoins(QUESTION_DECK_COIN_COST); if(ok){ await grant(`qdeck:${groupKey}:${d}`); onEntitlementsChanged&&onEntitlementsChanged(); } }}
            >
              {!open && <Text style={styles.lock}>🔒</Text>}
              <Text style={[styles.deckN, disp]}>{t.deck} {d}</Text>
              <Text style={styles.deckR}>{count} {t.cards}</Text>{!open && <Text style={styles.deckR}>🪙 {QUESTION_DECK_COIN_COST}</Text>}
              <View style={[styles.badge, isFree ? styles.bFree : open ? styles.bOpen : styles.bLock]}>
                <Text style={[styles.badgeTxt, isFree ? styles.tFree : open ? styles.tOpen : styles.tLock]}>{badge}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 18, paddingTop: 16, paddingBottom: 40 },
  head: { fontSize: 22, color: COLORS.ink, marginBottom: 4 },
  sub: { fontSize: 13, color: COLORS.soft, marginBottom: 12 },
  note: { backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line2,
    padding: 12, marginBottom: 14 },
  noteTxt: { color: COLORS.ink, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  deck: { width: '48%', backgroundColor: COLORS.card, borderRadius: RADIUS.tile, padding: 14,
    marginBottom: 12, borderWidth: 1, borderColor: COLORS.line2, minHeight: 104 },
  deckLocked: { backgroundColor: COLORS.lockBg },
  lock: { position: 'absolute', top: 10, right: 10, fontSize: 15, opacity: 0.6 },
  deckN: { fontSize: 17, color: COLORS.ink },
  deckR: { fontSize: 12, color: COLORS.soft, marginTop: 4 },
  badge: { alignSelf: 'flex-start', borderRadius: RADIUS.pill, paddingHorizontal: 10, paddingVertical: 3, marginTop: 12 },
  badgeTxt: { fontSize: 12, fontWeight: '700' },
  bFree: { backgroundColor: COLORS.freeBg }, tFree: { color: COLORS.free },
  bOpen: { backgroundColor: '#EEF0F6' }, tOpen: { color: '#31456B' },
  bLock: { backgroundColor: '#F2E3DC' }, tLock: { color: COLORS.lockInk },
});

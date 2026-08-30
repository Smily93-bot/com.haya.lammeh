import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { TX } from '../i18n';
import { QUESTIONS, deckSlice } from '../content';
import { DECK_SIZE } from '../config/store';
import { groupUnlocked } from '../services/entitlements';
import { noteFreeDraw } from '../services/ads';
import AdBanner from '../components/AdBanner';

function shuffled(n) {
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function QuestionDrawScreen({ lang, groupKey, deckNo }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const disp = { fontFamily: isAr ? FONTS.displayAr : FONTS.displayEn };
  const g = QUESTIONS[groupKey];
  const items = useMemo(() => deckSlice(groupKey, deckNo, DECK_SIZE), [groupKey, deckNo]);
  const isFreeDeck = deckNo === 1 && !groupUnlocked(groupKey);

  const [seq, setSeq] = useState(() => shuffled(items.length));
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);

  const it = items[seq[idx]] || {};
  const primary = isAr ? (it.ar || it.en) : (it.en || it.ar);
  const secondary = isAr ? it.en : it.ar;

  useEffect(() => { noteFreeDraw(isFreeDeck); }, [idx]);

  const next = () => { setIdx((idx + 1) % items.length); setFlip(false); };
  const prev = () => { if (idx > 0) { setIdx(idx - 1); setFlip(false); } };
  const shuffle = () => { setSeq(shuffled(items.length)); setIdx(0); setFlip(false); };

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, disp]}>
        {g.emoji} {isAr ? g.labelAr : g.labelEn} · {t.deck} {deckNo}
      </Text>
      <Text style={styles.hint}>{t.tapCard}</Text>

      <Pressable style={styles.card} onPress={() => setFlip(!flip)}>
        <Text style={[styles.q, disp]}>{primary}</Text>
        {flip && !!secondary && <Text style={styles.q2}>{secondary}</Text>}
      </Pressable>

      <View style={styles.row}>
        <Pressable style={styles.ghost} onPress={prev}><Text style={styles.ghostTxt}>‹ {t.prev}</Text></Pressable>
        <Pressable style={styles.ghost} onPress={shuffle}><Text style={styles.ghostTxt}>⇄ {t.shuffle}</Text></Pressable>
        <Pressable style={styles.main} onPress={next}><Text style={styles.mainTxt}>{t.next} ›</Text></Pressable>
      </View>

      <View style={{ flex: 1 }} />
      <AdBanner show={isFreeDeck} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: COLORS.bg, padding: 18, paddingTop: 16 },
  title: { fontSize: 18, color: COLORS.ink },
  hint: { fontSize: 12, color: COLORS.soft, marginTop: 4, marginBottom: 14 },
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: 26, minHeight: 220,
    justifyContent: 'center', borderWidth: 1, borderColor: COLORS.line2,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 5 } },
  q: { fontSize: 22, color: COLORS.ink, textAlign: 'center', lineHeight: 32 },
  q2: { fontSize: 15, color: COLORS.soft, textAlign: 'center', marginTop: 16 },
  row: { flexDirection: 'row', gap: 10, marginTop: 18 },
  ghost: { flex: 1, borderWidth: 1, borderColor: COLORS.line2, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  ghostTxt: { color: COLORS.ink, fontWeight: '600' },
  main: { flex: 1.2, backgroundColor: COLORS.plum, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  mainTxt: { color: '#fff', fontWeight: '700' },
});

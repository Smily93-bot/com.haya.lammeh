import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { TX } from '../i18n';
import { GAME_CAT, stripHtml } from '../labels';
import { GAMES } from '../content';

export default function GamesScreen({ lang }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const disp = { fontFamily: isAr ? FONTS.displayAr : FONTS.displayEn };
  const [cat, setCat] = useState('all');
  const [openIdx, setOpenIdx] = useState(null);

  const cats = useMemo(() => ['all', ...Array.from(new Set(GAMES.map((g) => g.cat)))], []);
  const list = useMemo(() => (cat === 'all' ? GAMES : GAMES.filter((g) => g.cat === cat)), [cat]);

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }} contentContainerStyle={styles.wrap}>
      <Text style={[styles.head, disp]}>{isAr ? 'دليل الألعاب الجماعية' : 'Group Game Guide'}</Text>
      <Text style={styles.sub}>{isAr ? 'ألعاب تنفذونها بأنفسكم. اضغطوا اسم اللعبة لمعرفة الأدوات والطريقة.' : 'Games you run yourselves. Tap a game for supplies and instructions.'}</Text>
      <View style={styles.safe}><Text style={styles.safeText}>{isAr ? '✓ دون جرأة أو إحراج' : '✓ No daring or embarrassing content'}</Text></View>

      <View style={styles.chipRow}>
        {cats.map((k) => {
          const label = k === 'all' ? t.all : (GAME_CAT[k] ? GAME_CAT[k][lang] : k);
          return (
            <Pressable key={k} style={[styles.chip, cat === k && styles.chipOn]} onPress={() => { setCat(k); setOpenIdx(null); }}>
              <Text style={[styles.chipTxt, cat === k && styles.chipTxtOn]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {list.map((g, i) => {
        const info = isAr ? g.ar : g.en;
        const isOpen = openIdx === i;
        return (
          <Pressable key={i} style={styles.game} onPress={() => setOpenIdx(isOpen ? null : i)}>
            <Text style={[styles.name, disp]}>{info.name}</Text>
            <Text style={styles.players}>{info.players}</Text>
            {isOpen ? (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.lbl}>{t.needs}</Text>
                <Text style={styles.body}>{stripHtml(info.needs)}</Text>
                <Text style={[styles.lbl, { marginTop: 8 }]}>{t.how}</Text>
                <Text style={styles.body}>{stripHtml(info.how)}</Text>
              </View>
            ) : (
              <Text style={styles.expand}>{t.tapExpand} ›</Text>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, paddingBottom: 40 },
  head: { fontSize: 24, color: COLORS.ink, marginBottom: 2 },
  sub: { fontSize: 13, color: COLORS.soft, marginBottom: 12 },
  safe: { alignSelf: 'flex-start', backgroundColor: COLORS.freeBg, borderRadius: RADIUS.pill, paddingHorizontal: 11, paddingVertical: 6, marginBottom: 12 },
  safeText: { color: COLORS.free, fontSize: 11, fontWeight: '700' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { borderWidth: 1, borderColor: COLORS.line2, borderRadius: RADIUS.pill, paddingHorizontal: 13, paddingVertical: 7 },
  chipOn: { backgroundColor: COLORS.terra, borderColor: COLORS.terra },
  chipTxt: { color: COLORS.ink, fontSize: 13 },
  chipTxtOn: { color: '#fff' },
  game: { backgroundColor: COLORS.card, borderRadius: RADIUS.tile, borderWidth: 1, borderColor: COLORS.line2, padding: 15, marginBottom: 10 },
  name: { fontSize: 16, color: COLORS.ink },
  players: { fontSize: 12, color: COLORS.terra, marginTop: 3, fontWeight: '600' },
  expand: { fontSize: 12, color: COLORS.plum, marginTop: 8 },
  lbl: { fontSize: 12, fontWeight: '700', color: COLORS.terra, letterSpacing: 0.5 },
  body: { fontSize: 14, color: COLORS.ink, marginTop: 4, lineHeight: 21 },
});

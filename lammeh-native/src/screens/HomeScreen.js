import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { TX } from '../i18n';
import { META } from '../content';
import { coinBalance } from '../services/coins';

export default function HomeScreen({ lang, onToggleLang, onGo }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const dispAr = { fontFamily: FONTS.displayAr };
  const dispEn = { fontFamily: FONTS.displayEn };

  const tiles = [
    { key: 'questions', emoji: '💬', title: t.qHead,
      sub: isAr ? `${META.questionsTotal} بطاقة` : `${META.questionsTotal} cards`, color: COLORS.plum },
    { key: 'onstage', emoji: '🎭', title: t.onstage,
      sub: isAr ? `${META.scenes} مشهد` : `${META.scenes} scenes`, color: COLORS.curtain },
    { key: 'discussions', emoji: '🗣️', title: isAr ? 'نقاشات' : 'Discussions',
      sub: isAr ? 'مواضيع تفتح نقاشات ممتعة' : 'Topics that spark conversation', color: COLORS.plum },
    { key: 'games', emoji: '🎲', title: isAr ? 'الألعاب والأنشطة' : 'Games & Activities',
      sub: isAr ? 'ألعاب تفاعلية، دليل ألعاب، وأنشطة عائلية' : 'Interactive games, a game guide and family activities', color: COLORS.terra },
  ];

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }} contentContainerStyle={styles.wrap}>
      <View style={styles.top}>
        <Text style={[styles.brand, isAr ? dispAr : dispEn]}>{isAr ? 'لمّة' : 'Lammeh'}</Text>
        <View style={{flexDirection:'row',gap:8}}><Pressable style={styles.lang} onPress={()=>onGo('coins')}><Text style={styles.langTxt}>🪙 {coinBalance()}</Text></Pressable><Pressable style={styles.lang} onPress={onToggleLang}><Text style={styles.langTxt}>{isAr ? 'EN' : 'ع'}</Text></Pressable></View>
      </View>

      <Text style={[styles.hero, isAr ? dispAr : dispEn]}>
        {isAr ? 'كل ما تحتاجه جلستكم' : 'Everything for one gathering'}
      </Text>
      <Text style={styles.heroSub}>
        {isAr
          ? 'أسئلة ونقاشات ومشاهد وألعاب وأنشطة عائلية، كلها في مكان واحد.'
          : 'Questions, discussions, scenes, games and family activities—all in one place.'}
      </Text>

      <View style={{ height: 14 }} />
      {tiles.map((tile) => (
        <Pressable key={tile.key} style={styles.tile} onPress={() => onGo(tile.key)}>
          <Text style={styles.tileEmoji}>{tile.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.tileTitle, isAr ? dispAr : dispEn]}>{tile.title}</Text>
            <Text style={styles.tileSub}>{tile.sub}</Text>
          </View>
          <View style={[styles.dot, { backgroundColor: tile.color }]} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingTop: 54, paddingBottom: 40 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { fontSize: 30, color: COLORS.ink },
  lang: { borderWidth: 1, borderColor: COLORS.line2, borderRadius: RADIUS.pill, paddingHorizontal: 14, paddingVertical: 6 },
  langTxt: { color: COLORS.ink, fontWeight: '700' },
  hero: { fontSize: 26, color: COLORS.ink, marginTop: 22 },
  heroSub: { fontSize: 14, color: COLORS.soft, marginTop: 8, lineHeight: 21 },
  tile: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderRadius: RADIUS.card, padding: 18, marginTop: 12, borderWidth: 1, borderColor: COLORS.line,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  tileEmoji: { fontSize: 26, marginEnd: 14 },
  tileTitle: { fontSize: 19, color: COLORS.ink },
  tileSub: { fontSize: 13, color: COLORS.soft, marginTop: 2 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});

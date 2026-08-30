import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';

export default function GameHubScreen({ lang, onGo }) {
  const ar = lang === 'ar';
  const display = { fontFamily: ar ? FONTS.displayAr : FONTS.displayEn };
  const sections = [
    {
      key: 'interactivegames', icon: '▶️', color: COLORS.plum,
      title: ar ? 'العب من التطبيق' : 'Play in the app',
      sub: ar ? 'ألعاب تفاعلية بوقت ونقاط وبطاقات' : 'Interactive games with cards, timers and scores',
    },
    {
      key: 'gameguide', icon: '🎲', color: COLORS.terra,
      title: ar ? 'دليل الألعاب الجماعية' : 'Group game guide',
      sub: ar ? 'ألعاب جماعية مع الأدوات وطريقة اللعب' : 'Group games with supplies and instructions',
    },
    {
      key: 'activities', icon: '✨', color: '#3F718C',
      title: ar ? 'الأنشطة' : 'Activities',
      sub: ar ? 'أنشطة عائلية للإبداع والتعاون والتعلّم' : 'Family activities for creativity, teamwork and learning',
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
      <Text style={[styles.head, display]}>{ar ? 'الألعاب والأنشطة' : 'Games & Activities'}</Text>
      <Text style={styles.sub}>
        {ar ? 'اختاروا تجربة جاهزة من التطبيق، أو لعبة تنفذونها بأنفسكم، أو نشاطًا جماعيًا.' : 'Choose an app-led game, an offline game to run yourselves, or a group activity.'}
      </Text>
      <View style={styles.safe}><Text style={styles.safeText}>{ar ? '✓ محتوى عائلي مناسب للجميع' : '✓ Family-friendly content for everyone'}</Text></View>
      {sections.map((section) => (
        <Pressable key={section.key} style={styles.card} onPress={() => onGo(section.key)}>
          <View style={[styles.iconBox, { backgroundColor: section.color }]}><Text style={styles.icon}>{section.icon}</Text></View>
          <View style={styles.copy}>
            <Text style={[styles.title, display]}>{section.title}</Text>
            <Text style={styles.cardSub}>{section.sub}</Text>
          </View>
          <Text style={styles.arrow}>{ar ? '‹' : '›'}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: COLORS.bg },
  wrap: { padding: 18, paddingBottom: 40 },
  head: { fontSize: 25, color: COLORS.ink },
  sub: { fontSize: 14, lineHeight: 22, color: COLORS.soft, marginTop: 5 },
  safe: { alignSelf: 'flex-start', backgroundColor: COLORS.freeBg, borderRadius: RADIUS.pill, paddingHorizontal: 12, paddingVertical: 7, marginTop: 12, marginBottom: 6 },
  safeText: { color: COLORS.free, fontSize: 12, fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.line, borderRadius: RADIUS.card, padding: 16, marginTop: 12 },
  iconBox: { width: 50, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 23 },
  copy: { flex: 1, marginHorizontal: 13 },
  title: { fontSize: 17, color: COLORS.ink },
  cardSub: { fontSize: 12, lineHeight: 18, color: COLORS.soft, marginTop: 3 },
  arrow: { fontSize: 28, color: COLORS.plum },
});

import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { TX } from '../i18n';
import { QUESTIONS, QORDER, deckCount } from '../content';
import { DECK_SIZE } from '../config/store';

export default function QuestionGroupsScreen({ lang, onOpenGroup }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const disp = { fontFamily: isAr ? FONTS.displayAr : FONTS.displayEn };

  return (
    <ScrollView style={{ backgroundColor: COLORS.bg }} contentContainerStyle={styles.wrap}>
      <Text style={[styles.head, disp]}>{t.qHead}</Text>
      <View style={styles.grid}>
        {QORDER.map((key) => {
          const g = QUESTIONS[key];
          const n = deckCount(key, DECK_SIZE);
          return (
            <Pressable key={key} style={styles.card} onPress={() => onOpenGroup(key)}>
              <Text style={styles.emoji}>{g.emoji}</Text>
              <Text style={[styles.name, disp]} numberOfLines={2}>
                {isAr ? g.labelAr : g.labelEn}
              </Text>
              <Text style={styles.meta}>
                {g.items.length} {t.cards} · {n} {t.decks}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 18, paddingTop: 16, paddingBottom: 40 },
  head: { fontSize: 24, color: COLORS.ink, marginBottom: 14, marginStart: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: COLORS.line, minHeight: 120,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  emoji: { fontSize: 24 },
  name: { fontSize: 16, color: COLORS.ink, marginTop: 8 },
  meta: { fontSize: 12, color: COLORS.soft, marginTop: 6 },
});

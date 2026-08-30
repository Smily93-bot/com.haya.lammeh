import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { INTERACTIVE_GAMES } from '../content/interactiveGames';

export default function InteractiveGamesScreen({ lang, onOpen }) {
  const ar = lang === 'ar';
  const display = { fontFamily: ar ? FONTS.displayAr : FONTS.displayEn };
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
      <Text style={[styles.head, display]}>{ar ? 'العب من التطبيق' : 'Play in the app'}</Text>
      <Text style={styles.sub}>{ar ? 'اختاروا اللعبة، اقرؤوا الطريقة، ودعوا لَمّة تدير البطاقات والوقت والنقاط.' : 'Pick a game, read the rules, and let Lammeh handle the cards, timer and scores.'}</Text>
      {INTERACTIVE_GAMES.map((game) => {
        const info = game[lang];
        return (
          <Pressable key={game.key} style={styles.card} onPress={() => onOpen(game.key)}>
            <View style={[styles.iconBox, { backgroundColor: game.color }]}><Text style={styles.icon}>{game.icon}</Text></View>
            <View style={styles.copy}>
              <Text style={[styles.name, display]}>{info.name}</Text>
              <Text style={styles.players}>{info.players}</Text>
              <Text style={styles.desc}>{info.description}</Text>
            </View>
            <Text style={styles.arrow}>{ar ? '‹' : '›'}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: COLORS.bg }, wrap: { padding: 16, paddingBottom: 40 },
  head: { fontSize: 24, color: COLORS.ink }, sub: { fontSize: 13, color: COLORS.soft, lineHeight: 20, marginTop: 4, marginBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.line, borderRadius: RADIUS.tile, padding: 14, marginTop: 10 },
  iconBox: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, icon: { fontSize: 22 },
  copy: { flex: 1, marginHorizontal: 12 }, name: { fontSize: 16, color: COLORS.ink }, players: { fontSize: 11, color: COLORS.terra, fontWeight: '700', marginTop: 2 },
  desc: { fontSize: 12, color: COLORS.soft, lineHeight: 18, marginTop: 3 }, arrow: { fontSize: 25, color: COLORS.plum },
});

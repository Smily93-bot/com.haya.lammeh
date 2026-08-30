import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { interactiveGame } from '../content/interactiveGames';

function randomNext(length, current) {
  if (length < 2) return 0;
  return (current + 1 + Math.floor(Math.random() * (length - 1))) % length;
}

function makeStoryRoll(game, ar) {
  if (!game?.parts) return null;
  return Object.fromEntries(game.parts.map((part) => {
    const choices = ar ? part.ar : part.en;
    return [part.key, choices[Math.floor(Math.random() * choices.length)]];
  }));
}

export default function InteractiveGamePlayScreen({ lang, gameKey }) {
  const ar = lang === 'ar';
  const game = interactiveGame(gameKey);
  const info = game ? game[lang] : null;
  const [index, setIndex] = useState(() => game ? Math.floor(Math.random() * game.items.length) : 0);
  const [revealed, setRevealed] = useState(false);
  const [seconds, setSeconds] = useState(game?.seconds || 0);
  const [running, setRunning] = useState(false);
  const [scores, setScores] = useState([0, 0]);
  const [storyRoll, setStoryRoll] = useState(() => makeStoryRoll(game, ar));

  useEffect(() => {
    if (!running || seconds <= 0) return undefined;
    const timer = setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, seconds]);

  useEffect(() => { if (running && seconds === 0) setRunning(false); }, [running, seconds]);

  const item = useMemo(() => game?.items[index], [game, index]);
  if (!game || !item || !info) return <View style={styles.center}><Text>{ar ? 'اللعبة غير موجودة.' : 'Game not found.'}</Text></View>;

  const next = () => {
    if (game.key === 'storyMaker') setStoryRoll(makeStoryRoll(game, ar));
    setIndex((value) => randomNext(game.items.length, value));
    setRevealed(false);
    setRunning(false);
    setSeconds(game.seconds || 0);
  };
  const startTimer = () => {
    if (seconds === 0) setSeconds(game.seconds);
    setRunning(true);
  };
  const addPoint = (team) => setScores((value) => value.map((score, i) => i === team ? score + 1 : score));
  const rerollPart = (part) => {
    const choices = ar ? part.ar : part.en;
    setStoryRoll((value) => ({ ...value, [part.key]: choices[Math.floor(Math.random() * choices.length)] }));
  };
  const prompt = ar ? item.ar : item.en;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: game.color }]}><Text style={styles.icon}>{game.icon}</Text></View>
        <View style={{ flex: 1 }}><Text style={[styles.head, { fontFamily: ar ? FONTS.displayAr : FONTS.displayEn }]}>{info.name}</Text><Text style={styles.players}>{info.players}</Text></View>
      </View>
      <View style={styles.rules}><Text style={styles.ruleTitle}>{ar ? 'طريقة اللعب' : 'How to play'}</Text><Text style={styles.ruleText}>{info.how}</Text></View>

      {game.seconds > 0 && (
        <View style={styles.timerRow}>
          <Text style={[styles.timer, seconds === 0 && styles.timerDone]}>{seconds}</Text>
          <Pressable style={[styles.smallButton, { backgroundColor: game.color }]} onPress={startTimer} disabled={running}>
            <Text style={styles.smallButtonText}>{running ? (ar ? 'الوقت يعمل…' : 'Running…') : (seconds === 0 ? (ar ? 'إعادة الوقت' : 'Reset timer') : (ar ? 'ابدأ الوقت' : 'Start timer'))}</Text>
          </Pressable>
        </View>
      )}

      <View style={[styles.playCard, { borderTopColor: game.color }]}>
        <Text style={styles.prompt}>{prompt}</Text>
        {game.key === 'storyMaker' && <View style={styles.storyParts}>{game.parts.map((part) => <Pressable key={part.key} style={styles.storyPart} onPress={() => rerollPart(part)}><Text style={styles.storyLabel}>{ar ? part.labelAr : part.labelEn}</Text><Text style={styles.storyValue}>{storyRoll?.[part.key]}</Text><Text style={styles.storyChange}>{ar ? 'اضغط للتغيير' : 'Tap to change'}</Text></Pressable>)}</View>}
        {game.key === 'guessChoice' && <View style={styles.options}><Text style={styles.option}>A — {ar ? item.aAr : item.aEn}</Text><Text style={styles.option}>B — {ar ? item.bAr : item.bEn}</Text></View>}
        {item.optionsAr && <View style={styles.options}>{(ar ? item.optionsAr : item.optionsEn).map((option, optionIndex) => <Text key={option} style={styles.option}>{optionIndex + 1} — {option}</Text>)}</View>}
        {game.reveal && !revealed && <Pressable style={styles.reveal} onPress={() => setRevealed(true)}><Text style={styles.revealText}>{ar ? 'اكشف الإجابة' : 'Reveal answer'}</Text></Pressable>}
        {game.reveal && revealed && <View style={styles.answer}><Text style={styles.answerTitle}>{ar ? item.answerAr : item.answerEn}</Text><Text style={styles.answerNote}>{ar ? item.noteAr : item.noteEn}</Text></View>}
      </View>

      {game.competitive && (
        <View style={styles.scoreRow}>
          <Pressable style={styles.score} onPress={() => addPoint(0)}><Text style={styles.scoreLabel}>{ar ? 'الفريق 1' : 'Team 1'}</Text><Text style={styles.scoreValue}>{scores[0]}  ＋</Text></Pressable>
          <Pressable style={styles.score} onPress={() => addPoint(1)}><Text style={styles.scoreLabel}>{ar ? 'الفريق 2' : 'Team 2'}</Text><Text style={styles.scoreValue}>{scores[1]}  ＋</Text></Pressable>
        </View>
      )}
      <Pressable style={[styles.next, { backgroundColor: game.color }]} onPress={next}><Text style={styles.nextText}>{game.key === 'storyMaker' ? (ar ? 'ولّد عناصر جديدة' : 'Generate new ingredients') : (ar ? 'بطاقة أخرى' : 'Another card')}</Text></Pressable>
      <Text style={styles.safe}>{ar ? 'محتوى عائلي • لا إحراج ولا تحديات جريئة' : 'Family-friendly • no embarrassing or daring prompts'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: COLORS.bg }, wrap: { padding: 17, paddingBottom: 40 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center' }, iconBox: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginEnd: 12 }, icon: { fontSize: 22 },
  head: { fontSize: 22, color: COLORS.ink }, players: { color: COLORS.terra, fontSize: 12, fontWeight: '700', marginTop: 2 },
  rules: { backgroundColor: COLORS.card, borderRadius: RADIUS.tile, padding: 13, marginTop: 13, borderWidth: 1, borderColor: COLORS.line }, ruleTitle: { fontSize: 12, color: COLORS.plum, fontWeight: '700' }, ruleText: { color: COLORS.ink, fontSize: 13, lineHeight: 20, marginTop: 4 },
  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 14, gap: 12 }, timer: { fontSize: 32, color: COLORS.ink, fontWeight: '700', minWidth: 42, textAlign: 'center' }, timerDone: { color: COLORS.curtain },
  smallButton: { borderRadius: RADIUS.pill, paddingHorizontal: 16, paddingVertical: 9 }, smallButtonText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  playCard: { backgroundColor: COLORS.card, minHeight: 210, borderRadius: RADIUS.card, borderWidth: 1, borderColor: COLORS.line, borderTopWidth: 6, padding: 22, marginTop: 14, alignItems: 'center', justifyContent: 'center' },
  prompt: { fontSize: 23, lineHeight: 34, color: COLORS.ink, textAlign: 'center', fontWeight: '700' },
  options: { width: '100%', marginTop: 17, gap: 8 }, option: { backgroundColor: COLORS.bg, borderRadius: 12, padding: 11, color: COLORS.ink, textAlign: 'center', fontWeight: '700' },
  storyParts: { width: '100%', marginTop: 14, gap: 8 }, storyPart: { backgroundColor: COLORS.bg, borderRadius: 13, padding: 11 }, storyLabel: { color: COLORS.plum, fontSize: 11, fontWeight: '700' }, storyValue: { color: COLORS.ink, fontSize: 15, fontWeight: '700', marginTop: 2 }, storyChange: { color: COLORS.soft, fontSize: 9, marginTop: 3 },
  reveal: { backgroundColor: COLORS.plum, borderRadius: RADIUS.pill, paddingHorizontal: 18, paddingVertical: 10, marginTop: 20 }, revealText: { color: '#fff', fontWeight: '700' },
  answer: { backgroundColor: COLORS.freeBg, borderRadius: 14, padding: 13, width: '100%', marginTop: 16 }, answerTitle: { color: COLORS.free, fontSize: 18, fontWeight: '700', textAlign: 'center' }, answerNote: { color: COLORS.ink, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 5 },
  scoreRow: { flexDirection: 'row', gap: 10, marginTop: 12 }, score: { flex: 1, backgroundColor: COLORS.card, borderRadius: RADIUS.tile, borderWidth: 1, borderColor: COLORS.line2, padding: 11, alignItems: 'center' }, scoreLabel: { color: COLORS.soft, fontSize: 11 }, scoreValue: { color: COLORS.ink, fontSize: 19, fontWeight: '700', marginTop: 2 },
  next: { borderRadius: RADIUS.pill, paddingVertical: 13, alignItems: 'center', marginTop: 13 }, nextText: { color: '#fff', fontSize: 15, fontWeight: '700' }, safe: { color: COLORS.soft, fontSize: 11, textAlign: 'center', marginTop: 12 },
});

import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { TX } from '../i18n';
import { TONE_AR, WHO_LABEL } from '../labels';
import { SCENES, SCRIPTS, scenePackCount, scenePackSlice } from '../content';
import { SCENE_PACK } from '../config/store';
import { scenePackUnlocked } from '../services/entitlements';
import { noteFreeDraw } from '../services/ads';
import LockModal from '../components/LockModal';
import AdBanner from '../components/AdBanner';

function shuffled(n) {
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function OnStageScreen({ lang, refreshKey, onEntitlementsChanged }) {
  const t = TX[lang];
  const [tab, setTab] = useState('scenes');
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={styles.tabs}>
        {['scenes', 'scripts'].map((k) => (
          <Pressable key={k} style={[styles.tab, tab === k && styles.tabOn]} onPress={() => setTab(k)}>
            <Text style={[styles.tabTxt, tab === k && styles.tabTxtOn]}>{t[k]}</Text>
          </Pressable>
        ))}
      </View>
      {tab === 'scenes'
        ? <ScenesTab lang={lang} onEntitlementsChanged={onEntitlementsChanged} refreshKey={refreshKey} />
        : <ScriptsTab lang={lang} />}
    </View>
  );
}

function ScenesTab({ lang, onEntitlementsChanged }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const disp = { fontFamily: isAr ? FONTS.displayAr : FONTS.displayEn };
  const nPacks = scenePackCount(SCENE_PACK);
  const [pack, setPack] = useState(1);
  const [players, setPlayers] = useState('2');
  const [who, setWho] = useState('all');
  const [tone, setTone] = useState('all');
  const [lockOpen, setLockOpen] = useState(false);
  const [drawIdx, setDrawIdx] = useState(0);

  const open = scenePackUnlocked(pack);
  const packScenes = useMemo(() => scenePackSlice(pack, SCENE_PACK), [pack]);
  const tones = useMemo(() => ['all', ...Array.from(new Set(packScenes.map((s) => s.tone)))], [packScenes]);
  const list = useMemo(
    () => packScenes.filter((s) => {
      const castOk = players === '2' ? s.cast !== '3+ actors' : players === '3-6' ? s.cast !== '1 actor' : s.cast === '3+ actors';
      return castOk && (who === 'all' || s.cat === who || s.cat === 'any') && (tone === 'all' || s.tone === tone);
    }),
    [packScenes, players, who, tone]
  );
  const seq = useMemo(() => shuffled(Math.max(list.length, 1)), [list.length]);
  const scene = list.length ? list[seq[drawIdx % list.length]] : null;

  const draw = () => { setDrawIdx((i) => i + 1); noteFreeDraw(pack === 1); };

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <View style={styles.chipRow}>
        {Array.from({ length: nPacks }, (_, i) => i + 1).map((p) => {
          const unlocked = scenePackUnlocked(p);
          const label = `${t.pack} ${p}` + (p === 1 ? ' · ' + t.free : unlocked ? '' : ' 🔒');
          return (
            <Pressable key={p} style={[styles.chip, pack === p && styles.chipOn]} onPress={() => { setPack(p); setDrawIdx(0); }}>
              <Text style={[styles.chipTxt, pack === p && styles.chipTxtOn]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTxt}>{scenePackUnlocked(nPacks) ? '✅ ' + t.scenePacksOpen : '🔓 ' + t.scenePack1Free}</Text>
      </View>

      {!open ? (
        <View style={styles.lockPanel}>
          <Text style={{ fontSize: 26 }}>🔒</Text>
          <Text style={[styles.lockH, disp]}>{t.pack} {pack}</Text>
          <Text style={styles.lockP}>{t.buyScenePack}</Text>
          <Pressable style={styles.lockBtn} onPress={() => setLockOpen(true)}>
            <Text style={styles.lockBtnTxt}>{t.unlock}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={styles.filterTitle}>{isAr ? 'عدد اللاعبين' : 'Number of players'}</Text>
          <View style={styles.chipRow}>
            {[
              ['2', isAr ? 'شخصان' : '2 players'],
              ['3-6', isAr ? '3–6 أشخاص' : '3–6 players'],
              ['7+', isAr ? '7 أشخاص أو أكثر' : '7+ players'],
            ].map(([k, label]) => (
              <Pressable key={k} style={[styles.chip, players === k && styles.chipOn]} onPress={() => { setPlayers(k); setDrawIdx(0); }}>
                <Text style={[styles.chipTxt, players === k && styles.chipTxtOn]}>{label}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.filterTitle}>{isAr ? 'من سيلعب؟' : 'Who is playing?'}</Text>
          <View style={styles.chipRow}>
            {['all', 'any', 'couple', 'group'].map((k) => (
              <Pressable key={k} style={[styles.chip, who === k && styles.chipOn]} onPress={() => { setWho(k); setDrawIdx(0); }}>
                <Text style={[styles.chipTxt, who === k && styles.chipTxtOn]}>{WHO_LABEL[lang][k]}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.filterTitle}>{isAr ? 'مزاج المشهد' : 'Scene mood'}</Text>
          <View style={styles.chipRow}>
            {tones.map((k) => (
              <Pressable key={k} style={[styles.chip, tone === k && styles.chipOn]} onPress={() => { setTone(k); setDrawIdx(0); }}>
                <Text style={[styles.chipTxt, tone === k && styles.chipTxtOn]}>
                  {k === 'all' ? t.allTones : (isAr ? (TONE_AR[k] || k) : k)}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.card}>
            {scene ? (
              <>
                <Text style={styles.cast}>{scene.cast} · {isAr ? (TONE_AR[scene.tone] || scene.tone) : scene.tone}</Text>
                <Text style={[styles.sceneTxt, disp]}>{isAr ? scene.ar : scene.en}</Text>
                <Text style={styles.sceneTxt2}>{isAr ? scene.en : scene.ar}</Text>
              </>
            ) : (
              <Text style={styles.sceneTxt}>—</Text>
            )}
          </View>
          <Pressable style={styles.drawBtn} onPress={draw}>
            <Text style={styles.drawTxt}>🎭 {t.drawScene}</Text>
          </Pressable>

          <AdBanner show={pack === 1} />
        </>
      )}

      <LockModal
        visible={lockOpen}
        lang={lang}
        entId={'scenes:' + pack}
        title={`${t.scenes} · ${t.pack} ${pack}`}
        onClose={() => setLockOpen(false)}
        onUnlocked={() => { setLockOpen(false); onEntitlementsChanged && onEntitlementsChanged(); }}
      />
    </ScrollView>
  );
}

function ScriptsTab({ lang }) {
  const t = TX[lang];
  const isAr = lang === 'ar';
  const disp = { fontFamily: isAr ? FONTS.displayAr : FONTS.displayEn };
  const [openId, setOpenId] = useState(null);
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.note2}>{t.scriptsAllFree}</Text>
      {SCRIPTS.map((s) => {
        const isOpen = openId === s.no;
        return (
          <Pressable key={s.no} style={styles.script} onPress={() => setOpenId(isOpen ? null : s.no)}>
            <Text style={[styles.scriptTitle, disp]}>{isAr ? s.titleAr : s.titleEn}</Text>
            <Text style={styles.scriptMeta}>{s.cast} · {s.tone}</Text>
            {isOpen ? (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.lbl}>{t.setup}</Text>
                <Text style={styles.body}>{isAr ? s.setupAr : s.setupEn}</Text>
                {s.lines.map((ln, i) => (
                  <View key={i} style={{ marginTop: 8 }}>
                    <Text style={styles.who}>{ln.who}</Text>
                    <Text style={styles.line}>{isAr ? ln.ar : ln.en}</Text>
                  </View>
                ))}
                <Text style={[styles.lbl, { marginTop: 10 }]}>{t.outro}</Text>
                <Text style={styles.body}>{isAr ? s.outroAr : s.outroEn}</Text>
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
  tabs: { flexDirection: 'row', gap: 8, padding: 14, paddingBottom: 4 },
  tab: { flex: 1, borderWidth: 1, borderColor: COLORS.line2, borderRadius: RADIUS.pill, paddingVertical: 9, alignItems: 'center' },
  tabOn: { backgroundColor: COLORS.curtain, borderColor: COLORS.curtain },
  tabTxt: { color: COLORS.ink, fontWeight: '700' },
  tabTxtOn: { color: '#fff' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  chip: { borderWidth: 1, borderColor: COLORS.line2, borderRadius: RADIUS.pill, paddingHorizontal: 13, paddingVertical: 7 },
  chipOn: { backgroundColor: COLORS.plum, borderColor: COLORS.plum },
  chipTxt: { color: COLORS.ink, fontSize: 13 },
  chipTxtOn: { color: '#fff' },
  filterTitle: { color: COLORS.ink, fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 2 },
  note: { backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: COLORS.line2, padding: 11, marginBottom: 12 },
  noteTxt: { color: COLORS.ink, fontSize: 13 },
  note2: { color: COLORS.soft, fontSize: 13, marginBottom: 10 },
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: 22, minHeight: 180, justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.line2, elevation: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 5 } },
  cast: { color: COLORS.terra, fontSize: 12, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  sceneTxt: { fontSize: 19, color: COLORS.ink, textAlign: 'center', lineHeight: 29 },
  sceneTxt2: { fontSize: 14, color: COLORS.soft, textAlign: 'center', marginTop: 12, lineHeight: 21 },
  drawBtn: { backgroundColor: COLORS.curtain, borderRadius: 14, paddingVertical: 13, alignItems: 'center', marginTop: 14 },
  drawTxt: { color: '#fff', fontWeight: '700' },
  lockPanel: { backgroundColor: COLORS.card, borderRadius: RADIUS.card, borderWidth: 1, borderColor: COLORS.line2, padding: 24, alignItems: 'center' },
  lockH: { fontSize: 18, color: COLORS.ink, marginTop: 8 },
  lockP: { fontSize: 13, color: COLORS.soft, textAlign: 'center', marginTop: 6, marginBottom: 14 },
  lockBtn: { backgroundColor: COLORS.curtain, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 12 },
  lockBtnTxt: { color: '#fff', fontWeight: '700' },
  script: { backgroundColor: COLORS.card, borderRadius: RADIUS.tile, borderWidth: 1, borderColor: COLORS.line2, padding: 15, marginBottom: 10 },
  scriptTitle: { fontSize: 16, color: COLORS.ink },
  scriptMeta: { fontSize: 12, color: COLORS.soft, marginTop: 3 },
  expand: { fontSize: 12, color: COLORS.plum, marginTop: 8 },
  lbl: { fontSize: 12, fontWeight: '700', color: COLORS.terra, letterSpacing: 0.5 },
  body: { fontSize: 14, color: COLORS.ink, marginTop: 4, lineHeight: 21 },
  who: { fontSize: 12, fontWeight: '700', color: COLORS.plum },
  line: { fontSize: 14, color: COLORS.ink, marginTop: 2, lineHeight: 21 },
});

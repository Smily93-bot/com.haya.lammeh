import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useFonts as useFrauncesFonts, Fraunces_400Regular, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import { useFonts as useCairoFonts, Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { COLORS, FONTS } from './src/theme';
import { TX } from './src/i18n';

import HomeScreen from './src/screens/HomeScreen';
import QuestionGroupsScreen from './src/screens/QuestionGroupsScreen';
import QuestionPacksScreen from './src/screens/QuestionPacksScreen';
import QuestionDrawScreen from './src/screens/QuestionDrawScreen';
import OnStageScreen from './src/screens/OnStageScreen';
import GamesScreen from './src/screens/GamesScreen';
import GameHubScreen from './src/screens/GameHubScreen';
import InteractiveGamesScreen from './src/screens/InteractiveGamesScreen';
import InteractiveGamePlayScreen from './src/screens/InteractiveGamePlayScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import DiscussionsScreen from './src/screens/DiscussionsScreen';
import DiscussionDrawScreen from './src/screens/DiscussionDrawScreen';
import CoinShopScreen from './src/screens/CoinShopScreen';

import { ensureLoaded } from './src/services/entitlements';
import { initAds } from './src/services/ads';
import { initPurchases, shutdownPurchases } from './src/services/purchases';
import { ensureCoinsLoaded } from './src/services/coins';

export default function App() {
  const [frLoaded] = useFrauncesFonts({ Fraunces_400Regular, Fraunces_600SemiBold });
  const [cairoLoaded] = useCairoFonts({ Cairo_400Regular, Cairo_700Bold });
  const [ready, setReady] = useState(false);

  const [lang, setLang] = useState('ar');
  // nav stack of { view, params }
  const [stack, setStack] = useState([{ view: 'home', params: {} }]);
  const [entRev, setEntRev] = useState(0); // bump to re-render after unlocks

  useEffect(() => {
    (async () => {
      await ensureLoaded();
      await ensureCoinsLoaded();
      await initAds();
      await initPurchases((entId) => setEntRev((r) => r + 1));
      setReady(true);
    })();
    return () => { shutdownPurchases(); };
  }, []);

  const top = stack[stack.length - 1];
  const push = (view, params = {}) => setStack((s) => [...s, { view, params }]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const reset = (view) => setStack([{ view, params: {} }]);
  const bumpEnt = useCallback(() => setEntRev((r) => r + 1), []);

  if (!frLoaded || !cairoLoaded || !ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.plum} size="large" />
      </View>
    );
  }

  const t = TX[lang];
  const canBack = stack.length > 1;

  let screen = null;
  const p = top.params;
  switch (top.view) {
    case 'home':
      screen = <HomeScreen lang={lang} onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        onGo={(k) => push(k === 'questions' ? 'qgroups' : k)} />;
      break;
    case 'qgroups':
      screen = <QuestionGroupsScreen lang={lang} onOpenGroup={(key) => push('qpacks', { key })} />;
      break;
    case 'qpacks':
      screen = <QuestionPacksScreen key={entRev} lang={lang} groupKey={p.key}
        onOpenDeck={(key, deck) => push('qdraw', { key, deck })}
        onEntitlementsChanged={bumpEnt} />;
      break;
    case 'qdraw':
      screen = <QuestionDrawScreen lang={lang} groupKey={p.key} deckNo={p.deck} />;
      break;
    case 'onstage':
      screen = <OnStageScreen key={entRev} lang={lang} refreshKey={entRev} onEntitlementsChanged={bumpEnt} />;
      break;
    case 'games':
      screen = <GameHubScreen lang={lang} onGo={(key) => push(key)} />;
      break;
    case 'interactivegames':
      screen = <InteractiveGamesScreen lang={lang} onOpen={(key) => push('interactiveplay', { key })} />;
      break;
    case 'interactiveplay':
      screen = <InteractiveGamePlayScreen lang={lang} gameKey={p.key} />;
      break;
    case 'gameguide':
      screen = <GamesScreen lang={lang} />;
      break;
    case 'activities':
      screen = <ActivitiesScreen lang={lang} />;
      break;
    case 'discussions':
      screen = <DiscussionsScreen key={entRev} lang={lang} onOpen={(key)=>push('discussiondraw',{key})} />;
      break;
    case 'discussiondraw':
      screen = <DiscussionDrawScreen key={entRev} lang={lang} categoryKey={p.key} onChanged={bumpEnt} />;
      break;
    case 'coins':
      screen = <CoinShopScreen key={entRev} lang={lang} onChanged={bumpEnt} />;
      break;
    default:
      screen = <HomeScreen lang={lang} onGo={() => {}} onToggleLang={() => {}} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      {top.view !== 'home' && (
        <View style={styles.header}>
          <Pressable onPress={pop} disabled={!canBack} style={styles.back}>
            <Text style={styles.backTxt}>{canBack ? '‹ ' + (lang === 'ar' ? 'رجوع' : 'Back') : ''}</Text>
          </Pressable>
          <Pressable onPress={() => reset('home')}>
            <Text style={[styles.brand, { fontFamily: lang === 'ar' ? FONTS.displayAr : FONTS.displayEn }]}>
              {lang === 'ar' ? 'لمّة' : 'Lammeh'}
            </Text>
          </Pressable>
          <View style={{ width: 60 }} />
        </View>
      )}
      <View style={{ flex: 1 }}>{screen}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, backgroundColor: COLORS.bg, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  back: { width: 60 },
  backTxt: { color: COLORS.plum, fontSize: 15, fontWeight: '600' },
  brand: { fontSize: 20, color: COLORS.ink },
});

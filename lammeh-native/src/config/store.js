// ======================================================================
// STORE + ADS CONFIG  — the only file you edit when your accounts are ready.
// ======================================================================
import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// --- freemium rules (match the web app) ---
export const DECK_SIZE = 30;   // cards per question deck (deck 1 free)
export const SCENE_PACK = 30;  // scenes per pack (pack 1 free)

// --- Google Play in-app product IDs ---
// Create these EXACT ids in Play Console → Monetize → In-app products
// (type: one-time / non-consumable). One per question group + scene pack.
export const PRODUCTS = {
  love:      'unlock_love',
  engaged:   'unlock_engaged',
  friends:   'unlock_friends',
  funny:     'unlock_funny',
  wyr:       'unlock_wyr',
  deep:      'unlock_deep',
  childhood: 'unlock_childhood',
  future:    'unlock_future',
  values:    'unlock_values',
  hypo:      'unlock_hypo',
  know:      'unlock_know',
  'scenes:2': 'unlock_scenes_2',
  'scenes:3': 'unlock_scenes_3',
};
// reverse map (productId -> entitlement id) used after a purchase
export const ENTITLEMENT_BY_PRODUCT = Object.fromEntries(
  Object.entries(PRODUCTS).map(([id, sku]) => [sku, id])
);
export const ALL_SKUS = Object.values(PRODUCTS);

// --- AdMob ad unit IDs ---
// Development and preview APKs → Google TEST units, always safe.
// The EAS preview profile sets EXPO_PUBLIC_USE_TEST_ADS=true so a release-
// mode test APK cannot accidentally request live ads during testing.
// In production, replace the strings on the right with YOUR real ad units.
const USE_TEST_ADS = __DEV__ || process.env.EXPO_PUBLIC_USE_TEST_ADS === 'true';
export const AD_UNITS = {
  banner: USE_TEST_ADS
    ? TestIds.BANNER
    : Platform.select({ android: 'REPLACE_WITH_REAL_ANDROID_BANNER_AD_UNIT_ID' }),
  interstitial: USE_TEST_ADS
    ? TestIds.INTERSTITIAL
    : Platform.select({ android: 'REPLACE_WITH_REAL_ANDROID_INTERSTITIAL_AD_UNIT_ID' }),
  rewarded: USE_TEST_ADS
    ? TestIds.REWARDED
    : Platform.select({ android: 'REPLACE_WITH_REAL_ANDROID_REWARDED_AD_UNIT_ID' }),
};

// show an interstitial ad after this many free cards drawn
export const INTERSTITIAL_EVERY = 25;

// --- Coins economy ---
export const QUESTION_DECK_COIN_COST = 100;
export const DISCUSSION_PACK_COIN_COST = 100;
export const REWARDED_COIN_AMOUNT = 20;
export const COIN_PACKS = { coins500: { sku: 'coins_500', coins: 500 } };

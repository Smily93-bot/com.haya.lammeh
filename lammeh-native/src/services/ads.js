// AdMob helpers. Banner is a component (see components/AdBanner.js);
// this module handles privacy consent + interstitial (full-screen) ads.
import mobileAds, {
  AdsConsent,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { AD_UNITS, INTERSTITIAL_EVERY } from '../config/store';

let interstitial = null;
let loaded = false;
let drawCount = 0;
let adsStarted = false;

async function startAdsIfAllowed() {
  if (adsStarted) return true;
  try {
    const { canRequestAds } = await AdsConsent.getConsentInfo();
    if (!canRequestAds) return false;
    adsStarted = true;
    await mobileAds().initialize();
    loadInterstitial();
    return true;
  } catch (e) {
    if (__DEV__) console.warn('AdMob initialization failed:', e);
    return false;
  }
}

// Call once at app launch. UMP checks whether a privacy message is required
// for this user/region. Configure the actual message in AdMob -> Privacy & messaging.
export async function initAds() {
  try {
    // First try consent saved from a previous session.
    await startAdsIfAllowed();

    // Then refresh consent on every launch and show Google's form if required.
    await AdsConsent.gatherConsent();
    await startAdsIfAllowed();
  } catch (e) {
    if (__DEV__) console.warn('Ad consent flow failed:', e);
    // The UMP SDK may still have a valid prior-session status.
    await startAdsIfAllowed();
  }
}

function loadInterstitial() {
  if (!adsStarted || !AD_UNITS.interstitial) return;
  try {
    interstitial = InterstitialAd.createForAdRequest(AD_UNITS.interstitial, {
      requestNonPersonalizedAdsOnly: true,
    });
    loaded = false;
    interstitial.addAdEventListener(AdEventType.LOADED, () => { loaded = true; });
    interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      loaded = false;
      if (__DEV__) console.warn('Interstitial failed to load:', error);
    });
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      loaded = false;
      loadInterstitial(); // preload the next one
    });
    interstitial.load();
  } catch (e) {
    if (__DEV__) console.warn('Interstitial setup failed:', e);
  }
}

// Call each time FREE content advances. Purchased content stays ad-free.
export function noteFreeDraw(isFree) {
  if (!isFree || !adsStarted) return;
  drawCount += 1;
  if (drawCount % INTERSTITIAL_EVERY === 0 && loaded && interstitial) {
    try { interstitial.show(); }
    catch (e) { if (__DEV__) console.warn('Interstitial show failed:', e); }
  }
}

// Rewarded ad: coins are granted only after Google's EARNED_REWARD event.
export async function showCoinRewardAd(onEarned) {
  if (!adsStarted || !AD_UNITS.rewarded) return false;
  const { RewardedAd, RewardedAdEventType } = require('react-native-google-mobile-ads');
  return await new Promise((resolve) => {
    try {
      const ad = RewardedAd.createForAdRequest(AD_UNITS.rewarded, { requestNonPersonalizedAdsOnly: true });
      let earned = false;
      const offEarn = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { earned = true; onEarned && onEarned(); });
      const offLoad = ad.addAdEventListener(AdEventType.LOADED, () => ad.show());
      const offClose = ad.addAdEventListener(AdEventType.CLOSED, () => { offEarn(); offLoad(); offClose(); offErr(); resolve(earned); });
      const offErr = ad.addAdEventListener(AdEventType.ERROR, () => { offEarn(); offLoad(); offClose(); offErr(); resolve(false); });
      ad.load();
    } catch(e) { resolve(false); }
  });
}

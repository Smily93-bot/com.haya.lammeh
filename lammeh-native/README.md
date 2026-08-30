# لمّة · Lammeh — native Android app

## Games & Activities update

The Games tile now opens one Lammeh hub with three family-friendly experiences:

- **Play in the app:** original bilingual card-led games with timers, reveals and optional team scores.
- **Group game guide:** classic offline games with players, supplies and instructions.
- **Activities:** cooperative, creative and learning activities for a gathering.

The interactive collection includes **Who Among Us?**, **Act & Guess**, **Fact or Myth?**, **Guess My Choice**, **Find the Connection**, **What Happens Next?**, **If You Were a Writer…**, and **Story Maker**. Story Maker generates place, time, theme, plot, conflict and ending ingredients; each ingredient can be rerolled separately.

Commercial-game-like entries, daring prompts, unsafe physical games and duplicated mechanics were removed from the guide. Arabic and English content are bundled for offline play.

---

A React Native (Expo) app built on your `com.haya.lammeh` project.
It has four main sections — **Questions** (30-per-deck freemium),
**On Stage** (scene packs + scripts), **Discussions**, and
**Games & Activities** — with Google Play Billing unlocks, coins and
AdMob ads on free content.

Everything runs on Google's **test** ad + a dev store setup out of the
box, so you can see it working before creating any accounts.

---

## What's inside

```
App.js                     app shell + navigation + fonts + init
src/content/               all content (questions, scenes, scripts, games) + loader
src/config/store.js        ← the ONE file you edit: product ids + ad ids
src/services/purchases.js  Google Play Billing (react-native-iap)
src/services/ads.js        AdMob interstitial logic
src/services/entitlements.js  remembers unlocks on the device
src/components/            AdBanner, LockModal
src/screens/               Home, Questions (groups/decks/draw), On Stage, Games
```

**What's paid vs free:**
- Questions: deck 1 of each group free; other decks unlock by buying that group.
- On Stage scenes: pack 1 free; packs 2 & 3 unlock per pack. Scripts: all free.
- Games: all free.
- Ads show only on free content; purchased groups/packs are ad-free.

---

## 1) Run it on your computer (first time)

You need **Node.js 18+** and a phone or Android emulator.

```bash
npm install
npx expo install --fix        # aligns native module versions to Expo 51
```

Because this app uses native modules (ads + billing), it can't run in
Expo Go — you build a **dev client** once:

```bash
npm install -g eas-cli
eas login                     # create a free Expo account if needed
eas init                      # links the project (fills projectId)
eas build --profile development --platform android
```

Install the resulting APK on your phone (EAS gives you a link/QR), then:

```bash
npm start                     # opens the dev server; scan the QR
```

The app loads with **test ads** and works fully except real purchases
(those need the Play Console setup in step 3).

---

## 2) AdMob account (for real ads)

1. Go to **admob.google.com**, sign in, create an account.
2. **Add app → Android → com.haya.lammeh**.
3. Create two **ad units**: one **Banner**, one **Interstitial**. Copy their ids.
4. Copy your **App ID** (looks like `ca-app-pub-…~…`).
5. Put them in the app:
   - `app.config.js` → `androidAppId` = your App ID.
   - `src/config/store.js` → `AD_UNITS.banner` / `.interstitial` = your unit ids
     (replace the `ca-app-pub-XXXX/…` placeholders; keep `TestIds` for `__DEV__`).

---

## 3) Google Play Console + in-app products (for real unlocks)

1. **play.google.com/console** → pay the one-time **$25**, verify identity.
2. **Create app** → name it, pick Android, free with in-app purchases.
3. Upload a build once (needed before products go live):
   ```bash
   eas build --profile production --platform android
   ```
   Upload the resulting **.aab** to an internal-testing track.
4. **Monetize → In-app products → Create**. Make one product per unlock,
   using these EXACT ids (they must match `src/config/store.js`):
   ```
   unlock_love, unlock_engaged, unlock_friends, unlock_funny,
   unlock_wyr, unlock_deep, unlock_childhood, unlock_future,
   unlock_values, unlock_hypo, unlock_know,
   unlock_scenes_2, unlock_scenes_3
   ```
   Set each as a **one-time** product and a price. Activate them.
5. Add yourself as a **license tester** (Play Console → Setup → License
   testing) so you can test purchases without being charged.

Purchases then work automatically: buyer taps Buy → Google's payment
sheet → the app grants the unlock and remembers it. "Restore purchases"
re-grants on a new device with the same Google account.

---

## 4) Ship it

- `eas build --profile production --platform android` → upload the .aab.
- Complete the store listing (you already have icon + screenshots art).
- New personal accounts must run **closed testing (~12 testers, 14 days)**
  before production. Then submit for review.

---

## Notes

- **Ads only show on free content.** Once a group is purchased, its decks
  are ad-free — a nice nudge to buy.
- Change ad frequency in `src/config/store.js` → `INTERSTITIAL_EVERY`.
- The content file is generated from the web app, so the two never drift.

## Coins + Discussions update (2026-08-30)
- Added a Coins wallet stored on-device.
- 500-coin consumable product SKU: `coins_500` (price is configured in Google Play Console).
- Rewarded video grants 20 coins after the earned-reward callback.
- Paid question decks now unlock individually for 100 coins; deck 1 remains free.
- Added Discussions section with 10 categories and a free/paid split. First 10 discussion cards per category are free; the rest unlock for 100 coins.
- Production AdMob rewarded ID still needs to replace `REPLACE_WITH_REAL_ANDROID_REWARDED_AD_UNIT_ID`.

Important: the included discussion data file currently contains the first 10 verified cards from each of the user's 10-category discussion bank. Replace/extend each category's `questions` array in `src/content/discussions.js` with the remaining verified cards before production so the app contains the full 500-card bank.

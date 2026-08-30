# Lammeh — full launch steps (zero → published)

Follow these in order. Steps 1–2 get the app running on your phone.
Steps 3–5 turn on real ads + payments. Step 6 publishes.

Each step says **[YOU]** (only you can do it) or **[APP]** (already done
in the code — you just paste an ID).

---

## STEP 1 — Get the tools on your computer  [YOU]

1. Install **Node.js** (LTS) from nodejs.org.
2. Unzip this project somewhere, open a terminal in the folder.
3. Run:
   ```bash
   npm install
   npx expo install --fix
   npm install -g eas-cli
   eas login          # make a free Expo account if you don't have one
   eas init           # links the project
   ```

## STEP 2 — Run it on your phone  [YOU]

Ads + billing need a real build (not Expo Go), so build a dev version once:
```bash
eas build --profile development --platform android
```
- EAS gives you a link/QR → install the APK on your Android phone.
- Then run `npm start`, scan the QR. The app opens with **test ads**.
- Play with all three sections. Buying won't work yet (that's Step 4).

✅ At this point the whole app works except real purchases.

---

## STEP 3 — Create your accounts  [YOU]

**AdMob** (ads):
1. admob.google.com → sign in → create account.
2. Add app → Android → package `com.haya.lammeh`.
3. Create a **Banner** unit and an **Interstitial** unit. Copy both ids.
4. Copy your AdMob **App ID** (`ca-app-pub-…~…`).
5. Go to **Privacy & messaging** in AdMob and set up a **consent message**
   (required for GDPR — EU/UK users). The app already shows this consent
   popup automatically before any ad loads; you only configure the message
   text/design here.

**Google Play Console** (payments + publishing):
1. play.google.com/console → pay **$25** (one-time) → verify your identity.
2. Choose a **Personal** account.
3. Create app → name **لمّة · Lammeh**, Android, free + in-app purchases.

## STEP 4 — Plug your IDs into the app  [APP + YOU]

Open two files and replace the placeholders:

`app.config.js`
- `androidAppId` → your AdMob **App ID**.

`src/config/store.js`
- `AD_UNITS.banner` → your real banner unit id.
- `AD_UNITS.interstitial` → your real interstitial unit id.
- (Leave the `__DEV__ ? TestIds…` parts — they keep test ads in development.)

Then in **Play Console → Monetize → In-app products**, create one
**one-time** product for each id below (these must match exactly), give
each a price, and **activate**:
```
unlock_love  unlock_engaged  unlock_friends  unlock_funny
unlock_wyr   unlock_deep     unlock_childhood unlock_future
unlock_values unlock_hypo    unlock_know
unlock_scenes_2  unlock_scenes_3
```
Add yourself under **Setup → License testing** so you can test buying
without being charged.

## STEP 5 — Build the real version + test purchases  [YOU]

```bash
eas build --profile production --platform android
```
- Upload the resulting **.aab** to Play Console → an **internal testing**
  track, add your Google account as a tester, install from the test link.
- Try buying a locked deck → Google's payment sheet appears → it unlocks.
  "Restore purchases" re-grants on a fresh install.

---

## STEP 6 — Publish  [YOU]

1. Fill the **store listing**: title, short/long description, screenshots,
   icon (you already have store art from the web kit), and a **privacy
   policy URL** (you have `privacy.html` — host it and use its link).
2. New personal accounts must run **closed testing** — about **12 testers
   for 14 days** — before production is unlocked.
3. Request production access → submit for review → once approved, it's live.

---

## Quick reference — where things live

| Want to change… | File |
|---|---|
| Ad IDs | `app.config.js`, `src/config/store.js` |
| Product IDs / prices logic | `src/config/store.js` (+ Play Console) |
| How often interstitials show | `src/config/store.js` → `INTERSTITIAL_EVERY` |
| Free-deck / free-pack rules | `src/config/store.js` (`DECK_SIZE`, `SCENE_PACK`) |
| Colors / fonts | `src/theme.js` |
| Content (questions/scenes/etc.) | `src/content/lammeh-content.json` |

When you hit an error at any step, send me the exact message and I'll fix it.

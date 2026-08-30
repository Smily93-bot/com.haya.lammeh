# Lammeh - Google readiness changes made

## Code changes already made
- Added Google UMP consent flow before starting AdMob requests.
- Consent status is refreshed on every app launch.
- Ads only initialize when UMP says ads can be requested.
- Added banner/interstitial error logging in development.
- Preserved test ads in development and non-personalized ad requests.
- Preserved the current interstitial frequency: every 25 free draws.
- Purchased content remains ad-free.

## You still must provide/configure these account values
1. Real Android AdMob App ID in `app.config.js`.
2. Real Android banner ad-unit ID in `src/config/store.js`.
3. Real Android interstitial ad-unit ID in `src/config/store.js`.
4. Create/configure the GDPR/privacy message in AdMob > Privacy & messaging.
5. Create the matching one-time products in Google Play Console.
6. Run an EAS production build and test through Google Play testing.

Do not click live ads while testing. Use Google test units or register test devices.

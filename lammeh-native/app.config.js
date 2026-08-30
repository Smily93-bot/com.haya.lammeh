// Expo configuration for the Lammeh native Android app.
// NOTE: replace the AdMob app IDs below with YOUR real ones once your
// AdMob account is created. The values here are Google's official TEST
// app IDs, so the app runs and shows test ads before you have an account.

module.exports = {
  expo: {
    name: "لمّة · Lammeh",
    slug: "lammeh",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FBF6EF"
    },
    assetBundlePatterns: ["**/*"],
    android: {
      package: "com.haya.lammeh",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#FBF6EF"
      },
      permissions: ["com.google.android.gms.permission.AD_ID"]
    },
    plugins: [
      [
        "react-native-google-mobile-ads",
        {
          // TEST app IDs from Google. Replace with your real AdMob app ID
          // (looks like ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY) when ready.
          androidAppId: "ca-app-pub-3940256099942544~3347511713" // TEST ID: replace with real Android AdMob App ID before production
        }
      ]
    ],
    extra: {
      eas: {
        // Filled automatically when you run `eas init` on your computer.
        projectId: ""
      }
    }
  }
};

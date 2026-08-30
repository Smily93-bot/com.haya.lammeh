import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AD_UNITS } from '../config/store';

// Renders a banner ad. Pass show={false} to hide it (e.g. on purchased content).
export default function AdBanner({ show = true }) {
  if (!show || !AD_UNITS.banner) return null;
  return (
    <View style={{ alignItems: 'center', paddingVertical: 6 }}>
      <BannerAd
        unitId={AD_UNITS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdFailedToLoad={(error) => {
          if (__DEV__) console.warn('Banner failed to load:', error);
        }}
      />
    </View>
  );
}

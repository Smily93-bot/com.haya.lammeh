// Google Play Billing via react-native-iap.
// Handles: connect, load prices, buy, restore, and granting entitlements.
import {
  initConnection,
  endConnection,
  getProducts,
  requestPurchase,
  finishTransaction,
  getAvailablePurchases,
  purchaseUpdatedListener,
  purchaseErrorListener,
} from 'react-native-iap';
import { ALL_SKUS, ENTITLEMENT_BY_PRODUCT, COIN_PACKS } from '../config/store';
import { addCoins } from './coins';
import { grant, grantMany } from './entitlements';

let updateSub = null;
let errorSub = null;
let productCache = {};

// Call once on app start.
export async function initPurchases(onEntitlementGranted) {
  try {
    await initConnection();
  } catch (e) {
    // Store not available (e.g. running outside Google Play). Fine in dev.
    return false;
  }

  // Listen for successful purchases (also fires for restored ones).
  updateSub = purchaseUpdatedListener(async (purchase) => {
    try {
      const sku = purchase?.productId;
      const coinPack = Object.values(COIN_PACKS).find((x) => x.sku === sku);
      if (coinPack) {
        await addCoins(coinPack.coins);
        onEntitlementGranted && onEntitlementGranted('coins');
      }
      const entId = ENTITLEMENT_BY_PRODUCT[sku];
      if (entId) {
        await grant(entId);
        onEntitlementGranted && onEntitlementGranted(entId);
      }
      // Acknowledge the purchase (non-consumable) so Google finalizes it.
      await finishTransaction({ purchase, isConsumable: !!coinPack });
    } catch (e) {}
  });

  errorSub = purchaseErrorListener((err) => {
    // user cancelled or store error; handled by the caller's try/catch UI
  });

  // Load prices so the UI can show real localized amounts.
  try {
    const products = await getProducts({ skus: [...ALL_SKUS, ...Object.values(COIN_PACKS).map(x => x.sku)] });
    products.forEach((p) => { productCache[p.productId] = p; });
  } catch (e) {}

  // Re-grant anything already owned (e.g. after reinstall).
  await restorePurchases();
  return true;
}

export function priceFor(sku) {
  const p = productCache[sku];
  return p ? (p.localizedPrice || p.price) : null;
}

// Start a purchase for one product id (sku).
export async function buy(sku) {
  // On Android v12+, requestPurchase takes { skus: [...] }.
  await requestPurchase({ skus: [sku] });
  // The purchaseUpdatedListener above grants the entitlement.
}

// Restore previously bought items (used on reinstall / new device with same account).
export async function restorePurchases() {
  try {
    const owned = await getAvailablePurchases();
    const ids = [];
    owned.forEach((pur) => {
      const entId = ENTITLEMENT_BY_PRODUCT[pur.productId];
      if (entId) ids.push(entId);
    });
    if (ids.length) await grantMany(ids);
    return ids;
  } catch (e) {
    return [];
  }
}

export async function shutdownPurchases() {
  try { updateSub && updateSub.remove(); } catch (e) {}
  try { errorSub && errorSub.remove(); } catch (e) {}
  try { await endConnection(); } catch (e) {}
}

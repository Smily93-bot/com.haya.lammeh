import React, { useState } from 'react';
import { Modal, View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { pick, TX } from '../i18n';
import { PRODUCTS } from '../config/store';
import { buy, priceFor, restorePurchases } from '../services/purchases';

// props: visible, lang, entId (e.g. 'love' or 'scenes:2'), title, onClose, onUnlocked
export default function LockModal({ visible, lang, entId, title, onClose, onUnlocked }) {
  const t = TX[lang];
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const sku = PRODUCTS[entId];
  const price = sku ? priceFor(sku) : null;

  const doBuy = async () => {
    if (busy) return;
    setBusy(true); setMsg('');
    try {
      await buy(sku);
      // entitlement is granted by the purchase listener; give it a beat
      setTimeout(() => { setBusy(false); onUnlocked && onUnlocked(); }, 400);
    } catch (e) {
      setBusy(false);
      setMsg(pick(lang, 'لم تكتمل عملية الشراء.', 'Purchase didn’t complete.'));
    }
  };

  const doRestore = async () => {
    if (busy) return;
    setBusy(true); setMsg('');
    await restorePurchases();
    setBusy(false);
    setMsg(t.restoreDone);
    onUnlocked && onUnlocked();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.ic}>🔓</Text>
          <Text style={[styles.h, { fontFamily: lang === 'ar' ? FONTS.displayAr : FONTS.displayEn }]}>
            {t.unlockContent}
          </Text>
          <Text style={styles.sub}>{title}</Text>
          <Text style={styles.note}>{t.buyToUnlock}</Text>

          <Pressable style={[styles.buy, busy && { opacity: 0.6 }]} onPress={doBuy} disabled={busy}>
            {busy
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.buyTxt}>🛒 {t.buy}{price ? '  ·  ' + price : ''}</Text>}
          </Pressable>

          <Pressable onPress={doRestore} disabled={busy}>
            <Text style={styles.restore}>{t.restore}</Text>
          </Pressable>

          {!!msg && <Text style={styles.msg}>{msg}</Text>}

          <Pressable onPress={onClose} disabled={busy}>
            <Text style={styles.cancel}>{t.cancel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(42,34,51,0.5)', justifyContent: 'center', padding: 22 },
  box: { backgroundColor: COLORS.bg, borderRadius: 22, padding: 22, borderWidth: 1, borderColor: COLORS.line2 },
  ic: { fontSize: 30, textAlign: 'center' },
  h: { fontSize: 22, color: COLORS.ink, textAlign: 'center', marginTop: 6 },
  sub: { fontSize: 15, color: COLORS.ink, textAlign: 'center', marginTop: 4, fontWeight: '600' },
  note: { fontSize: 13, color: COLORS.soft, textAlign: 'center', marginTop: 6, marginBottom: 16 },
  buy: { backgroundColor: COLORS.plum, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  buyTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  restore: { color: COLORS.plum, textAlign: 'center', marginTop: 14, fontSize: 13, textDecorationLine: 'underline' },
  msg: { color: COLORS.free, textAlign: 'center', marginTop: 10, fontSize: 13 },
  cancel: { color: COLORS.soft, textAlign: 'center', marginTop: 16, fontSize: 14 },
});

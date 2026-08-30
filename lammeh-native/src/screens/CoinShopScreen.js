import React,{useState} from 'react';
import {View,Text,Pressable,StyleSheet,Alert} from 'react-native';
import {COLORS,RADIUS,FONTS} from '../theme';
import {coinBalance,addCoins} from '../services/coins';
import {showCoinRewardAd} from '../services/ads';
import {buy,priceFor} from '../services/purchases';
import {COIN_PACKS,REWARDED_COIN_AMOUNT} from '../config/store';
export default function CoinShopScreen({lang,onChanged}){
 const ar=lang==='ar', [busy,setBusy]=useState(false); const bal=coinBalance(); const pack=COIN_PACKS.coins500;
 const watch=async()=>{setBusy(true); const ok=await showCoinRewardAd(async()=>{await addCoins(REWARDED_COIN_AMOUNT);onChanged&&onChanged();});setBusy(false);if(!ok)Alert.alert(ar?'الإعلان غير متاح':'Ad unavailable',ar?'حاولي مرة أخرى بعد قليل.':'Please try again shortly.');};
 return <View style={s.wrap}><Text style={[s.h,{fontFamily:ar?FONTS.displayAr:FONTS.displayEn}]}>{ar?'عملات لمّة':'Lammeh Coins'}</Text><View style={s.balance}><Text style={s.big}>🪙 {bal}</Text><Text>{ar?'رصيدك الحالي':'Your balance'}</Text></View>
 <Pressable disabled={busy} style={s.card} onPress={watch}><Text style={s.title}>▶️ {ar?'شاهد فيديو':'Watch a video'}</Text><Text style={s.sub}>+{REWARDED_COIN_AMOUNT} {ar?'عملة':'coins'}</Text></Pressable>
 <Pressable style={s.card} onPress={()=>buy(pack.sku)}><Text style={s.title}>🪙 {ar?'اشترِ 500 عملة':'Buy 500 coins'}</Text><Text style={s.sub}>{priceFor(pack.sku)||(ar?'السعر يظهر من Google Play':'Price shown by Google Play')}</Text></Pressable>
 </View>;
}
const s=StyleSheet.create({wrap:{flex:1,padding:20,backgroundColor:COLORS.bg},h:{fontSize:25,color:COLORS.ink,marginBottom:16},balance:{alignItems:'center',padding:24,backgroundColor:COLORS.card,borderRadius:RADIUS.card,borderWidth:1,borderColor:COLORS.line,marginBottom:14},big:{fontSize:32,fontWeight:'800',color:COLORS.ink},card:{padding:18,backgroundColor:COLORS.card,borderRadius:RADIUS.tile,borderWidth:1,borderColor:COLORS.line2,marginBottom:12},title:{fontSize:17,fontWeight:'700',color:COLORS.ink},sub:{marginTop:5,color:COLORS.soft}});

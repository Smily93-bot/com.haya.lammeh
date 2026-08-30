import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY='lammeh_coins_v1';
let balance=0, loaded=false;
export async function ensureCoinsLoaded(){ if(loaded)return balance; const raw=await AsyncStorage.getItem(KEY); balance=Math.max(0,parseInt(raw||'0',10)||0); loaded=true; return balance; }
async function save(){ await AsyncStorage.setItem(KEY,String(balance)); }
export function coinBalance(){ return balance; }
export async function addCoins(n){ await ensureCoinsLoaded(); balance+=Math.max(0,n|0); await save(); return balance; }
export async function spendCoins(n){ await ensureCoinsLoaded(); n=Math.max(0,n|0); if(balance<n)return false; balance-=n; await save(); return true; }

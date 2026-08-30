// Remembers what the user has unlocked, on the device.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'lammeh_unlocks_v1';
let cache = null;

async function load() {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : {};
  } catch (e) {
    cache = {};
  }
  return cache;
}

async function save() {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(cache || {})); } catch (e) {}
}

export async function grant(id) {
  const o = await load();
  o[id] = Date.now();
  await save();
}

export async function grantMany(ids) {
  const o = await load();
  ids.forEach((id) => { o[id] = Date.now(); });
  await save();
}

export async function has(id) {
  const o = await load();
  return !!o[id];
}

// synchronous check against the in-memory cache (call ensureLoaded first)
export function hasSync(id) {
  return !!(cache && cache[id]);
}

export async function ensureLoaded() {
  await load();
}

export function groupUnlocked(key) { return hasSync(key); }
export function scenePackUnlocked(pack) { return pack === 1 || hasSync('scenes:' + pack); }

export function deckUnlocked(groupKey, deckNo) { return deckNo === 1 || hasSync(`qdeck:${groupKey}:${deckNo}`) || hasSync(groupKey); }
export function discussionUnlocked(categoryKey) { return hasSync(`discussion:${categoryKey}`); }

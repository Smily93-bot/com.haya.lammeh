// Loads the bundled content and exposes helpers.
import data from './lammeh-content.json';

export const META = data.meta;
export const QUESTIONS = data.questions;
export const SCENES = data.scenes;
export const SCRIPTS = data.scripts;
export const GAMES = data.games;
export const QORDER = data.meta.order;

export function deckCount(groupKey, size) {
  const g = QUESTIONS[groupKey];
  return g ? Math.ceil(g.items.length / size) : 0;
}
export function deckSlice(groupKey, deckNo, size) {
  const g = QUESTIONS[groupKey];
  if (!g) return [];
  const start = (deckNo - 1) * size;
  return g.items.slice(start, start + size);
}

export function scenePackCount(size) {
  return Math.ceil(SCENES.length / size);
}
export function scenePackSlice(packNo, size) {
  const start = (packNo - 1) * size;
  return SCENES.slice(start, start + size);
}

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'content', 'lammeh-content.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const excludedGames = new Set([
  'Never Have I Ever',
  'Truth or Dare',
  'Would You Rather',
  'The Story Builder',
  'Charades',
  'Drawing & Guessing',
  'Scavenger Hunt',
  'I\'m Going on a Picnic',
  'Describe It',
  'Blind Man\'s Buff',
  'Most Likely To',
  'The Hot Seat',
  'Paranoia',
  'Who\'s the Leader?',
  'Blackjack (21)',
  'British Bulldog',
  'Red Rover',
  'Punch Buggy',
]);

data.games = data.games.filter((game) => !excludedGames.has(game.en.name));

for (const game of data.games) {
  if (game.en.name === 'Old Maid') {
    game.en.name = 'The Unmatched Card';
    game.ar.name = 'البطاقة المنفردة';
    game.en.how = game.en.how.replace(/old maid/gi, 'unmatched card');
    game.ar.how = game.ar.how.replace(/«العانس»/g, '«البطاقة المنفردة»');
  }
  if (game.en.name === 'Cheat (I Doubt It)') {
    game.en.name = 'I Doubt It';
    game.ar.name = 'لا أصدّقك';
  }
  if (game.en.name === 'Wink Murder') {
    game.en.name = 'The Secret Wink';
    game.ar.name = 'الغمزة السرّية';
    game.en.how = game.en.how.replace(/murderer/gi, 'secret winker').replace(/kill/gi, 'tag out');
    game.ar.how = game.ar.how.replace(/القاتل/g, 'صاحب الغمزة').replace(/يقتل/g, 'يُخرج');
  }
  if (game.en.name === 'Hangman') {
    game.en.name = 'Save the Word';
    game.ar.name = 'أنقذ الكلمة';
  }
  if (game.en.name === 'Skipping Rope Games') {
    game.en.how = game.en.how.replace('calls out dares', 'calls out playful moves');
    game.ar.how = game.ar.how.replace('والتحدّيات', 'والحركات المرحة');
  }
}

data.meta.games = data.games.length;
fs.writeFileSync(file, JSON.stringify(data));
console.log(`Family-safe game guide: ${data.games.length} games`);

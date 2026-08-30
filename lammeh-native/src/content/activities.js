export const ACTIVITIES = [
  {
    key: 'storyCircle', icon: '📚', cat: 'creative',
    ar: { name: 'قصة من جملة واحدة', players: '3 لاعبين فأكثر', duration: '10–15 دقيقة', needs: 'لا تحتاج إلى أدوات', how: 'يبدأ شخص بجملة، ثم يضيف كل مشارك جملة واحدة فقط. استمروا حتى تصل القصة إلى نهاية يتفق عليها الجميع.' },
    en: { name: 'One-Sentence Story', players: '3+ players', duration: '10–15 minutes', needs: 'No supplies', how: 'One person starts with a sentence. Each participant adds exactly one sentence until the group reaches a shared ending.' },
  },
  {
    key: 'secretLeader', icon: '🕵️', cat: 'movement',
    ar: { name: 'القائد الخفي', players: '5 لاعبين فأكثر', duration: '10 دقائق', needs: 'لا تحتاج إلى أدوات', how: 'يخرج لاعب لحظة، ويختار الباقون قائدًا يغيّر حركاته بهدوء ويقلده الجميع. يعود اللاعب ويحاول اكتشاف القائد.' },
    en: { name: 'Secret Leader', players: '5+ players', duration: '10 minutes', needs: 'No supplies', how: 'One player steps away while the group chooses a leader. Everyone copies the leader’s changing motions, and the returning player tries to identify them.' },
  },
  {
    key: 'memoryChain', icon: '🧠', cat: 'calm',
    ar: { name: 'سلسلة الذاكرة', players: '3 لاعبين فأكثر', duration: '5–10 دقائق', needs: 'لا تحتاج إلى أدوات', how: 'يذكر الأول عنصرًا، ويكرره التالي ويضيف عنصرًا جديدًا. تستمر السلسلة ويحاول الجميع تذكرها بالترتيب.' },
    en: { name: 'Memory Chain', players: '3+ players', duration: '5–10 minutes', needs: 'No supplies', how: 'The first person names an item. The next repeats it and adds another. Keep building the sequence in the correct order.' },
  },
  {
    key: 'paperTower', icon: '🏗️', cat: 'cooperative',
    ar: { name: 'برج الورق', players: '2–8 لاعبين', duration: '15 دقيقة', needs: 'أوراق وشريط لاصق اختياري', how: 'ابنوا أعلى برج يمكنه الوقوف وحده باستخدام الأوراق فقط. يمكن اللعب كمجموعة واحدة أو بفريقين.' },
    en: { name: 'Paper Tower', players: '2–8 players', duration: '15 minutes', needs: 'Paper; optional tape', how: 'Build the tallest tower that can stand on its own using only paper. Work as one group or split into two teams.' },
  },
  {
    key: 'describeDraw', icon: '✏️', cat: 'creative',
    ar: { name: 'صف وارسم', players: 'لاعبان فأكثر', duration: '10 دقائق', needs: 'ورق وأقلام', how: 'يرى شخص شكلًا بسيطًا ويصفه دون ذكر اسمه، بينما يرسمه الآخرون. قارنوا الرسومات في النهاية.' },
    en: { name: 'Describe & Draw', players: '2+ players', duration: '10 minutes', needs: 'Paper and pens', how: 'One person sees a simple shape or object and describes it without naming it. Everyone else draws, then compares results.' },
  },
  {
    key: 'observationHunt', icon: '🔎', cat: 'learning',
    ar: { name: 'مهمة الملاحظة', players: '2 لاعبين فأكثر', duration: '10 دقائق', needs: 'المكان من حولكم', how: 'اختاروا صفة مثل: دائري، مصنوع من الخشب، أو يعكس الضوء. ابحثوا عن أكبر عدد من الأمثلة في المكان دون تحريك الأشياء الثقيلة.' },
    en: { name: 'Observation Hunt', players: '2+ players', duration: '10 minutes', needs: 'Your surroundings', how: 'Pick a trait such as round, wooden, or reflective. Find as many examples as possible without moving heavy objects.' },
  },
  {
    key: 'miniResearch', icon: '🔬', cat: 'learning',
    ar: { name: 'باحثون لعشر دقائق', players: '2–10 لاعبين', duration: '15–20 دقيقة', needs: 'هواتف أو كتب للبحث', how: 'اختاروا سؤالًا علميًا واحدًا، وقسّموا البحث بينكم لعشر دقائق، ثم يقدم كل شخص معلومة ومصدرها بكلماته.' },
    en: { name: 'Ten-Minute Researchers', players: '2–10 players', duration: '15–20 minutes', needs: 'Phones or books for research', how: 'Choose one science question, divide the research for ten minutes, then each person shares one finding and its source in their own words.' },
  },
  {
    key: 'silentOrder', icon: '🤫', cat: 'cooperative',
    ar: { name: 'ترتيب بلا كلام', players: '5 لاعبين فأكثر', duration: '5 دقائق', needs: 'مساحة للوقوف', how: 'رتّبوا أنفسكم دون كلام بحسب شهر الميلاد أو الحرف الأول من الاسم. استخدموا الإشارات فقط ثم تحققوا من الترتيب.' },
    en: { name: 'Silent Line-Up', players: '5+ players', duration: '5 minutes', needs: 'Room to stand', how: 'Without speaking, line up by birth month or first-name initial. Use gestures only, then check the final order.' },
  },
  {
    key: 'soundDetective', icon: '👂', cat: 'calm',
    ar: { name: 'محقق الأصوات', players: '3 لاعبين فأكثر', duration: '10 دقائق', needs: 'أغراض آمنة من المكان', how: 'يغمض اللاعب عينيه، ويصدر شخص صوتًا باستخدام غرض آمن. يحاول اللاعب معرفة مصدر الصوت دون لمس أي شخص.' },
    en: { name: 'Sound Detective', players: '3+ players', duration: '10 minutes', needs: 'Safe nearby objects', how: 'The player closes their eyes while someone makes a sound with a safe object. They identify the source without touching anyone.' },
  },
  {
    key: 'kindnessNotes', icon: '💌', cat: 'calm',
    ar: { name: 'رسائل تقدير', players: '3 لاعبين فأكثر', duration: '10 دقائق', needs: 'قصاصات ورق وأقلام', how: 'يكتب كل شخص جملة تقدير صادقة وغير شخصية جدًا لأحد الموجودين. تُجمع الرسائل وتُوزع في نهاية اللمة.' },
    en: { name: 'Appreciation Notes', players: '3+ players', duration: '10 minutes', needs: 'Paper slips and pens', how: 'Each person writes one sincere, not-too-personal note of appreciation for someone present. Collect and hand them out at the end.' },
  },
  {
    key: 'timeCapsule', icon: '🕰️', cat: 'creative',
    ar: { name: 'كبسولة اللمة', players: '2 لاعبين فأكثر', duration: '15 دقيقة', needs: 'ورق وظرف', how: 'اكتبوا توقعًا للمستقبل، شيئًا تعلمتموه، وهدفًا جماعيًا بسيطًا. أغلقوا الظرف وحددوا موعدًا لفتحه.' },
    en: { name: 'Gathering Time Capsule', players: '2+ players', duration: '15 minutes', needs: 'Paper and an envelope', how: 'Write a future prediction, something learned, and one small shared goal. Seal the envelope and choose a date to open it.' },
  },
  {
    key: 'designChallenge', icon: '💡', cat: 'learning',
    ar: { name: 'صمّموا حلًا', players: '3 لاعبين فأكثر', duration: '15 دقيقة', needs: 'ورق وأقلام', how: 'اختاروا مشكلة يومية بسيطة، واقترح كل شخص حلًا. ادمجوا أفضل الأفكار في تصميم جماعي واحد.' },
    en: { name: 'Design a Solution', players: '3+ players', duration: '15 minutes', needs: 'Paper and pens', how: 'Choose a simple everyday problem. Everyone proposes a solution, then combine the strongest ideas into one group design.' },
  },
];

export const ACTIVITY_CATEGORIES = {
  all: { ar: 'الكل', en: 'All' },
  creative: { ar: 'إبداع', en: 'Creative' },
  cooperative: { ar: 'تعاون', en: 'Cooperative' },
  learning: { ar: 'بحث وتعلّم', en: 'Learn' },
  movement: { ar: 'حركة خفيفة', en: 'Light movement' },
  calm: { ar: 'هادئة', en: 'Calm' },
};

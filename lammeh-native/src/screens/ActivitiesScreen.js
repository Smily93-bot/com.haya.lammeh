import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import { ACTIVITIES, ACTIVITY_CATEGORIES } from '../content/activities';

export default function ActivitiesScreen({ lang }) {
  const ar = lang === 'ar';
  const display = { fontFamily: ar ? FONTS.displayAr : FONTS.displayEn };
  const [category, setCategory] = useState('all');
  const [open, setOpen] = useState(null);
  const list = useMemo(() => category === 'all' ? ACTIVITIES : ACTIVITIES.filter((item) => item.cat === category), [category]);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
      <Text style={[styles.head, display]}>{ar ? 'الأنشطة' : 'Activities'}</Text>
      <Text style={styles.sub}>{ar ? 'أنشطة جماعية هادئة أو تعليمية أو إبداعية؛ يمكن تنفيذها دون إحراج أو جرأة.' : 'Calm, educational and creative group activities with no embarrassing or daring prompts.'}</Text>
      <View style={styles.chips}>
        {Object.entries(ACTIVITY_CATEGORIES).map(([key, value]) => <Pressable key={key} style={[styles.chip, category === key && styles.chipOn]} onPress={() => { setCategory(key); setOpen(null); }}><Text style={[styles.chipText, category === key && styles.chipTextOn]}>{value[lang]}</Text></Pressable>)}
      </View>
      {list.map((activity) => {
        const info = activity[lang];
        const expanded = open === activity.key;
        return (
          <Pressable key={activity.key} style={styles.card} onPress={() => setOpen(expanded ? null : activity.key)}>
            <View style={styles.titleRow}><Text style={styles.icon}>{activity.icon}</Text><View style={{ flex: 1 }}><Text style={[styles.name, display]}>{info.name}</Text><Text style={styles.meta}>{info.players} • {info.duration}</Text></View><Text style={styles.expand}>{expanded ? '−' : '+'}</Text></View>
            {expanded && <View style={styles.details}><Text style={styles.label}>{ar ? 'تحتاج' : 'You need'}</Text><Text style={styles.body}>{info.needs}</Text><Text style={[styles.label, { marginTop: 9 }]}>{ar ? 'طريقة النشاط' : 'How to do it'}</Text><Text style={styles.body}>{info.how}</Text></View>}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: COLORS.bg }, wrap: { padding: 16, paddingBottom: 40 }, head: { fontSize: 24, color: COLORS.ink }, sub: { fontSize: 13, color: COLORS.soft, lineHeight: 20, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginVertical: 13 }, chip: { borderRadius: RADIUS.pill, borderWidth: 1, borderColor: COLORS.line2, paddingHorizontal: 12, paddingVertical: 7 }, chipOn: { backgroundColor: '#3F718C', borderColor: '#3F718C' }, chipText: { color: COLORS.ink, fontSize: 12 }, chipTextOn: { color: '#fff' },
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.tile, borderWidth: 1, borderColor: COLORS.line, padding: 14, marginBottom: 9 }, titleRow: { flexDirection: 'row', alignItems: 'center' }, icon: { fontSize: 24, marginEnd: 11 }, name: { color: COLORS.ink, fontSize: 16 }, meta: { color: '#3F718C', fontSize: 11, fontWeight: '700', marginTop: 2 }, expand: { fontSize: 23, color: COLORS.plum, marginStart: 8 },
  details: { borderTopWidth: 1, borderTopColor: COLORS.line, marginTop: 11, paddingTop: 10 }, label: { color: COLORS.terra, fontSize: 11, fontWeight: '700' }, body: { color: COLORS.ink, fontSize: 13, lineHeight: 20, marginTop: 3 },
});

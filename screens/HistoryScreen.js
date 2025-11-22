import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SectionList, RefreshControl, StyleSheet } from 'react-native';
import { loadActivities } from '../utils/storage';
import ActivityItem from '../components/ActivityItem';

function lastNDates(n) {
  const res = [];
  for(let i=0;i<n;i++){
    const d = new Date();
    d.setDate(d.getDate() - i);
    res.push(d.toISOString().slice(0,10));
  }
  return res;
}

export default function HistoryScreen() {
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const all = await loadActivities();
    const dates = lastNDates(7);
    const secs = dates.map(dateStr => {
      const items = all.filter(a => a.dateStr === dateStr).sort((a,b) => new Date(b.time) - new Date(a.time));
      return { title: new Date(dateStr).toDateString(), data: items };
    }).filter(s => s.data.length > 0);
    setSections(secs);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, []);

  return (
    <View style={{flex:1, padding:12}}>
      <Text style={{fontWeight:'700', fontSize:18, marginBottom:8}}>History (last 7 days)</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ActivityItem activity={item} />}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.header}><Text style={styles.headerText}>{title}</Text></View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={{marginTop:20}}>No activities logged in last 7 days.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor:'#f1f4ff', padding:8, borderRadius:6, marginTop:10 },
  headerText: { fontWeight:'700' }
});

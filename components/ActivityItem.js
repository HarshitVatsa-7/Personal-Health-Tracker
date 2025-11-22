import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivityItem({ activity }) {
  // activity: { id, type, value, time, notes, dateStr }
    return (
    <View style={styles.row}>
        <View style={styles.left}>
        <Text style={styles.type}>{activity.type.toUpperCase()}</Text>
        <Text style={styles.notes}>{activity.notes ?? ''}</Text>
        </View>
        <View style={styles.right}>
        <Text style={styles.value}>{activity.value}</Text>
        <Text style={styles.time}>{new Date(activity.time).toLocaleTimeString()}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#eee' },
    left: { flex: 1 },
    right: { alignItems: 'flex-end', width: 100 },
    type: { fontWeight: '700' },
    notes: { color: '#666', fontSize: 12 },
    value: { fontWeight: '700' },
    time: { color: '#777', fontSize: 12 }
});

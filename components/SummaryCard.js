// components/SummaryCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SummaryCard({ title, value, unit, icon, accentColor, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={[styles.icon, { color: accentColor }]}>{icon}</Text>
          <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
        </View>

        <View style={styles.valueRow}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 20,
    marginRight: 6
  },
  title: {
    fontSize: 18,
    fontWeight: '700'
  },
  valueRow: {
    marginTop: 14
  },
  valueText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827'
  },
  unitText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2
  }
});

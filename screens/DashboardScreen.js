// screens/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SummaryCard from '../components/SummaryCard';
import { loadActivities } from '../utils/storage';

const TYPES = { WATER: 'water', STEPS: 'steps', SLEEP: 'sleep' };

const TYPE_CONFIG = {
  water: { label: 'Water Intake', unit: 'glasses', icon: '💧', color: '#059DFF' },
  steps: { label: 'Steps Walked', unit: 'steps', icon: '📈', color: '#F9A826' },
  sleep: { label: 'Sleep Hours', unit: 'hours', icon: '🌙', color: '#6C5CE7' }
};

function startOfDayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  return new Date(y, m, day).toISOString().slice(0, 10);
}

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      load();
    }
  }, [isFocused]);

  async function load() {
    const arr = await loadActivities();
    setActivities(arr);
  }

  function sumToday(type) {
    const todayKey = startOfDayKey();
    const filtered = activities.filter(
      a => a.dateStr === todayKey && a.type === type
    );
    return filtered.reduce((s, a) => s + Number(a.value), 0) || 0;
  }

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerDate}>{today}</Text>
        </View>

        {/* Centered content container (white cards) */}
        <View style={styles.centerContainer}>
          <View style={styles.cardGroup}>
            <SummaryCard
              title={TYPE_CONFIG.water.label}
              value={sumToday(TYPES.WATER)}
              unit={TYPE_CONFIG.water.unit}
              icon={TYPE_CONFIG.water.icon}
              accentColor={TYPE_CONFIG.water.color}
              onPress={() =>
                navigation.navigate('LogActivity', { prefill: TYPES.WATER })
              }
            />
          </View>

          <View style={styles.cardGroup}>
            <SummaryCard
              title={TYPE_CONFIG.steps.label}
              value={sumToday(TYPES.STEPS)}
              unit={TYPE_CONFIG.steps.unit}
              icon={TYPE_CONFIG.steps.icon}
              accentColor={TYPE_CONFIG.steps.color}
              onPress={() =>
                navigation.navigate('LogActivity', { prefill: TYPES.STEPS })
              }
            />
          </View>

          <View style={styles.cardGroup}>
            <SummaryCard
              title={TYPE_CONFIG.sleep.label}
              value={sumToday(TYPES.SLEEP)}
              unit={TYPE_CONFIG.sleep.unit}
              icon={TYPE_CONFIG.sleep.icon}
              accentColor={TYPE_CONFIG.sleep.color}
              onPress={() =>
                navigation.navigate('LogActivity', { prefill: TYPES.SLEEP })
              }
            />
          </View>

          {/* Quick Log Section */}
          <View style={styles.quickSection}>
            <Text style={styles.quickTitle}>Quick Log</Text>

            <View style={styles.quickRow}>
              <TouchableOpacity
                style={styles.quickCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('LogActivity', { prefill: TYPES.WATER })
                }
              >
                <Text style={[styles.quickIcon, { color: TYPE_CONFIG.water.color }]}>
                  {TYPE_CONFIG.water.icon}
                </Text>
                <Text style={styles.quickLabel}>Water</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('LogActivity', { prefill: TYPES.STEPS })
                }
              >
                <Text style={[styles.quickIcon, { color: TYPE_CONFIG.steps.color }]}>
                  {TYPE_CONFIG.steps.icon}
                </Text>
                <Text style={styles.quickLabel}>Steps</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('LogActivity', { prefill: TYPES.SLEEP })
                }
              >
                <Text style={[styles.quickIcon, { color: TYPE_CONFIG.sleep.color }]}>
                  {TYPE_CONFIG.sleep.icon}
                </Text>
                <Text style={styles.quickLabel}>Sleep</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.bottomBtn, styles.bottomPrimary]}
          onPress={() => navigation.navigate('LogActivity')}
          activeOpacity={0.85}
        >
          <Text style={styles.bottomPrimaryText}>+  Log Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomBtn, styles.bottomSecondary]}
          onPress={() => navigation.navigate('History')}
          activeOpacity={0.85}
        >
          <Text style={styles.bottomSecondaryText}>⟲  History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F7FB'
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 120
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 18
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827'
  },
  headerDate: {
    marginTop: 6,
    fontSize: 15,
    color: '#6b7280'
  },
  centerContainer: {
    paddingHorizontal: 24
  },
  cardGroup: {
    marginBottom: 18
  },
  quickSection: {
    marginTop: 10,
    marginBottom: 10
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  quickIcon: {
    fontSize: 20,
    marginBottom: 4
  },
  quickLabel: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500'
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#F5F7FB',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomBtn: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomPrimary: {
    backgroundColor: '#059DFF',
    marginRight: 10
  },
  bottomSecondary: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  bottomPrimaryText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15
  },
  bottomSecondaryText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 15
  }
});

// screens/LogActivityScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { loadActivities, saveActivities } from '../utils/storage';

const TYPE_CONFIG = {
  water: { label: 'Water', icon: '💧', title: 'Water Intake', subtitle: 'Track your daily water activity', placeholder: 'e.g., 8', unitLabel: 'Amount (glasses)' },
  steps: { label: 'Steps', icon: '📈', title: 'Steps Walked', subtitle: 'Track your daily step count', placeholder: 'e.g., 5000', unitLabel: 'Steps walked' },
  sleep: { label: 'Sleep', icon: '🌙', title: 'Sleep Hours', subtitle: 'Track your daily sleep duration', placeholder: 'e.g., 7.5', unitLabel: 'Hours slept' }
};

function dateKey(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    .toISOString()
    .slice(0, 10);
}

export default function LogActivityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialType = route.params?.prefill ?? 'water';

  const [type, setType] = useState(initialType);
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);

  const config = TYPE_CONFIG[type];

  async function onSubmit() {
    if (!type) {
      return Alert.alert('Validation', 'Please choose an activity type.');
    }

    if (value === '' || isNaN(Number(value)) || Number(value) < 0) {
      return Alert.alert('Validation', 'Please enter a valid numeric value.');
    }

    const activities = await loadActivities();
    const now = new Date();
    const newActivity = {
      id: Date.now().toString(),
      type,
      value: Number(value),
      time: now.toISOString(),
      notes,
      dateStr: dateKey(now)
    };

    const updated = [newActivity, ...activities];
    await saveActivities(updated);

    Alert.alert('Saved', 'Activity logged successfully.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Dashboard')
      }
    ]);
  }

  function changeType(nextType) {
    setType(nextType);
    setIsTypeMenuOpen(false);
    setValue('');
  }

  return (
    <View style={styles.root}>
      {/* Top app header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Log Activity</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Center white card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Header inside card */}
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardIcon]}>{config.icon}</Text>
            <View>
              <Text style={styles.cardTitle}>{config.title}</Text>
              <Text style={styles.cardSubtitle}>{config.subtitle}</Text>
            </View>
          </View>

          {/* Activity type dropdown */}
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Activity Type</Text>

            <TouchableOpacity
              style={styles.dropdown}
              activeOpacity={0.8}
              onPress={() => setIsTypeMenuOpen(v => !v)}
            >
              <View style={styles.dropdownLeft}>
                <Text style={styles.dropdownIcon}>{config.icon}</Text>
                <Text style={styles.dropdownText}>{config.label}</Text>
              </View>
              <Text style={styles.dropdownArrow}>{isTypeMenuOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {isTypeMenuOpen && (
              <View style={styles.dropdownMenu}>
                {Object.keys(TYPE_CONFIG).map(key => {
                  const item = TYPE_CONFIG[key];
                  const isSelected = key === type;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.dropdownItem,
                        isSelected && styles.dropdownItemSelected
                      ]}
                      onPress={() => changeType(key)}
                    >
                      <Text style={styles.dropdownIcon}>{item.icon}</Text>
                      <Text
                        style={[
                          styles.dropdownText,
                          isSelected && styles.dropdownTextSelected
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Amount field */}
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>{config.unitLabel}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={config.placeholder}
              value={value}
              onChangeText={setValue}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Notes field */}
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              multiline
              placeholder="Add any additional notes..."
              placeholderTextColor="#9ca3af"
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {/* Buttons in card bottom */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.cardBtn, styles.cancelBtn]}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cardBtn, styles.submitBtn]}
              activeOpacity={0.85}
              onPress={onSubmit}
            >
              <Text style={styles.submitText}>Log Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F7FB'
  },
  topBar: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backArrow: {
    fontSize: 28,
    color: '#111827'
  },
  topTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827'
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  card: {
    width: '90%',
    maxWidth: 700,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  cardIcon: {
    fontSize: 26,
    marginRight: 10
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827'
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2
  },
  fieldBlock: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6
  },
  dropdown: {
    backgroundColor: '#F9FAFB',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownIcon: {
    fontSize: 18,
    marginRight: 6
  },
  dropdownText: {
    fontSize: 15,
    color: '#111827'
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280'
  },
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden'
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  dropdownItemSelected: {
    backgroundColor: '#E0F2FE'
  },
  dropdownTextSelected: {
    fontWeight: '700',
    color: '#0369A1'
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 15,
    color: '#111827'
  },
  notesInput: {
    height: 90,
    textAlignVertical: 'top'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10
  },
  cardBtn: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelBtn: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10
  },
  submitBtn: {
    backgroundColor: '#059DFF'
  },
  cancelText: {
    color: '#111827',
    fontWeight: '600'
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700'
  }
});

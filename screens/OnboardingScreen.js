import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HealthTrack</Text>
      <Text style={styles.subtitle}>Log water, steps, and sleep. Stay healthy, one day at a time.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Dashboard')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:24, backgroundColor:'#f6fbff' },
  title: { fontSize:28, fontWeight:'800', marginBottom:12 },
  subtitle: { textAlign:'center', color:'#444', marginBottom:30, fontSize:16 },
  button: { backgroundColor:'#2f6bed', paddingVertical:12, paddingHorizontal:28, borderRadius:8 },
  buttonText: { color:'#fff', fontWeight:'700' }
});

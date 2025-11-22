import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVITIES_KEY = '@activities_v1';

export async function saveActivities(arr) {
    try {
    await AsyncStorage.setItem(ACTIVITIES_KEY, JSON.stringify(arr));
    } catch (e) {
    console.error('saveActivities error', e);
    }
}

export async function loadActivities() {
    try {
    const raw = await AsyncStorage.getItem(ACTIVITIES_KEY);
    return raw ? JSON.parse(raw) : [];
    } catch (e) {
    console.error('loadActivities error', e);
    return [];
    }
}

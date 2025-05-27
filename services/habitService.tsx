import { Habit } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = 'HABITS';

export const getHabits = async (): Promise<Habit[]> => {
    try {
        const data = await AsyncStorage.getItem(HABITS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading habits:', error);
        return [];
    }
};

export const saveHabits = async (habits: Habit[]): Promise<void> => {
    try {
        const json = JSON.stringify(habits);
        await AsyncStorage.setItem(HABITS_KEY, json);
    } catch (e) {
        console.error('Error saving habits:', e);
        throw e;
    }
};


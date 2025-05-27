import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types';

const HABIT_KEY = 'habit';

export const storeHabits = async (habit: Habit): Promise<void> => {
    await AsyncStorage.setItem(HABIT_KEY, JSON.stringify(habit));
};

export const loadHabits = async (): Promise<Habit[]> => {
    const data = await AsyncStorage.getItem(HABIT_KEY);
    return data ? JSON.parse(data) : [];
};

export const clearHabitStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem(HABIT_KEY);
};

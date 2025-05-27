import { Habit } from '../types';
import { storeHabits, loadHabits } from '../storage/habitStorage';

export const getHabits = async (): Promise<Habit[]> => {
    try {
        return await loadHabits();
    } catch (error) {
        console.error('Error loading habits:', error);
        return [];
    }
};

export const saveHabits = async (habits: Habit[]) => {
    try {
        // Save each habit individually
        for (const habit of habits) {
            await storeHabits(habit);
        }
    } catch (error) {
        console.error('Error saving habits:', error);
        throw error;
    }
};


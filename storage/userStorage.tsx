import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/types';

const USER_KEY = 'user';

export const storeUser = async (user: User): Promise<void> => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const loadUser = async (): Promise<User | null> => {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
};

export const logoutUser = async () => {
    await AsyncStorage.removeItem(USER_KEY);
};
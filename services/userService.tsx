import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';

export const saveUser = async (user: { email: string; password: string }) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

export const getUser = async () => {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error clearing user:', error);
    }
};
export const LogoutUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error logging out user:', error);
    }
};

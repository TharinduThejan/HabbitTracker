import { User } from '../types';
import { storeUser, loadUser, clearUserStorage } from '../storage/userStorage';

export const saveUser = async (user: User): Promise<void> => {
    try {
        await storeUser(user);
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        return await loadUser();
    } catch (error) {
        console.error('Error loading user:', error);
        return null;
    }
};

export const deleteUser = async (): Promise<void> => {
    try {
        await clearUserStorage();
    } catch (error) {
        console.error('Error clearing user storage:', error);
    }
};
export const updateUser = async (user: User): Promise<void> => {
    try {
        const existingUser = await loadUser();
        if (existingUser) {
            const updatedUser = { ...existingUser, ...user };
            await storeUser(updatedUser);
        } else {
            console.warn('No user found to update.');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
export const logoutUser = async (): Promise<void> => {
    try {
        await clearUserStorage();
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
};

import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHabits, saveHabits } from '../services/habitService';
import { LogoutUser } from '../services/userService';
import { Habit } from '../types/types';

export default function HomeScreen() {
    const navigation: any = useNavigation();
    const [habits, setHabits] = useState<Habit[]>([]);

    const loadHabits = async () => {
        const stored = await getHabits();
        setHabits(stored);
    };
    useEffect(() => {
        loadHabits();
    }, []);

    const handleLogout = async () => {
        await LogoutUser();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    // Mark a habit as complete for today
    const markComplete = async (id: string) => {
        const today = new Date().toISOString().split('T')[0];
        const updatedHabits = habits.map(habit =>
            habit.id === id
                ? {
                    ...habit,
                    completion: { ...(habit.completion || {}), [today]: true }
                }
                : habit
        );
        setHabits(updatedHabits);
        await saveHabits(updatedHabits);
        Alert.alert('Habit marked as complete!');
    };

    return (
        <View style={styles.container}>
            <Button title='Add Habit' onPress={() => navigation.navigate('AddHabit')} />
            <Button title='Progress' onPress={() => navigation.navigate('Progress')} />
            <Button title='Logout' onPress={handleLogout} />
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const today = new Date().toISOString().split('T')[0];
                    const done = item.completion?.[today];


                    return (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.name}({item.frequency})</Text>
                            <Text style={styles.itemText}>Status: {done ? '✅ Completed ' : '❌ Not done'}</Text>
                            {!done && (
                                <Button title='Mark Complete' onPress={() => markComplete(item.id)} />
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    habitItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    habitText: {
        fontSize: 18,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});
import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHabits, saveHabits } from '../services/habitService';
import { logoutUser } from '../services/userService';
import { Habit } from '../types';

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
        await logoutUser();
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
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    header: {
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: '#4f8cff',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 8,
        elevation: 2,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 12,
    },
    actionButton: {
        backgroundColor: '#4f8cff',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginRight: 8,
        elevation: 2,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ff4f4f',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        elevation: 2,
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    completedItem: {
        borderLeftWidth: 6,
        borderLeftColor: '#4fdb6b',
        opacity: 0.7,
    },
    incompleteItem: {
        borderLeftWidth: 6,
        borderLeftColor: '#ffb84f',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 2,
    },
    itemFrequency: {
        fontSize: 14,
        color: '#888',
        marginBottom: 2,
    },
    itemStatus: {
        fontSize: 15,
        color: '#555',
        marginBottom: 4,
    },
    completeButton: {
        backgroundColor: '#4fdb6b',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginLeft: 12,
        elevation: 2,
    },
    completeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    emptyText: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 18,
        marginTop: 40,
    },
});

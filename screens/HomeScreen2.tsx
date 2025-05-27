import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHabits, saveHabits } from '../services/habitService';
import { Habit } from '../types/types';
export default function HomeScreen({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {
    const navigation: any = useNavigation();
    const [habits, setHabits] = useState<Habit[]>([]);

    const loadHabits = async () => {
        const stored = await getHabits();
        setHabits(stored);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadHabits);
        return unsubscribe;
    }, [navigation]);

    const handleLogout = async () => {
        setIsLoggedIn(false);
    };


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
        Alert.alert('Great!', 'Habit marked as complete 🎉');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🌱 Habit Tracker</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddHabit')}>
                        <Text style={styles.headerButtonText}>+ Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Progress')}>
                        <Text style={styles.headerButtonText}>📊 Progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={() => handleLogout()}>
                        <Text style={styles.headerButtonText}>🚪 Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.habitList}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No habits yet. Add one to get started!</Text>
                }
                renderItem={({ item }) => {
                    const today = new Date().toISOString().split('T')[0];
                    const done = item.completion?.[today];

                    return (
                        <View style={styles.card}>
                            <Text style={styles.habitName}>{item.name}</Text>
                            <Text style={styles.habitFrequency}>Frequency: {item.frequency.toUpperCase()}</Text>
                            <Text style={[styles.habitStatus, { color: done ? '#4CAF50' : '#E53935' }]}>
                                {done ? '✅ Completed Today' : '❌ Not Done Yet'}
                            </Text>
                            {!done && (
                                <TouchableOpacity
                                    style={styles.completeButton}
                                    onPress={() => markComplete(item.id)}
                                >
                                    <Text style={styles.completeButtonText}>Mark Complete</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    header: {
        padding: 16,
        backgroundColor: '#4f8cff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        elevation: 2,
    },
    headerButtonText: {
        color: '#4f8cff',
        fontWeight: '600',
    },
    habitList: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    habitName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    habitFrequency: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    habitStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    completeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#777',
        fontSize: 16,
    },
});

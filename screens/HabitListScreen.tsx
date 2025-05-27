import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getHabits, saveHabits } from '../services/habitService';
import { Habit } from '../types/types';

const HabitListScreen = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const loadHabits = async () => {
        const data = await getHabits();
        setHabits(data);
    };
    useEffect(() => {
        loadHabits();
    }, []);
    const markCompleted = async (habitId: string) => {
        const today = new Date().toISOString().split('T')[0];
        const updated = habits.map(h => {
            if (h.id === habitId && !h.completedDates.includes(today)) {
                h.completedDates.push(today);
            }
            return h;
        }
        );
        await saveHabits(updated);
        setHabits(updated);
    };
    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                const today = new Date().toISOString().split('T')[0];
                const isDone = item.completedDates.includes(today);
                return (
                    <View style={styles.item}>
                        <Text>{item.name} - {item.frequency}</Text>
                        <Text>Status: {isDone ? 'Completed' : 'Pending'}</Text>
                        {!isDone && <Button title="Mark Done" onPress={() => markCompleted(item.id)} />}


                        <Text style={{ textDecorationLine: isDone ? 'line-through' : 'none' }}>
                            {item.name}
                        </Text>
                        <Button
                            title={isDone ? 'Completed' : 'Mark as Done'}
                            onPress={() => markCompleted(item.id)}
                            disabled={isDone}
                        />
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});
export default HabitListScreen;

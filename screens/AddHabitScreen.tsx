import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHabits, saveHabits } from '../services/habitService';
import { Habit } from '../types';

export default function AddHabitScreen() {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');


    const saveHabit = async () => {
        if (!name) {
            return;
        }
        const existing = await getHabits();
        const newHabit: Habit = {
            id: Date.now().toString(),
            name,
            title: name,
            frequency,
            completion: {},
        };
        await saveHabits([...existing, newHabit]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Habit</Text>
            <TextInput
                style={styles.input}
                placeholder="Habit Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Frequency (daily/weekly)"
                value={frequency}
                onChangeText={(text) => setFrequency(text as 'daily' | 'weekly')}
            />
            <Button title="Save Habit" onPress={saveHabit} />
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getHabits, saveHabits } from '../services/habitService';
import { Habit } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const AddHabitScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
    const [loading, setLoading] = useState(false);


    const handleAddHabit = async () => {
        if (!name) {
            Alert.alert('Validation', 'Please enter habit name');
            return;
        }
        setLoading(true);
        try {
            const oldHabits = await getHabits();
            const newHabit: Habit = {
                id: uuidv4(),
                name,
                frequency,
                completedDates: [],
            };

            await saveHabits([...oldHabits, newHabit]);
            Alert.alert('Success', 'Habit added!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add habit.');
            console.error(error);
        } finally {
            setLoading(false);
        }
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
            <View style={styles.frequencyRow}>
                {['daily', 'weekly'].map((freq) => (
                    <TouchableOpacity
                        key={freq}
                        onPress={() => setFrequency(freq as 'daily' | 'weekly')}
                        style={[
                            styles.frequencyButton,
                            frequency === freq && styles.frequencyButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.frequencyButtonText,
                                frequency === freq && styles.frequencyButtonTextActive,
                            ]}
                        >
                            {freq.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4f8cff" />
            ) : (
                <Button title="Save Habit" onPress={handleAddHabit} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f6fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4f8cff',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    frequencyRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    frequencyButton: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#e0e7ff',
        marginHorizontal: 8,
    },
    frequencyButtonActive: {
        backgroundColor: '#4f8cff',
    },
    frequencyButtonText: {
        color: '#4f8cff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    frequencyButtonTextActive: {
        color: '#fff',
    },
});

export default AddHabitScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { getHabits } from '../services/habitService';

const ProgressScreen = () => {
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        const loadProgress = async () => {
            const habits = await getHabits();
            const today = new Date().toISOString().split('T')[0];
            const total = habits.length;
            const completed = habits.filter(h => h.completedDates.includes(today)).length;
            setPercent(total > 0 ? Math.round((completed / total) * 100) : 0);
        };
        loadProgress();
    }
        , []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../loginwall.jpg')}
                style={styles.background}
                resizeMode="cover"
                blurRadius={2}
            >
                <Text style={styles.title}>Progress</Text>
                <View style={styles.progressCircleContainer}>
                    <View style={styles.progressCircle}>
                        <Text style={styles.progressCircleText}>{percent}%</Text>
                    </View>
                </View>
                <Text style={styles.progressText}>Today's Completion Rate: {percent}%</Text>
            </ImageBackground>
        </View>
    );
};
export default ProgressScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 16,
        backgroundColor: '#f5f6fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#fff',
        letterSpacing: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircleContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    progressCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#4f8cff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    progressCircleText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    progressText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
});
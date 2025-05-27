import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeUser } from '../storage/userStorage';
import { User } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen() {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        if (name && email && password) {
            try {
                const user = { id: Date.now().toString(), name, email, password };
                console.log('Saving user:', user);
                await storeUser(user);
                const savedData = await AsyncStorage.getItem('user');
                console.log('Data in AsyncStorage:', savedData);
                console.log('User saved:', user);
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } catch (error) {
                Alert.alert('Registration error', 'An error occurred during registration.');
            }
        } else {
            Alert.alert('Alert', 'Please fill in all fields');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={register} />
            <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
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
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
});

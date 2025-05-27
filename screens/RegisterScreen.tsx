import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { saveUser } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function RegisterScreen() {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        if (name && email && password) {
            try {
                await saveUser({ id: Date.now().toString(), name, email, password });
                // @ts-ignore
                navigation.navigate('Home');
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
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
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
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});






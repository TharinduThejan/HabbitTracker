import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { getUser } from '../services/userService';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const storedUser = await getUser();
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                // @ts-ignore
                navigation.navigate("Home");
            } else {
                Alert.alert('Invalid credentials');
            }
        } catch (error) {
            Alert.alert('Login error', 'An error occurred during login.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button title="Login" onPress={login} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const styles = StyleSheet.create({
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


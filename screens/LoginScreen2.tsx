import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadUser } from '../storage/userStorage';

export default function LoginScreen({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const storedUser = await loadUser();

            console.log('Stored user:', storedUser);
            console.log('Entered email:', email);
            console.log('Entered password:', password);

            if (
                storedUser &&
                storedUser.email.toLowerCase() === email.trim().toLowerCase() &&
                storedUser.password === password.trim()
            ) {
                setIsLoggedIn(true); // This will cause App.tsx to render the Home stack
            } else {
                console.log('Showing invalid credentials alert');
                Alert.alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login error', 'An error occurred during login.');
        }
    };

    return (
        <ImageBackground
            source={require('../loginwall.jpg')}
            style={styles.background}
            resizeMode="cover"
            blurRadius={2}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
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
                <View style={styles.button}>
                    <Button title="Login" onPress={login} />
                </View>
                <View style={styles.button}>
                    <Button title="Register" onPress={() => navigation.navigate('Register')} />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    button: {
        marginVertical: 8,
    },
});

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeUser } from '../storage/userStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


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
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                );
            } catch (error) {
                Alert.alert('Registration error', 'An error occurred during registration.');
            }
        } else {
            Alert.alert('Alert', 'Please fill in all fields');
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../loginwall.jpg')}
                style={styles.background}
                resizeMode="cover"
                blurRadius={2}
            >
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
                <View style={styles.btn}>
                    <Button title="Register" onPress={register} />
                </View>
                <View style={styles.btn}>
                    <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // padding: 16,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        width: '90%',
        alignSelf: 'center',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    btn: {
        margin: 8,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 6,
    },
});

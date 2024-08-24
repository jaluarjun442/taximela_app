import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('9974920457');
    const [password, setPassword] = useState('9974920457');

    const handleLogin = () => {
        // Basic validation
        if (!mobileNumber || !password) {
            Alert.alert('Error', 'Please enter both mobile number and password.');
            return;
        }

        // Log mobile number and password to console
        console.log('Mobile Number:', mobileNumber);
        console.log('Password:', password);

        // Navigate to the next screen
        navigation.replace('AppTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    keyboardType="numeric"
                    maxLength={10}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9', // Background color for better contrast
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
        textAlign: 'center',
        width: '100%',
        color: '#333',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%', // Full width input
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10, // Margin between input fields
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, // Subtle shadow effect
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#fff', // Input background color for better readability
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%', // Full width button
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

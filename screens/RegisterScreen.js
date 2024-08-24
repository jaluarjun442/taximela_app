import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function RegisterScreen({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('9974920457');
    const [password, setPassword] = useState('9974920457');
    const [name, setName] = useState('Arjun');
    const [businessName, setBusinessName] = useState('Arjun Taxi');

    const handleRegister = () => {
        // Basic validation
        if (!mobileNumber || !password || !name || !businessName) {
            Alert.alert('Validation Error', 'Please fill out all fields.');
            return;
        }

        // Log input values to console
        console.log('Mobile Number:', mobileNumber);
        console.log('Password:', password);
        console.log('Name:', name);
        console.log('Business Name:', businessName);

        // Navigate to the Login screen
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Business Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your business name"
                value={businessName}
                onChangeText={setBusinessName}
            />
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your mobile number"
                    keyboardType="numeric"
                    maxLength={10}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Back To Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
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
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        width: '100%',
        marginBottom: 4,
        fontSize: 16,
        color: '#333',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: '#fff', // Input background color for better readability
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

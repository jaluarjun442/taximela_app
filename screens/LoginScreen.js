// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../screens/Loader'; // Adjust path based on your folder structure

export default function LoginScreen({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('9974920457');
    const [otp, setOtp] = useState('1234');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    navigation.replace('AppTabs');
                }
            } catch (error) {
                console.error('Failed to retrieve token:', error);
            }
        };
        checkToken();
    }, []);

    useEffect(() => {
        let timer;
        if (isDisabled) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setIsDisabled(false);
                        return 30;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isDisabled]);

    const handleSendOtp = async () => {
        if (!mobileNumber) {
            Alert.alert('Error', 'Please enter your mobile number.');
            return;
        }
        if (isDisabled) {
            Alert.alert('Error', 'Please wait before requesting a new OTP.');
            return;
        }
        setIsSendingOtp(true);
        try {
            const response = await fetch('https://clam-comic-noticeably.ngrok-free.app/taximela/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: mobileNumber }),
            });
            const result = await response.json();
            if (result.success) {
                setIsOtpSent(true);
                setIsDisabled(true); // Start the timer
                setSuccessMessage('OTP has been sent successfully!');
                setError('');
            } else {
                setSuccessMessage('');
                setError(result.message || 'Failed to send OTP.');
            }
        } catch (error) {
            console.error('Failed to send OTP:', error);
            setSuccessMessage('');
            setError('An error occurred while sending OTP.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleLogin = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP.');
            return;
        }
        setSuccessMessage('');
        setError('');
        setIsLoggingIn(true);
        try {
            const response = await fetch('https://clam-comic-noticeably.ngrok-free.app/taximela/api/login_verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: mobileNumber, otp }),
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.setItem('token', result.data.token);
                await AsyncStorage.setItem('is_profile_set', result.data.is_profile_set);
                navigation.replace('AppTabs');
            } else {
                setError(result.message || 'Failed to login.');
            }
        } catch (error) {
            console.error('Failed to login:', error);
            setError('An error occurred while logging in.');
        } finally {
            setIsLoggingIn(false);
        }
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
                    editable={!isDisabled}
                />
                <TouchableOpacity
                    style={[styles.button, (isSendingOtp || isDisabled) && styles.buttonDisabled]}
                    onPress={handleSendOtp}
                    disabled={isSendingOtp || isDisabled}
                >
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
                {successMessage ? (
                    <Text style={styles.successText}>{successMessage}</Text>
                ) : null}
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}
                {isDisabled && (
                    <Text style={styles.timerText}>
                        {`Resend OTP in ${countdown} seconds`}
                    </Text>
                )}
                {isOtpSent && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            keyboardType="numeric"
                            maxLength={6}
                            value={otp}
                            onChangeText={setOtp}
                        />
                        <TouchableOpacity
                            style={[styles.button, isLoggingIn && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoggingIn}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <Loader visible={isSendingOtp || isLoggingIn} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
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
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    timerText: {
        marginTop: 10,
        color: '#ff0000',
        fontSize: 14,
    },
    errorText: {
        marginBottom: 10,
        color: '#ff0000',
        fontSize: 14,
        textAlign: 'center',
    },
    successText: {
        marginBottom: 10,
        color: '#28a745',
        fontSize: 14,
        textAlign: 'center',
    },
});

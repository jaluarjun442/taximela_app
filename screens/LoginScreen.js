import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('9974920457');
    const [otp, setOtp] = useState('1234');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);

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

    const handleSendOtp = () => {
        if (!mobileNumber) {
            Alert.alert('Error', 'Please enter your mobile number.');
            return;
        }
        console.log('Sending OTP to:', mobileNumber);
        setIsOtpSent(true);
        setIsDisabled(true);
    };

    const handleLogin = () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP.');
            return;
        }
        console.log('Verifying OTP:', otp);
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
                    editable={!isDisabled}
                />
                <TouchableOpacity
                    style={[styles.button, isDisabled && styles.buttonDisabled]}
                    onPress={handleSendOtp}
                    disabled={isDisabled}
                >
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
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
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </>
                )}
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
});

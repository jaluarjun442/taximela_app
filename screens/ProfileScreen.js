import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('is_profile_set');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Failed to logout:', error);
            Alert.alert('Error', 'An error occurred while logging out.');
        }
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Profile Screen</Text> */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PremiumPlans')}>
                <Text style={styles.buttonText}>Premium Plans</Text>
                <Icon name="chevron-forward" size={20} color="#fff" style={styles.arrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.buttonText}>Edit Profile</Text>
                <Icon name="chevron-forward" size={20} color="#fff" style={styles.arrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AccountVerification')}>
                <Text style={styles.buttonText}>Account Verification</Text>
                <Icon name="chevron-forward" size={20} color="#fff" style={styles.arrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactUs')}>
                <Text style={styles.buttonText}>Contact Us</Text>
                <Icon name="chevron-forward" size={20} color="#fff" style={styles.arrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
                <Icon name="chevron-forward" size={20} color="#fff" style={styles.arrow} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Original background color
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF', // Blue background for buttons
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff', // White text for buttons
    },
    arrow: {
        marginLeft: 10,
    },
});

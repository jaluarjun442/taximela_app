import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const Loader = ({ visible }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
        >
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default Loader;

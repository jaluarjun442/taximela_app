import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const data = [
    {
        id: '1',
        from: 'Rajkot',
        to: 'Ahmedabad',
        date: '24 August',
        time: '11:30 AM',
        vehicle: 'SUV',
        tripType: 'One Way Trip',
        price: '3,000',
        userName: 'Vaghabhai Sindhav',
        status: 'active',
    },
    {
        id: '2',
        from: 'Gandhinagar',
        to: 'Gandhinagar',
        date: '24 August',
        time: '12:00 PM',
        vehicle: 'SUV',
        tripType: 'Round Trip',
        price: '8,000',
        userName: 'By Premium User',
        status: 'done',
    },
    {
        id: '3',
        from: 'Surat',
        to: 'Vadodara',
        date: '25 August',
        time: '09:00 AM',
        vehicle: 'Sedan',
        tripType: 'One Way Trip',
        price: '4,500',
        userName: 'Ramesh Patel',
        status: 'active',
    },
    {
        id: '4',
        from: 'Bhavnagar',
        to: 'Junagadh',
        date: '25 August',
        time: '10:30 AM',
        vehicle: 'Hatchback',
        tripType: 'Round Trip',
        price: '7,200',
        userName: 'Anita Shah',
        status: 'done',
    },
];

const HomeScreen = () => {
    const renderCard = ({ item }) => {
        return (
            <View style={styles.card}>
                {item.status === 'done' && (
                    <View style={styles.completedOverlay}>
                        <Text style={styles.completedText}>TRIP DONE</Text>
                    </View>
                )}
                <View style={[styles.cardContent, item.status === 'done' && styles.completedCard]}>
                    <View style={styles.cardHeader}>
                        <View style={styles.locationColumn}>
                            <View style={styles.locationRow}>
                                <MaterialIcons name="location-on" size={16} color="blue" />
                                <View style={styles.locationTextContainer}>
                                    <Text style={styles.cityText}>{item.from}</Text>
                                    <Text style={styles.subText}>Gujarat</Text>
                                </View>
                            </View>
                            <View style={styles.locationRow}>
                                <MaterialIcons name="location-on" size={16} color="blue" />
                                <View style={styles.locationTextContainer}>
                                    <Text style={styles.cityText}>{item.to}</Text>
                                    <Text style={styles.subText}>Gujarat</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dateColumn}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            <Text style={styles.timeText}>{item.time}</Text>
                        </View>
                    </View>

                    <View style={styles.cardBody}>
                        <View style={styles.row}>
                            <MaterialIcons name="directions-car" size={16} color="black" />
                            <Text style={styles.boldText}>{item.vehicle}</Text>
                        </View>
                        {item.tripType === 'One Way Trip' && (
                            <View style={styles.tripTypeRow}>
                                <MaterialIcons name="arrow-forward" size={16} color="black" />
                                <Text style={styles.tripTypeText}>{item.tripType}</Text>
                            </View>
                        )}
                        {item.tripType === 'Round Trip' && (
                            <View style={styles.tripTypeRow}>
                                <MaterialIcons name="arrow-back" size={8} color="black" />
                                <MaterialIcons name="arrow-forward" size={8} color="black" />
                                <Text style={styles.tripTypeText}>{item.tripType}</Text>
                            </View>
                        )}
                        <View style={styles.row}>
                            <FontAwesome name="rupee" size={16} color="black" />
                            <Text style={styles.priceText}>{item.price}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.userName}>{item.userName}</Text>
                            <Text style={styles.timeAgo}>3 minutes ago</Text>
                        </View>
                        {item.status === 'active' ? (
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.button}>
                                    <MaterialIcons name="call" size={16} color="#007BFF" />
                                    <Text style={styles.buttonText}>Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <FontAwesome name="whatsapp" size={16} color="#007BFF" />
                                    <Text style={styles.buttonText}>Whatsapp</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <MaterialIcons name="person" size={16} color="#007BFF" />
                                    <Text style={styles.buttonText}>User Detail</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        position: 'relative',
    },
    cardContent: {
        opacity: 1, // Default opacity for active cards
    },
    completedCard: {
        opacity: 0.5, // Make the card semi-transparent for completed trips
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    locationColumn: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationTextContainer: {
        marginLeft: 8,
    },
    dateColumn: {
        flex: 1,
        alignItems: 'flex-end',
    },
    cityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    subText: {
        fontSize: 14,
        color: '#888',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    timeText: {
        fontSize: 14,
        color: '#007BFF',
    },
    cardBody: {
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 8,
    },
    tripTypeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 8,
    },
    tripTypeText: {
        marginLeft: 8,
        color: '#888',
    },
    priceText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    timeAgo: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    buttonText: {
        color: '#007BFF',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    completedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        zIndex: 1,
    },
    completedText: {
        color: '#007BFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeScreen;

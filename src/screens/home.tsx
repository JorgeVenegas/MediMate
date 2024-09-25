import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View style={styles.gridContainer}>
            {/* First row */}
            <View style={styles.row}>
                {/* First cell with a card */}
                <View style={styles.cell}>
                    <View style={styles.card}>
                        <Text>Card 1</Text>
                    </View>
                </View>

                {/* Second cell with a card */}
                <View style={styles.cell}>
                    <View style={styles.card}>
                        <Text>Card 2</Text>
                    </View>
                </View>
            </View>

            {/* Second row */}
            <View style={styles.row}>
                {/* Third cell with a card */}
                <View style={styles.cell}>
                    <View style={styles.card}>
                        <Text>Card 3</Text>
                    </View>
                </View>

                {/* Fourth cell with a card */}
                <View style={styles.cell}>
                    <View style={styles.card}>
                        <Text>Card 4</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    gridContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    cell: {
        flex: 1,
        marginHorizontal: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#D3D3D3', // Grayish background
        borderRadius: 10, // Rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default Home;
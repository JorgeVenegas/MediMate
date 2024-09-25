import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const FrequencyDropdown = ({ line, selectedValue, onValueChange }) => {
    const data = [
        { "id": 1, "frecuencia": "Cada 8 horas" },
        { "id": 2, "frecuencia": "Cada 12 horas" },
        { "id": 3, "frecuencia": "Cada 24 horas" },
        { "id": 4, "frecuencia": "Cada 48 horas" },
        { "id": 5, "frecuencia": "Cada 72 horas" },
    ];

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.frecuencia}</Text>
            </View>
        );
    };

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="frecuencia"
            valueField="id"
            placeholder="Seleciona frecuencia."
            searchPlaceholder="Busca..."
            value={selectedValue}
            onChange={item => {
                onValueChange(line - 1, item.id);
            }}
            renderItem={renderItem}
        />
    );
};

export default FrequencyDropdown;

const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        maxHeight: 50,
        minWidth: 100,
        flex: 1,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
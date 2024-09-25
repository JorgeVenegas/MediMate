import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const MedicineDropdown = ({ line, selectedValue, onValueChange}) => {
    const data = [
        { "id": 1, "nombre": "Paracetamol" },
        { "id": 2, "nombre": "Ibuprofeno" },
        { "id": 3, "nombre": "Amoxicilina" },
        { "id": 4, "nombre": "Ciprofloxacino" },
        { "id": 5, "nombre": "Omeprazol" },
        { "id": 6, "nombre": "Metformina" },
        { "id": 7, "nombre": "Loratadina" },
        { "id": 8, "nombre": "Atorvastatina" },
        { "id": 9, "nombre": "Enalapril" },
        { "id": 10, "nombre": "Captopril" },
        { "id": 11, "nombre": "Diclofenaco" },
        { "id": 12, "nombre": "Ranitidina" },
        { "id": 13, "nombre": "Dexametasona" },
        { "id": 14, "nombre": "Clonazepam" },
        { "id": 15, "nombre": "Salbutamol" },
        { "id": 16, "nombre": "Dipirona" },
        { "id": 17, "nombre": "Losartan" },
        { "id": 18, "nombre": "Fluconazol" },
        { "id": 19, "nombre": "Hidroclorotiazida" },
        { "id": 20, "nombre": "Naproxeno" },
        { "id": 21, "nombre": "Simvastatina" },
        { "id": 22, "nombre": "Furosemida" },
        { "id": 23, "nombre": "Diazepam" },
        { "id": 24, "nombre": "Cetirizina" },
        { "id": 25, "nombre": "Metronidazol" },
        { "id": 26, "nombre": "Prednisona" },
        { "id": 27, "nombre": "Itraconazol" },
        { "id": 28, "nombre": "Clorfenamina" },
        { "id": 29, "nombre": "Pantoprazol" },
        { "id": 30, "nombre": "Lansoprazol" },
        { "id": 31, "nombre": "Fluoxetina" },
        { "id": 32, "nombre": "Tamsulosina" },
        { "id": 33, "nombre": "Ceftriaxona" },
        { "id": 34, "nombre": "Tramadol" },
        { "id": 35, "nombre": "Levofloxacino" },
        { "id": 36, "nombre": "Lisinopril" },
        { "id": 37, "nombre": "Ondansetron" },
        { "id": 38, "nombre": "Azitromicina" },
        { "id": 39, "nombre": "Fenilefrina" },
        { "id": 40, "nombre": "Guaifenesina" },
        { "id": 41, "nombre": "Vitamina C" },
        { "id": 42, "nombre": "Sildenafil" },
        { "id": 43, "nombre": "Fenobarbital" },
        { "id": 44, "nombre": "Levonorgestrel" },
        { "id": 45, "nombre": "Metoclopramida" },
        { "id": 46, "nombre": "Fenitoina" },
        { "id": 47, "nombre": "Eritromicina" },
        { "id": 48, "nombre": "Metoprolol" },
        { "id": 49, "nombre": "Desloratadina" },
        { "id": 50, "nombre": "Mebendazol" },
        { "id": 51, "nombre": "Fluconazol" },
        { "id": 52, "nombre": "Levodropropizina" },
        { "id": 53, "nombre": "Naproxeno con Paracetamol" },
        { "id": 54, "nombre": "Risperidona" },
        { "id": 55, "nombre": "Escitalopram" },
        { "id": 56, "nombre": "Sertralina" },
        { "id": 57, "nombre": "Ciclobenzaprina" },
        { "id": 58, "nombre": "Hioscina" },
        { "id": 59, "nombre": "Sulfato Ferroso" },
        { "id": 60, "nombre": "Desvenlafaxina" },
        { "id": 61, "nombre": "Metilfenidato" },
        { "id": 62, "nombre": "Fentanilo" },
        { "id": 63, "nombre": "Midazolam" },
        { "id": 64, "nombre": "Oxcarbazepina" },
        { "id": 65, "nombre": "Gabapentina" },
        { "id": 66, "nombre": "Latanoprost" },
        { "id": 67, "nombre": "Piroxicam" },
        { "id": 68, "nombre": "Rabeprazol" },
        { "id": 69, "nombre": "Sulfametoxazol con Trimetoprima" },
        { "id": 70, "nombre": "Hidroxocobalamina" },
        { "id": 71, "nombre": "Rosuvastatina" },
        { "id": 72, "nombre": "Citalopram" },
        { "id": 73, "nombre": "Bromazepam" },
        { "id": 74, "nombre": "Quetiapina" },
        { "id": 75, "nombre": "Duloxetina" },
        { "id": 76, "nombre": "Saxagliptina" },
        { "id": 77, "nombre": "Sitagliptina" },
        { "id": 78, "nombre": "Dapagliflozina" },
        { "id": 79, "nombre": "Linagliptina" },
        { "id": 80, "nombre": "Empagliflozina" },
        { "id": 81, "nombre": "Glibenclamida" },
        { "id": 82, "nombre": "Glimepirida" },
        { "id": 83, "nombre": "Gliclazida" },
        { "id": 84, "nombre": "Metformina con Glibenclamida" },
        { "id": 85, "nombre": "Metformina con Vildagliptina" },
        { "id": 86, "nombre": "Insulina Glargina" },
        { "id": 87, "nombre": "Insulina Lispro" },
        { "id": 88, "nombre": "Insulina Humana Regular" },
        { "id": 89, "nombre": "Insulina Humana NPH" },
        { "id": 90, "nombre": "Levotiroxina" },
        { "id": 91, "nombre": "Ciproheptadina" },
        { "id": 92, "nombre": "Trimetoprima con Sulfametoxazol" },
        { "id": 93, "nombre": "Terbinafina" },
        { "id": 94, "nombre": "Metformina con Sitagliptina" },
        { "id": 95, "nombre": "Metformina con Pioglitazona" },
        { "id": 96, "nombre": "Metformina con Glibenclamida y Pioglitazona" },
        { "id": 97, "nombre": "Metformina con Glimepirida" },
        { "id": 98, "nombre": "Metformina con Glimepirida y Pioglitazona" },
        { "id": 99, "nombre": "Budesonida" }
    ]

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.nombre}</Text>
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
            labelField="nombre"
            valueField="id"
            placeholder="Seleciona medicamento"
            searchPlaceholder="Busca..."
            value={selectedValue}
            onChange={item => {
                onValueChange(line - 1, item.id);
            }}
            renderItem={renderItem}
        />
    );
};

export default MedicineDropdown;

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
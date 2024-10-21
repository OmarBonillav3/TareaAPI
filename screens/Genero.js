import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Genero() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState(null);
    const [iconColor, setIconColor] = useState('#FF6500'); // Color inicial del icono

    // Función para predecir el género
    const predictGender = async () => {
        if (!name) {
            Alert.alert('Error', 'Por favor, ingresa un nombre.');
            return;
        }

        try {
            const response = await fetch(`https://api.genderize.io/?name=${name}`);
            const data = await response.json();
            setGender(data.gender);

            // Cambiar el color del icono basado en el género
            if (data.gender === 'male') {
                setIconColor('#1E90FF'); // Azul para masculino
            } else if (data.gender === 'female') {
                setIconColor('#FF69B4'); // Rosa para femenino
            } else {
                setIconColor('#FF6500'); // Naranja si no se puede determinar
            }
        } catch (error) {
            console.error('Error al obtener el género:', error);
            Alert.alert('Error', 'No se pudo obtener el género.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.title}>¿Qué género es tu nombre?</Text>
            <Text style={styles.subtitle}>
                Escribe tu nombre para saber qué género es
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa un nombre"
                value={name}
                onChangeText={setName}
                borderBottomColor={"#E2DFDF"}
                borderLeftColor={"#E2DFDF"}
                borderRightColor={"#E2DFDF"}
                borderTopColor={"#E2DFDF"}
            />

            <Text style={styles.infoText}>
                Según el color del icono es tu género, así que presiónalo y veamos qué género es tu nombre
            </Text>
            <TouchableOpacity onPress={predictGender}>
                <Icon name="gender-male-female" style={{ fontSize: 50, color: iconColor }} />
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF9F2',
    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 24,
    },
    subtitle: {
        fontSize: 12,
        alignSelf: 'center',
        marginHorizontal: 16,
        fontFamily: 'OpenSansRegular',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
        width: '80%',
        paddingHorizontal: 16,
    },
    infoText: {
        fontSize: 12,
        fontFamily: 'OpenSansRegular',
        textAlign: 'center',
        marginHorizontal: 16,
        marginBottom: 60,
        marginTop: 4,
    },
});

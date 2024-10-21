import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function Edad() {
    const [name, setName] = useState('');
    const [ageData, setAgeData] = useState(null);

    // Función para obtener la edad
    const fetchAge = async () => {
        if (!name) {
            Alert.alert('Error', 'Por favor, ingresa un nombre.');
            return;
        }

        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`);
            const data = await response.json();
            setAgeData(data);
        } catch (error) {
            console.error('Error al obtener la edad:', error);
            Alert.alert('Error', 'No se pudo obtener la edad.');
        }
    };

    // Determinar el estado según la edad
    const getStatusMessage = () => {
        if (ageData.age < 30) {
            return { message: 'Joven', image: require('../assets/img/young.png') }; 
        } else if (ageData.age < 60) {
            return { message: 'Adulto', image: require('../assets/img/adult.png') }; 
        } else {
            return { message: 'Anciano', image: require('../assets/img/elderly.png') }; 
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.title}>¿Que edad tienes segun tu nombre?</Text>
            <Text style={{fontSize:12, 
                fontFamily:'OpenSansRegular', 
                textAlign:'center', 
                marginHorizontal:16,
                marginTop:10,
                marginBottom:20,
            }}>Facil solo escribe tu nombre y descubre tu edad segun tu nombre</Text>

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
            <TouchableOpacity 
                onPress={fetchAge} 
                style={{
                    backgroundColor:'#FF6500', 
                    paddingHorizontal:20,
                    paddingVertical:5, 
                    borderRadius:10
                }}>
                <Text style={{fontSize:16, fontFamily:'OpenSansBold'}}>Ver</Text>
            </TouchableOpacity>


            {ageData && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        La edad estimada es: {ageData.age} años.
                    </Text>
                    <Text style={styles.statusText}>{getStatusMessage().message}</Text>
                    <Image source={getStatusMessage().image} style={styles.image} />
                </View>
            )}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF7F0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 24,
        marginHorizontal:16,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
        width: '80%',
        paddingHorizontal: 16,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
    },
    statusText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

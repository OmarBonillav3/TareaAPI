import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

export default function Clima () {

        // Constantes para la API del Clima
        const [weatherData, setWeatherData] = useState(null);
        const city = 'Republica Dominicana';

        // Función para obtener el clima usando la API de WeatherAPI
        const fetchWeather = async () => {
        const apiKey = '159fdff474c64b408fb175921242110'; // Coloca aquí tu API Key de WeatherAPI
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error al obtener el clima:', error);
        }
    };
        // Llamar a la función de clima al cargar el componente
        useEffect(() => {
        fetchWeather();
    }, []);


    return (
        <View style={styles.container}>
            {/*Agregando vista del Clima en RD */}
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10, marginLeft: 16 }}>
                <Text style={{ fontFamily: 'OpenSansSemiBold', color: '#000000', fontSize:16 }}>Clima en República Dominicana</Text>
                <MaterialIcons name="cloud" style={{ fontSize: 20, color: '#FF6500', marginLeft: 4 }} />
            </View>

            {/* Contenido del clima */}
            {weatherData ? (
                <View style={styles.weatherContainer}>
                    <Text style={styles.weatherText}>
                        Temperatura: {weatherData.current.temp_c}°C
                    </Text>
                    <Text style={styles.weatherText}>
                        Condición: {weatherData.current.condition.text}
                    </Text>
                </View>
            ) : (
                <Text style={styles.weatherText}>Cargando datos del clima...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:30,
    },
    weatherContainer: {
        marginLeft: 16,
        marginBottom: 16,
    },
    weatherText: {
        fontFamily:'OpenSansRegular',
        fontSize: 15,
        color: '#000000',
        marginBottom: 8,
        marginLeft: 16,
    },
});

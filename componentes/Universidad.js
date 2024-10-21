import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Linking } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

export default function Universidad () {
       // Constantes para la API de universidades
       const [country, setCountry] = useState('');
       const [universities, setUniversities] = useState([]);
       const [modalVisible, setModalVisible] = useState(false);
   
    // Función para hacer la solicitud a la API de la universidad
       const fetchUniversities = async () => {
           try {
               const response = await fetch(`http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`);
               const data = await response.json();
               setUniversities(data);
               setModalVisible(true);
           } catch (error) {
               console.error('Error al obtener universidades:', error);
           }
       };
    return (
        <View style={styles.container}>
                {/* Agregando API para ver universidades */}
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10, marginLeft: 16 }}>
                <Text style={{ fontFamily: 'OpenSansSemiBold', color: '#000000', fontSize:16 }}>Universidades</Text>
                <MaterialIcons name="school" style={{ fontSize: 20, color: '#FF6500', marginLeft: 4 }} />
            </View>

            {/* Campo de entrada para el nombre del país */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese un País"
                    value={country}
                    onChangeText={setCountry}
                    borderBottomColor={"#E2DFDF"}
                    borderLeftColor={"#E2DFDF"}
                    borderRightColor={"#E2DFDF"}
                    borderTopColor={"#E2DFDF"}
                />
                <TouchableOpacity onPress={fetchUniversities}>
                    <MaterialIcons name="search" style={{ fontSize: 25, color: '#FF6500' }} />
                </TouchableOpacity>
            </View>
                    {/* Modal para mostrar las universidades */}
            <Modal visible={modalVisible} animationType="slide" transparent={false}>
                <View style={styles.modalContainer}>
                    {/* Botón para cerrar el modal */}
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <MaterialIcons name="close" style={{ fontSize: 30, color: '#FFFFFF' }} />
                    </TouchableOpacity>

                    {/* Contenido de las universidades dentro de un ScrollView */}
                    <ScrollView style={styles.universityList}>
                        {universities.length > 0 ? (
                            universities.map((university, index) => (
                                <View key={index} style={styles.universityContainer}>
                                    <Text style={styles.universityName}>{university.name}</Text>
                                    <Text>Dominio: {university.domains[0]}</Text>
                                    <Text style={styles.link} onPress={() => Linking.openURL(university.web_pages[0])}>
                                        Página web: {university.web_pages[0]}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ margin: 16 }}>No hay universidades para mostrar.</Text>
                        )}
                    </ScrollView>
                </View>
            </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:30,
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginRight: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#1E3E62',
        padding: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingTop: 40,
        paddingBottom: 20,
    },
    universityList: {
        flex: 1,
    },
    universityContainer: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 1,
    },
    universityName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});
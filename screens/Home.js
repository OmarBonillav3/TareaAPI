import React from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Universidad from '../componentes/Universidad';
import Clima from '../componentes/Clima';
import WordPress from '../componentes/WordPress';

export default function Home() {
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>

            <Universidad />
            <Clima />
            <WordPress />

        </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF9F2',
    },
});

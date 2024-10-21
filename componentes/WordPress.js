import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { parseString } from 'react-native-xml2js';

export default function SmashingMagazine() {
    
    const [articles, setArticles] = useState([]);

    const fetchSmashingArticles = async () => {
        try {
            const response = await fetch('https://www.smashingmagazine.com/feed/');
            const xml = await response.text();
            parseString(xml, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    return;
                }
                const items = result.rss.channel[0].item.slice(0, 3); // Obtener solo las últimas 3 noticias
                setArticles(items);
            });
        } catch (error) {
            console.error('Error fetching Smashing Magazine articles:', error);
        }
    };
    useEffect(() => {
        fetchSmashingArticles();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10,}}>
                <Text style={{ fontFamily: 'OpenSansSemiBold', color: '#000000', fontSize:16 }}>WordPress</Text>
                <MaterialIcons name="web" style={{ fontSize: 20, color: '#FF6500', marginLeft: 4 }} />
            </View> 
            <Image
                source={require ('../assets/img/LogoWordPress.png')} 
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Listado de noticias */}
            <ScrollView style={styles.articlesContainer}>
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <View key={index} style={styles.articleContainer}>
                            <Text style={styles.articleTitle}>{article.title[0]}</Text>
                            <Text style={styles.articleExcerpt}>{article.description[0].replace(/<[^>]+>/g, '')}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(article.link[0])} style={styles.linkButton}>
                                <Text style={styles.linkText}>Visitar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.loadingText}>Cargando artículos...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    logo: {
        width: 50, 
        height: 50,
        marginLeft:16,
        alignSelf: 'center',
        marginBottom: 20,
    },
    articlesContainer: {
        marginBottom: 16,
    },
    articleContainer: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 1,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    articleExcerpt: {
        marginBottom: 8,
        fontSize: 14,
        color: '#333',
    },
    linkButton: {
        marginTop: 4,
    },
    linkText: {
        color: '#0B192C',
        fontWeight: 'bold',
    },
    loadingText: {
        margin: 16,
        textAlign: 'center',
    },
});

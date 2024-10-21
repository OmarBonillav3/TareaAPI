import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'; 

export default function AcercaDe () {

    // Url de mos contactos
    const Github = () => {
        const url = 'https://github.com/OmarBonillav3';
        Linking.openURL(url).catch(err => console.error('Error al abrir la URL:', err));
      };

    const Instagram = () => {
        const url = 'https://www.instagram.com/omarbonilla.v4/'; 
        Linking.openURL(url).catch(err => console.error('Error al abrir la URL:', err));
      };

    return (
        <View style={styles.container}>
            <Text 
                style={{
                    fontSize:13, 
                    fontFamily:'OpenSansSemiBold', 
                    textAlign:'center', 
                    marginHorizontal:16,
                    marginTop:16,
                }}>
                Esta app es una prueba de diferentes apis, espero que les haya gustado. Les dejo mi informacion.
            </Text>

            <Text style={{marginTop:20, fontSize:13, fontFamily:'OpenSansRegular', marginHorizontal:16, textAlign:'center'}}>
                Mi nombre es <Text style={{ fontSize:13, fontFamily:'OpenSansBold'}}>Omar Bonilla </Text>

                un estudiante del ITLA de Desarrollo de Software el cual es un apasionado de la creacion de App moviles, 
                esta app fue creada con ReactNative si quiere saber mas de mis proyectos le dejo mis redes
            </Text>
            <Image 
                source={require ('../assets/img/FotoPerfil.jpeg')}
                style={{
                    alignSelf:'center',
                    marginLeft:10,
                    height: 230,
                    resizeMode:'contain',
                    marginTop:30,
                }}/>

                {/* Contenedor de mis redes sociales */}
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:20,}}>
                {/* Dirigete a mi github */}
                <TouchableOpacity onPress={Github}>
                    <View style={{marginLeft:30, marginTop:30}}>
                        <Icon name='github' style={{fontSize:50,marginLeft:6, color:'#000000'}} />
                        <Text style={{fontSize:17, color:'#000000', fontFamily:'OpenSansSemiBold'}}>Github</Text>
                    </View>
                </TouchableOpacity>

                 {/* Dirigete a mi instagram */}
                 <TouchableOpacity onPress={Instagram}>
                    <View style={{marginLeft:30, marginTop:30}}>
                        <Icon name='instagram' style={{fontSize:50,marginLeft:18, color:'#000000'}} />
                        <Text style={{fontSize:17, color:'#000000', fontFamily:'OpenSansSemiBold'}}>Instagram</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAF7F0',
      alignItems: 'center',
      
    },
  });
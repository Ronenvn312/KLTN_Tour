import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from 'react-native';

export default function Plans({navigation}) {

    const count = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={count}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={()=>navigation.navigate('PlannedTour')}>
                        <Image style={styles.ima} source={require('../assets/hoian.jpg')}/>
                        <Text style={styles.title}>Phố cổ Hội An</Text>
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center'
    },
    tou: {
        height: 190,
        width: '85%',
        marginTop: 10,
        alignSelf: 'center',
        marginBottom:10
    },
    ima: {
        height: 160,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },
    title: {
        fontSize: 19,
        marginLeft: '5%',
        fontWeight:'400'
    }
});

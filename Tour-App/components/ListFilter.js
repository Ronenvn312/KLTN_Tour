import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function ListFilter() {
    const navigation = useNavigation();

    const data = [1, 2, 3, 4, 5, 6]
    const maxRating = [1, 2, 3, 4, 5]

    return (
        <View>
            <StatusBar style="auto" />
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('TourDetail')}>
                        <Image style={styles.ima} />
                        <View style={styles.vie}>
                            <Text style={styles.title}>Phố cổ Hội An</Text>
                            <Text style={styles.location}>Hội An, Quảng Nam</Text>
                            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                {maxRating.map((item, key) => {
                                    return (
                                        <View
                                            activeOpacity={0.7}
                                            key={item}>
                                            <Image
                                                style={styles.starImageStyle}
                                                source={
                                                    item <= 4.6
                                                        ? { uri: starImageFilled }
                                                        : { uri: starImageCorner }
                                                }
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                        <Image source={require('../assets/white_heart.png')} style={styles.heart} />
                    </TouchableOpacity>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    tou: {
        height: 200,
        width: 140,
        marginLeft: 5,
        marginTop: 15
    },
    tou: {
        height: 150,
        width: '90%',
        marginTop: 15,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: '#008080',
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1
    },
    ima: {
        flex: 3,
        // height:'90%',
        // width:'40%',
        backgroundColor: 'grey',
        borderRadius: 15,
        margin: '2%'
    },
    heart: {
        height: '40%',
        flex: 1
    },
    vie: {
        flex: 3,
        marginLeft: '3%',
        marginTop: '5%'
    },
    title: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500'
    },
    location: {
        fontSize: 15,
        width: '100%',
        color: 'grey'
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
})


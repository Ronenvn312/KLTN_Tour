import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, FlatList, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function ListActivity() {
    const navigation = useNavigation();
    const count = [1, 2, 3, 4, 5, 6, 7, 8]
    const maxRating = [1, 2, 3, 4, 5]

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={count}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('TourActivity')}>
                        <Image style={styles.ima} />
                        <View style={styles.vie}>
                            <Text style={styles.title}>Ngắm bình minh</Text>
                            <Text style={styles.location}>Hòn Trống Mái</Text>
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
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tou: {
        height: 150,
        width: '85%',
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
});

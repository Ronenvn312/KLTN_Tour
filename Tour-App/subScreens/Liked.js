import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, FlatList, Image, Text } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

export default function Liked({navigation}) {

    const count = [1, 2, 3, 4, 5, 6, 7, 8]
    const maxRating = [1, 2, 3, 4, 5]
    const [list, setList] = useState();
    useEffect(() => {
        axios.get(`http://192.168.1.77:8080/tour/findAlls`)
            .then(res => {
                setList(res.data)
                console.log(list)
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('TourDetail')}>
                        <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }}/>
                        <View style={styles.vie}>
                            <Text style={styles.title}>{item.tenTour}</Text>
                            <Text style={styles.location}>{item.viTri}</Text>
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
                        <Image source={require('../assets/red_heart.png')} style={styles.heart} />
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

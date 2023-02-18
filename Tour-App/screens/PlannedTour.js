import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import ListActivity from '../components/ListActivity';
import { Button } from '@rneui/themed';

const img = [
    'https://heritagecruises.com/wp-content/uploads/2021/05/File1-768x437.jpg',
    'https://heritagecruises.com/wp-content/uploads/2021/05/DJI_0787-768x512.jpg',
    'https://heritagecruises.com/wp-content/uploads/2020/05/Lan-Ha-Bay-768x511.jpg'
]

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function PlannedTour({ navigation }) {

    const [imgActive, setImgActive] = useState(0)
    const [active, setActive] = useState(true);
    const handleClick = () => {
        setActive(!active)
    };

    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imgActive)
                setImgActive(slide)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.map}>
                <MapView
                    style={{ height: '100%', width }}
                    region={{
                        latitude: 20.911093403075455,
                        longitude: 107.18360655035079,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.25,
                    }}
                >
                    <Marker coordinate={{ latitude: 20.911093403075455, longitude: 107.18360655035079 }} />
                </MapView>
                <TouchableOpacity style={{ position: 'absolute', top: height * 0.03 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, width: '90%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Vịnh Hạ Long</Text>
                        <Text style={{ fontSize: 18, color: 'grey' }}>TP Hạ Long, Quảng Ninh</Text>
                    </View>
                    <View style={{ alignSelf: 'center', width: width * 0.25 }}>
                        <Button onPress={handleClick} title={active ? 'Bắt đầu' : 'Kết thúc'} color={active ? '' : 'red'} />
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <ListActivity />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 1,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    dot: {
        margin: 3,
        color: 'white',
        fontSize: 18
    },
    head: {
        width: width * 0.12,
        height: width * 0.12,
        top: height * 0.05
    },
    back: {
        width: width * 0.15,
        height: width * 0.15,
        // top: -width * 0.75
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: height * 0.01
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        left: width * 0.07,
        top: '1%'
    },
    price: {
        fontSize: 18,
        fontWeight: '500',
        left: -width * 0.07,
        top: '2.5%',
        color: 'grey'
    },
    loca: {
        flex: 0.1,
        fontSize: 15,
        fontWeight: '500',
        left: width * 0.1,
        color: 'grey'
    },
    main: {
        flex: 1,
        // backgroundColor: 'black'
    },
    btn_book: {
        position: 'absolute',
        backgroundColor: '#4EB8FF',
        bottom: height * 0.01,
        height: height * 0.065,
        width: width * 0.9,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    txt_btn: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 22,
        fontWeight: '700'
    }
});

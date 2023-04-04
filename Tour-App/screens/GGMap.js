import { StyleSheet, View, Dimensions, Image, TouchableOpacity, Button, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Audio } from 'expo-av';
import getDistance from 'geolib/es/getPreciseDistance';
import { Dropdown } from 'react-native-element-dropdown';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const data = [
    { lable: '100m', value: 100 },
    { lable: '200m', value: 200 },
    { lable: '300m', value: 300 },
    { lable: '500m', value: 500 },
    { lable: '1000m', value: 1000 },
    { lable: '1500m', value: 1500 },
];
const listType = [
    { label: 'Âm thanh', value: 'audio' },
    { label: 'Đoạn phim', value: 'video' }
];

export default function TourActivity({ navigation }) {

    const [isPlay, setIsPlay] = useState(false)
    const [myLocation, setMyLocation] = useState(null);
    const [sound, setSound] = useState();
    const [distance, setDistance] = useState()
    const [di, setD] = useState(500);
    const [type, setType] = useState('audio');
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            var d = getDistance(
                { latitude: location.coords.latitude, longitude: location.coords.longitude },
                { latitude: 10.817949, longitude: 106.684991 }
            )
            setMyLocation(() => {
                setMyLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
            });
            setDistance(d)
            if (distance <= di && type == 'video' && isPlay === false) {
                navigation.navigate('PlayVideo')
                console.log(d +'---'+di + '++++'+ type +'----' + isPlay)
                setIsPlay(true)
            } else if (distance <= di && type == 'audio' && isPlay === false) {
                playSound()
                console.log(d +'---'+di + '++++'+ type +'----' + isPlay)
                setIsPlay(true)
            }
        })();
    }, [distance]);
    console.log('Distance:' + distance + 'm')
    console.log(myLocation)

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/sound.mp3'));
        setSound(sound);
        if (distance <= di)
            await sound.playAsync();
        else console.log('Chua den')
    }
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function play() {
        if (distance <= di && type == 'video') {
            navigation.navigate('PlayVideo')
        } else if (type == 'audio') {
            playSound()
        }
    }

    
    console.log(distance +'---'+di + '++++'+ type +'----' + isPlay)

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <MapView
                style={{ height: '100%', width }}
                region={{
                    latitude: 20.951334,
                    longitude: 107.043215,
                    latitudeDelta: 0.4,
                    longitudeDelta: 1,
                }}
            >
                <Marker
                    coordinate={{ latitude: 20.951334, longitude: 107.043215 }}
                    title='Vịnh Hạ Long'
                />
                <Marker
                    coordinate={myLocation ? myLocation : { latitude: 0, longitude: 0 }}
                    title='Vị trí của bạn'
                    icon={require('../assets/marker.jpg')}
                />
                <MapViewDirections
                    origin={myLocation}
                    destination={{ latitude: 20.951334, longitude: 107.043215 }}
                    apikey={'AIzaSyAqT35-kt0gv18cw42StN0wbwagmt3blmQ'}
                    strokeColor="blue"
                    strokeWidth={5}
                />
            </MapView>
            <View style={{ position: 'absolute', top: height * 0.03, flexDirection: 'row' }}>
                <TouchableOpacity style={{ position: 'absolute', marginTop: height * 0.005 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
                </TouchableOpacity>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    maxHeight={300}
                    labelField="lable"
                    valueField="value"
                    placeholder={"500m"}
                    value={di}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setD(item.value);
                        setIsFocus(false);
                    }}
                />
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={listType}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={"Âm thanh"}
                    value={type}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setType(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>

            <View style={distance <= di ? styles.button : {}}>
                <Button onPress={play} title='Phát lại'></Button>
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
        flex: 2,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    button: {
        bottom: 45,
        width: width * 0.3,
        alignSelf: 'flex-end',
        marginRight: 5
    },
    dropdown: {
        height: 45,
        width: width * 0.36,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft: width * 0.1,
        marginTop: height * 0.01,
    },
    placeholderStyle: {
        fontSize: 17,
        fontWeight: '500'
    },
    selectedTextStyle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FF8000'
    }
});

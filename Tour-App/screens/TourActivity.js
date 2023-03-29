import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import ListActivity from '../components/ListActivity';

const img = [
    'https://heritagecruises.com/wp-content/uploads/2021/05/File1-768x437.jpg',
    'https://heritagecruises.com/wp-content/uploads/2021/05/DJI_0787-768x512.jpg',
    'https://heritagecruises.com/wp-content/uploads/2020/05/Lan-Ha-Bay-768x511.jpg'
]

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function TourActivity({ navigation }) {

    const [imgActive, setImgActive] = useState(0)
    const [active, setActive] = useState(true);
    const handleClick = () => {
        setActive(!active);
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
                <TouchableOpacity onLongPress={()=>navigation.navigate('GGMap')}>
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
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', top: height * 0.03 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, width: '90%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: height * 0.01 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Ngắm bình minh</Text>
                        <Text style={{ fontSize: 18, color: 'grey' }}>Hòn Trống Mái</Text>
                    </View>
                </View>
                <View style={{ flex: 3, backgroundColor: '#f9f9f9', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <ScrollView>
                        <Text style={{ width: width * 0.9, alignSelf: 'center' }}>abcxyz, ngắm chim, ngắm biển, ngắm hoàng hôn, vâng vâng và mây mây</Text>
                    </ScrollView>
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
        flex: 2,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        overflow: 'hidden'
    }
});

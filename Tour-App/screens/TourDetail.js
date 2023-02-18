import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

const img = [
    'https://heritagecruises.com/wp-content/uploads/2021/05/File1-768x437.jpg',
    'https://heritagecruises.com/wp-content/uploads/2021/05/DJI_0787-768x512.jpg',
    'https://heritagecruises.com/wp-content/uploads/2020/05/Lan-Ha-Bay-768x511.jpg'
]

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function TourDetail({ navigation }) {

    const [imgActive, setImgActive] = useState(0)

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
            <View style={{ width, height: width * 0.9 }}>
                <ScrollView
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                >
                    {
                        img.map((e, index) =>
                            <TouchableOpacity key={e}>
                                <Image
                                    resizeMode='cover'
                                    source={{ uri: e }}
                                    style={{ width, height: width * 0.9, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                                />
                            </TouchableOpacity>
                        )
                    }

                </ScrollView>
                <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'auto', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
                        <Image source={require('../assets/back_icon1.png')} style={styles.head} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.back}>
                        <Image source={require('../assets/silve_heart.png')} style={[styles.head, { left: width * 0.68 }]} />
                    </TouchableOpacity>
                </View>

                <View style={{ position: 'absolute', alignSelf: 'center', top: width * 0.78, flexDirection: 'row' }}>
                    {
                        img.map((e, index) =>
                            <Text
                                key={e}
                                style={imgActive == index ? styles.dotActive : styles.dot}
                            >
                                ●
                            </Text>
                        )
                    }
                </View>

            </View>

            <View style={styles.top}>
                <Text style={styles.title}>Vịnh Hạ Long</Text>
                <Text style={styles.price}>Miễn phí</Text>
            </View>
            <View style={{ flex: 10 }}>
                <Text style={styles.loca}>Quảng Ninh, Việt Nam</Text>
                <ScrollView style={styles.main}>
                    <View style={{ height: height * 0.3 }}>
                        <Text>description</Text>
                    </View>
                    <View style={{ height: 0.3 * height, width: width * 0.9, alignSelf: 'center', borderRadius: 20, backgroundColor: 'black', overflow: 'hidden' }}>
                        <MapView
                            style={{ height: 0.3 * height, width: width * 0.9 }}
                            region={{
                                latitude: 20.911093403075455,
                                longitude: 107.18360655035079,
                                latitudeDelta: 0.5,
                                longitudeDelta: 0.25,
                            }}
                        >
                            <Marker coordinate={{ latitude: 20.911093403075455, longitude: 107.18360655035079 }} />
                        </MapView>
                    </View>
                    <View style={{height:height*0.1}}/>
                </ScrollView>
                <TouchableOpacity style={styles.btn_book}>
                    <Text style={styles.txt_btn}>Đặt chuyến đi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    dotActive: {
        margin: 5,
        color: 'black',
        fontSize: 23,
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

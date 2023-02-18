import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import ListActivity from '../components/ListActivity';
import { Button } from '@rneui/themed';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

export default function TourActivity({ navigation }) {

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <MapView
                style={{ height:'100%', width }}
                region={{
                    latitude: 20.911093403075455,
                    longitude: 107.18360655035079,
                    latitudeDelta: 0.4,
                    longitudeDelta: 1,
                }}
            >
                <Marker coordinate={{ latitude: 20.911093403075455, longitude: 107.18360655035079 }} />
            </MapView>
            <TouchableOpacity style={{ position: 'absolute', top: height * 0.03 }} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: width * 0.1 }} />
            </TouchableOpacity>
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Plans({ navigation }) {
    const [list, setList] = useState();
    const count = [1, 2, 3, 4, 5, 6, 7, 8]
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
                    <TouchableOpacity style={styles.tou} onPress={() => navigation.navigate('PlannedTour')}>
                        <Image style={styles.ima} source={{ uri: item.hinhAnh[0] }}  />
                        <Text style={styles.title}>{item.tenTour}</Text>
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
        marginBottom: 10
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
        fontWeight: '400'
    }
});

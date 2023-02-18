import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListTour() {
    const navigation = useNavigation();

    const data = [1, 2, 3, 4, 5, 6]

    return (
        <View>
            <StatusBar style="auto" />
            <FlatList
                horizontal={true}
                data={data}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={styles.tou}
                        onPress={() => navigation.navigate('TourDetail')}
                        source={require('../assets/back_item.png')}
                    >
                        <ImageBackground style={{ height: 200, width: 140, borderRadius: 30 }} source={require('../assets/back_item.png')}>

                        </ImageBackground>
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
})


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground } from 'react-native';
import PlansTopTabbar from '../tab/PlansTopTabbar';

export default function Plans() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={{ paddingTop:'12%', height: '10%', alignSelf: 'center', textAlign: 'center', marginBottom: '2%', fontSize: 24, fontWeight: '600' }}>Kế hoạch</Text>
            <PlansTopTabbar />
            <View style={{ height: '7%' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center'
    },
});

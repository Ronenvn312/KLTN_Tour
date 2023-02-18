import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground } from 'react-native';

export default function ResetPassword({ navigation }) {
    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ flex: 2, marginTop: '20%' }}>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Đặt lại mật khẩu</Text>
                <Text style={{ alignSelf: 'center', marginTop: '5%', width: '50%', textAlign: 'center', fontSize: 22, fontWeight: '300' }}>Nhập mật khẩu mới của bạn</Text>
            </View>
            <TextInput style={styles.input} placeholder='Nhập mật khẩu mới' />
            <TextInput style={styles.input1} placeholder='Nhập lại mật khẩu mới' />
            <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => navigation.navigate('Successfull')}>
                    <Text style={styles.textOTP}>ĐẶT LẠI</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tou_OTP: {
        justifyContent: 'center',
        backgroundColor: '#39ACFF',
        borderRadius: 16,
        marginTop: '10%',
        width: '85%',
        height: '35%',
        alignSelf: 'center'
    },
    input: {
        flex: 0.7,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '75%',
        marginTop: '15%',
        fontSize: 20,
        backgroundColor: '#fff'
    },
    input1: {
        flex: 0.7,
        paddingLeft: 8,
        alignSelf: 'center',
        borderRadius: 15,
        width: '85%',
        height: '75%',
        marginTop: '5%',
        fontSize: 20,
        backgroundColor: '#fff'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});

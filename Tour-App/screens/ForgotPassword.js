import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground } from 'react-native';

export default function ForgotPassword({ navigation }) {
    return (
        <ImageBackground source={require('../assets/bg_login.png')} style={styles.container}>
            <StatusBar style="auto" />

            <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-start', paddingTop: '15%', width: '20%' }} onPress={() => navigation.goBack()}>
                <Image style={{ height: 40, width: 40, resizeMode: 'cover' }} source={require('../assets/back_icon.png')}></Image>
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Quên mật khẩu</Text>
                <Text style={{ alignSelf: 'center', marginTop: '5%', width: '80%', textAlign: 'center', fontSize: 22, fontWeight: '300' }}>Nhập email hoặc số điện thoại di động của bạn để đặt lại mật khẩu</Text>
            </View>
            <TextInput style={styles.input} placeholder='Nhập Email hoặc Số điện thoại' />
            <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => navigation.navigate('Check')}>
                    <Text style={styles.textOTP}>GỬI OTP</Text>
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
        height: '7%',
        marginTop: '15%',
        fontSize: 18,
        backgroundColor: '#fff'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});

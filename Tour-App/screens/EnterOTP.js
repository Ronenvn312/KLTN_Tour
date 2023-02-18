import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';

export default function EnterOTP({navigation}) {

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    var otp = otp1 + otp2 + otp3 + otp4

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <TouchableOpacity style={styles.tou_back} onPress={() => navigation.navigate('ForgotPassword')}>
                <Image style={{ height: 40, width: 40, resizeMode: 'cover' }} source={require('../assets/back_icon.png')}></Image>
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
                <Text style={{ alignSelf: 'center', paddingTop: '15%', width: '60%', textAlign: 'center', fontSize: 30, fontWeight: '600' }}>Xác minh OTP</Text>
                <Text style={{ alignSelf: 'center', marginTop: '5%', width: '80%', textAlign: 'center', fontSize: 22, fontWeight: '300' }}>Chúng tôi sẽ gửi cho bạn một mã xác thực vào địa chỉ này.</Text>
            </View>
            {/* <TextInput style={styles.input} placeholder='Nhập OTP' maxLength={4} keyboardType='numeric' /> */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={firstInput}
                    onChangeText={text => {
                        setOtp1(text);
                        text && secondInput.current.focus();
                    }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={secondInput}
                    onChangeText={text => {
                        setOtp2(text);
                        text ? thirdInput.current.focus() : firstInput.current.focus();
                    }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={thirdInput}
                    onChangeText={text => {
                        setOtp3(text);
                        text ? fourthInput.current.focus() : secondInput.current.focus();
                    }}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={fourthInput}
                    onChangeText={text => {
                        setOtp4(text);
                        !text && thirdInput.current.focus();
                    }}
                />
            </View>

            <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.tou_OTP} onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.textOTP}>XÁC NHẬN</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
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
    tou_back: {
        flex: 1, 
        alignSelf: 'flex-start', 
        paddingTop: '15%', 
        width: '20%', 
        marginLeft:'3%'
    },
    input: {
        borderRadius: 10,
        height: '70%',
        width: '15%',
        margin: '3%',
        backgroundColor: '#ffffff',
        alignSelf:'center',
        textAlign:'center',
        fontSize:24,
        fontWeight:'600'
    },
    textOTP: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
});

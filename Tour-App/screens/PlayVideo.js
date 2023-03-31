import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';

export default function PlayVideo({navigation}) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    // console.log(status)
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <Video
                ref={video}
                style={styles.video}
                source={require('../assets/videop.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                shouldPlay={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.buttons}>
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
            </View>
            <TouchableOpacity style={{ position: 'absolute', top:'5%' }} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/back_icon.png')} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    video: {
        height: '50%',
        width: '100%'
    },
    buttons: {}
});

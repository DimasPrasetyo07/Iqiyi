import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function Vidio(vidio) {
  console.log(vidio, '<<<<<')
  console.log(vidio.data, '*******')
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <>
      <Video
        ref={video}
        style={{width: 300, height: 200, justifyContent: 'center'}}
        source={{
          // uri: "https://www.youtube.com/watch?v=PD6U-B38Uek",
          // uri : vidio.data
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      
    </>
  );
}
import React, { Component } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Image, TouchableNativeFeedback, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Slider } from 'react-native-elements';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import VideoRecorder from 'react-native-beautiful-video-recorder';

import Tts from 'react-native-tts';

import MapView from 'react-native-maps'

import Clock from './Clock';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      isRecording: false,
      isPlaying: false,
      question2Visbility: false,
      answer2Visability: false,
      value: 0,
      speaking: false
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    //this.audioRecorderPlayer.setSubscriptionDuration(0.1);
    // optional. Default is 0.1
  }

  handleHappy(value) {
    this.setState({ value: value });
  }
  completeHappy(value) {
    this.setState({ question2Visbility: true });
  }
  avatarSpeaking1() {
    Tts.setDefaultPitch(0.7);
    this.setState({ speaking: true });
    Tts.speak('Are you happy today?', {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
    setTimeout(() => {
      this.setState({ speaking: false });
    }, 1500)
  }
  avatarSpeaking2() {
    Tts.setDefaultPitch(0.7);
    this.setState({ speaking: true });
    Tts.speak("can you tell me more details?");
    setTimeout(() => {
      this.setState({ speaking: false });
    }, 2000)
  }


  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        throw (err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permissions for read access',
            message: 'Give permission to your storage to read a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        throw (err)
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        throw (err)
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissions for CAMERA',
            message: 'Give permission to CAMERA',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        throw (err)
        return;
      }
    }
  }
  //start record
  onStartRecord = async () => {



    const path = 'sdcard/sound1.mp4';//`sdcard/${patientId}sound.mp4`
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);


    try {
      const uri = await this.audioRecorderPlayer.startRecorder(path);
      console.log('start record~');
      this.audioRecorderPlayer.addRecordBackListener((e) => {
        this.setState({
          recordSecs: e.current_position,
          recordTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
          isRecording: true
        });
      });
      console.log(`uri: ${uri}`);
    }
    catch (err1) {
      console.log(err1)
      throw (err1)
    }

  };
  //Stop Recording
  onStopRecord = async () => {
    try {
      const result = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      this.setState({
        recordSecs: 0,
        isRecording: false,
        answer2Visability: true
      });
    }
    catch (err) {
      console.log(err);
      throw (err);
    }

  };
  //Start Play
  onStartPlay = async (e) => {
    console.log('onStartPlay');
    this.setState({
      isPlaying: true
    });
    const path = 'sdcard/sound1.mp4'
    try {
      const msg = await this.audioRecorderPlayer.startPlayer(path);
      this.audioRecorderPlayer.setVolume(1.0);
      console.log(msg);
      this.audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.current_position === e.duration) {
          console.log('finished');
          this.audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));;
          this.setState({
            isPlaying: false
          });
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration))
        });
      });
    }
    catch (err1) {
      console.log(err1)
      throw (err1)
    }
  }

  //start camera
  start = () => {
    // 30 seconds
    this.videoRecorder.open({ maxLength: 30 }, (data) => {
      //should store the data in

      console.log('captured data', data);
    });
    this.setState({
      answer2Visability: true
    });
  }

  saveVedio = () => {
    this.videoRecorder.onSave();
  }

  render() {
    const { id, gender, recordingMethod } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Clock />
        <ScrollView style={{ alignSelf: "stretch", flex: 2 }}
          ref={ref => { this.scrollView = ref }}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
          <View style={{ alignSelf: "flex-start", flexDirection: "row", margin: 5 }}>

            {this.state.speaking ? <Image source={require('./ChatIcons/header11.gif')} style={{ marginRight: 10, height: 140, width: 140 }}></Image>
              : <Image source={require('./ChatIcons/header11r.png')} style={{ marginRight: 10, height: 140, width: 140 }}></Image>}
            <Button title="Are you happy today?" onPress={() => this.avatarSpeaking1()} containerStyle={{ alignSelf: "center" }}
            ></Button>
          </View>
          {id < 3 && id > 1 &&
            <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
              <Button title="not really" containerStyle={{ marginHorizontal: 10, alignSelf: "center" }} onPress={() => { this.setState({ question2Visbility: true }) }}></Button>
              <Button title="very happy" onPress={() => { this.setState({ question2Visbility: true }) }} containerStyle={{ alignSelf: "center" }}></Button>
              {gender === "Male" ? <Image source={require('./ChatIcons/header2-2.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image> :
                <Image source={require('./ChatIcons/header2-s.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image>}
            </View>}
          {id > 2 &&
            <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>

              <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', marginLeft: 100, marginRight: 15 }}>
                <Slider
                  value={this.state.value}
                  onValueChange={(value) => this.handleHappy(value)}
                  onSlidingComplete={(value) => this.completeHappy(value)}
                  maximumValue={10}
                  minimumValue={0}
                  step={1}
                />
                <Text>Happiness Rating: {this.state.value}</Text>
              </View>
              {gender === "Male" ? <Image source={require('./ChatIcons/header2-2.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image> :
                <Image source={require('./ChatIcons/header2-s.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image>}
            </View>}
          {this.state.question2Visbility && <View style={{ alignSelf: "flex-start", flexDirection: "row", margin: 5 }}>
            {this.state.speaking ?
              <Image source={require('./ChatIcons/header11.gif')} style={{ marginRight: 10, height: 140, width: 140 }}></Image>
              : <Image source={require('./ChatIcons/header11r.png')} style={{ marginRight: 10, height: 140, width: 140 }}></Image>}
            <Button title="can you tell me more details?" onPress={() => this.avatarSpeaking2()} containerStyle={{ alignSelf: "center" }}
            ></Button>
          </View>}

          {id < 2 ? this.state.answer2Visability &&
            <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
              <Button title="My Recording" onPress={(e) => { this.onStartPlay(e) }}
                disabled={this.state.isPlaying}
                containerStyle={{ alignSelf: "center" }}
              ></Button>
              {gender === "Male" ? <Image source={require('./ChatIcons/header2-2.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image> :
                <Image source={require('./ChatIcons/header2-s.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image>}
            </View>
            : this.state.answer2Visability && this.state.question2Visbility &&
            <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
              <Button title="My Recording" onPress={(e) => { this.onStartPlay(e) }}
                disabled={this.state.isPlaying}
                containerStyle={{ alignSelf: "center" }}
              ></Button>
              {gender === "Male" ? <Image source={require('./ChatIcons/header2-2.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image> :
                <Image source={require('./ChatIcons/header2-s.png')} style={{ marginLeft: 10, height: 140, width: 140 }}></Image>}
            </View>
          }

        </ScrollView>


        <View style={{ flex: 0.3, alignSelf: "stretch", justifyContent: "center" }}>


          {id < 2 ? <View style={{ alignSelf: "center" }}>

            {recordingMethod === 'Sound' ?
              <View><TouchableNativeFeedback
                onPressIn={() => { this.onStartRecord() }}
                onPressOut={() => { this.onStopRecord() }}>
                <Image source={require('./ChatIcons/Press.png')}
                  style={this.state.isRecording ? styles.onRecordingBtn : {}}
                ></Image>
              </TouchableNativeFeedback>
                <Text style={{ marginVertical: 2, alignSelf: "center", fontSize: 16 }}>{this.state.recordTime}</Text>
              </View>
              : <TouchableOpacity onPress={this.start}>
                <Image source={require('./ChatIcons/Press.png')}
                  style={this.state.isRecording ? styles.onRecordingBtn : {}}
                ></Image>
                <Text>Start Vedio</Text>
              </TouchableOpacity>}






          </View>
            : this.state.question2Visbility &&
            <View style={{ alignSelf: "center" }}>
              {recordingMethod === 'Sound' ?
                <View><TouchableNativeFeedback
                  onPressIn={() => { this.onStartRecord() }}
                  onPressOut={() => { this.onStopRecord() }}>
                  <Image source={require('./ChatIcons/Press.png')}
                    style={this.state.isRecording ? styles.onRecordingBtn : {}}
                  ></Image>
                </TouchableNativeFeedback>
                  <Text style={{ marginVertical: 2, alignSelf: "center", fontSize: 16 }}>{this.state.recordTime}</Text>
                </View>
                : <TouchableOpacity onPress={this.start}>
                  <Image source={require('./ChatIcons/Press.png')}
                    style={this.state.isRecording ? styles.onRecordingBtn : {}}
                  ></Image>
                  <Text>Start Vedio</Text>
                </TouchableOpacity>}

            </View>}

          <VideoRecorder ref={(ref) => { this.videoRecorder = ref; }} recordOptions={{ path: "sdcard/videotry.mp4" }}/>


        </View>
        <View style={{ flex: 0.5, alignSelf: "stretch", paddingTop: 10 }}>

          <MapView style={{ flex: 1, alignSelf: "stretch" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />

        </View>

      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    display: "flex"
  },
  onRecordingBtn: {
    width: 70,
    height: 70
  }
});

export default Chat

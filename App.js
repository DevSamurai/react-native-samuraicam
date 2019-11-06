import React, {useState} from 'react';
import {
  ImageBackground,
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const ShowImage = ({photo, isVisible, setIsPhotoVisible}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={{uri: photo}}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => setIsPhotoVisible(false)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> FECHAR </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const Camera = ({isVisible, onChangePhoto}) => {
  const [camera, setCamera] = useState();

  const onTakePicture = async () => {
    try {
      const {uri} = await camera.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
        skipProcessing: true,
      });
      onChangePhoto(uri);
    } catch (error) {
      Alert.alert('Erro', 'Houve um erro ao tirar a foto.');
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <RNCamera
        ref={ref => setCamera(ref)}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a câmera',
          message: 'Precisamos da sua permissão para usar a câmera.',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}
        captureAudio={false}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={onTakePicture} style={styles.capture}>
            <Text style={{fontSize: 14}}> CAPTURAR </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </Modal>
  );
};

const App = () => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const onChangePhoto = newPhoto => {
    setPhoto(newPhoto);
    setIsCameraVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsCameraVisible(!isCameraVisible);
        }}>
        <Text style={styles.text}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsPhotoVisible(!isPhotoVisible);
        }}>
        <Text style={styles.text}>Visualizar</Text>
      </TouchableOpacity>
      <Camera isVisible={isCameraVisible} onChangePhoto={onChangePhoto} />
      <ShowImage
        photo={photo}
        isVisible={isPhotoVisible}
        setIsPhotoVisible={setIsPhotoVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#e74c3c',
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Roboto',
    padding: 5,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;

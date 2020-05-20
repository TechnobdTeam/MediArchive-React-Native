import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import Permissions from 'react-native-permissions';
import PDFScanner from '@woonivers/react-native-document-scanner';

import AppConstant from '../component/AppConstant';

export default function AppScan() {
  const pdfScannerElement = useRef(null);
  const [data, setData] = useState({});
  const [allowed, setAllowed] = useState(false);

  console.log('--------AppScan------:'+
        'p_patient_id: ', AppConstant.p_patient_id ,
        'p_action_type: ', AppConstant.p_action_type ,
        'p_prescribe_by: ', AppConstant.p_prescribe_by ,
        'p_description: ', AppConstant.p_description ,
        'p_day: ', AppConstant.p_day,
        'p_month: ', AppConstant.p_month,
        'p_year : ', AppConstant.p_year,
        'p_image_list:', AppConstant.p_image_list.length)

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(
        Platform.OS === 'android'
          ? 'android.permission.CAMERA'
          : 'ios.permission.CAMERA',
      );
      if (result === 'granted') setAllowed(true);
    }
    requestCamera();
  }, []);

  

  function handleOnPressRetry() {
    setData({});
  }
  function handleOnPress() {
    pdfScannerElement.current.capture();
  }
  if (!allowed) {
    console.log('You must accept camera permission');
    return (
      <View style={styles.permissions}>
        <Text>You must accept camera permission</Text>
      </View>
    );
  }

  if (data.croppedImage) {
    console.log('data', data);
    return (
      <React.Fragment>
        {console.log('------------ ::: -----> ',data.croppedImage)}
        <Image source={{uri: data.croppedImage}} style={styles.preview} />
        
        <NB.View style={{ flexDirection:'row',justifyContent:'space-evenly' }}>

        <TouchableOpacity
          onPress={handleOnPressRetry}
          style={styles.button2}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Actions.pop({uri : 'somme'}) */}
        <TouchableOpacity
          onPress={()=>{
            var name = ''

            if (data.croppedImage != null) {
              var getFilename = data.croppedImage.split("/");
              name = getFilename[getFilename.length - 1];
            } else {
              name = data.croppedImage
            }

            var type = ''
            console.log('------------ *** -----> ' + (data.croppedImage != null) + "------ Type: "+ AppConstant.p_action_type)
            
            if (data.croppedImage != null) {
              var getFilename = data.croppedImage.split(".");
              type = getFilename[getFilename.length - 1];
            } else {
              type = 'jpg'
            }

            var image = {
              id: Date.now(),
              image_uri: data.croppedImage,
              image_type: 'image/'+type,
              image_name: name,
            }
            AppConstant.p_image_list.push(image)

            if (AppConstant.p_action_type === 'edit'){
              var custom_image = {
                "id": Date.now(),
                "file_id": "8ac372a3-41aa-485b-94e8-d2fa505ade2a",
                "type": 'image/' + type,
                "file_name": name,
                "created_date": "2020-05-06 13:23:11",
                "updated_date": '',
                photo: data.croppedImage
              }

              AppConstant.p_prescription_photo.push(custom_image)
            }




            console.log('------------ ::: -----> ', data.croppedImage, ' type:' + type, ' size: ' + AppConstant.p_image_list.length, ' name:' + name)
            Actions.pop()
            Actions.pop()
            console.log('--------AppScan  2222------:' +
              'p_patient_id: ', AppConstant.p_patient_id,
              'p_action_type: ', AppConstant.p_action_type,
              'p_prescribe_by: ', AppConstant.p_prescribe_by,
              'p_description: ', AppConstant.p_description,
              'p_day: ', AppConstant.p_day,
              'p_month: ', AppConstant.p_month,
              'p_year : ', AppConstant.p_year,
              'p_image_list:', AppConstant.p_image_list.length)
            
            if (AppConstant.p_action_type ==='add'){
              Actions.AddPrescriptionScreen({
                patient_id: AppConstant.p_patient_id,
                action_type: AppConstant.p_action_type,
                prescribe_by: AppConstant.p_prescribe_by,
                description: AppConstant.p_description,
                day: AppConstant.p_day,
                month: AppConstant.p_month,
                year: AppConstant.p_year,
                image_list: AppConstant.p_image_list
              });

            } else if (AppConstant.p_action_type === 'edit'){
              Actions.EditPrescriptionScreen({
                prescription_id: AppConstant.p_prescription_id,
                patient_id: AppConstant.p_patient_id,
                action_type: AppConstant.p_action_type,
                prescribe_by: AppConstant.p_prescribe_by,
                description: AppConstant.p_description,
                day: AppConstant.p_day,
                month: AppConstant.p_month,
                year: AppConstant.p_year,
                image_list: AppConstant.p_image_list,
                prescription_photo: AppConstant.p_prescription_photo,
              });

            }
            
            }}
          style={styles.button2}>
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleOnPressRetry}
          style={styles.button2}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>

        </NB.View>
        
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PDFScanner
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={setData}
        overlayColor="rgba(18,190,210, 1)"
        overlayStrokeColor="rgba(20,190,210, 1)"
        handlerColor="rgba(20,150,160, 1)"
        enableTorch={false}
        quality={1}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
        saturation={0}
      />
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Take picture</Text>
      </TouchableOpacity>
    </React.Fragment>
  );

}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  button2: {
    alignSelf: 'center',
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
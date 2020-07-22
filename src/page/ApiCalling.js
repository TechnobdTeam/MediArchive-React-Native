import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import { Platform, ToastAndroid, Dimensions, PixelRatio} from 'react-native';
import * as NB from 'native-base';

const ApiCalling = {
    
    NetInfo () {
        var isConnected = false;
        NetInfo.fetch().then(state => {
            console.log('-----#######--------1 : ', state.isConnected)
                if (state.isConnected) {
                    this.showToast('Internet is connected. ', 'success')
                    isConnected = true
                    return  isConnected;  
                }else {
                    this.showToast('Please connect to internet and try again. ', 'error')
                    isConnected = true
                    return  isConnected;
                    
                }
            })
            console.log('-----#######--------0 : ', isConnected)
            
        
    },

    showToast(message, type) {
        if (Platform.OS === 'ios'){
            NB.Toast.show({
                text: message,
                position: 'bottom',
                type: type,
                duration: 1000,
                textStyle: {
                    textAlign: 'center'
                }
            })
        }else{
            ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        }
        
    },
    getParam(){
        var formData = new FormData()
            formData.append('api_key', 'cp/W?^,([{,O_+T')
            formData.append('device_type', Platform.OS === 'ios' ? '2' : '1')
            formData.append('device_uuid', DeviceInfo.getUniqueId())

        return formData
    },

    callNetwork(URL,formData, jwt_token) {
        let resolution_width = Dimensions.get('window').width
        let resolution_height = Dimensions.get('window').height

        var dpi = ''
            if (PixelRatio.get() === 1) {
                dpi = 'mdpi'
            } else if (PixelRatio.get() === 1.5) {
                dpi = 'hdpi'
            } else if (PixelRatio.get() === 2) {
                dpi = 'xhdpi'
            } else if (PixelRatio.get() === 3) {
                dpi = 'xxhdpi'
            } else if (PixelRatio.get() === 3.5) {
                dpi = 'xxxhdpi'
            }

        formData.append('api_key', 'cp/W?^,([{,O_+T')
        formData.append('device_type', Platform.OS === 'ios' ? '2' : '1')
        formData.append('device_uuid', DeviceInfo.getUniqueId())

        formData.append('device_width', resolution_width);
        formData.append('device_height', resolution_height);
        formData.append('device_density', Platform.OS === 'ios' ? resolution_width + "*" + resolution_height : dpi )
        
        // console.log("-------- Device_density:::: "+windowWidth, windowHeight, dpi)

        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + jwt_token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
    }

}
export default ApiCalling;
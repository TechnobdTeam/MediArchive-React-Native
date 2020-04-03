import DeviceInfo from 'react-native-device-info';
import { Dimensions, AsyncStorage } from 'react-native'

const AppConstant = {
    BASE_URL : 'http://af.n-api.com/api/',
    COUNTRY_NAME :'afghanistan',
    THEME_COLOR:'#e84c3d',
    ALL_CATEGORY_LIST:[],
    ORIENTATION: '',
    SELECTED_TAB: 1 ,
    SOURCE_PAPER_ID: '0' ,
    SOURCE_PAPER_SOURCE: '' ,
    ORIENTATION_CHANGED:false ,
    CURRENT_SCREEN:'',
    PUSH_ID_TOKEN:'',
    INTERSTITIAL_COUNT: 0 ,
    INTERSTITIAL_WEBVIEW_COUNT: 0,
    ADMOB_BANNER:'ca-app-pub-8349721860736604/3692541651',
    ADMOB_RECTANGLE:'ca-app-pub-8349721860736604/8908391076',
    ADMOB_INTERSTITIAL:'ca-app-pub-8349721860736604/8290757053',
    FB_BANNER:'1443032965846290_1443038882512365',
    FB_RECTANGLE:'1443032965846290_1443042745845312',
    FB_INTERSTITIAL:'1443032965846290_1443044822511771',
    TbdAds:'',
    NetInfo() { false },
    GetParam(){
        let api_key = '^)@$!';
        let country_name = 'afghanista';
        let device_type = '2';
        let resolution_width = Dimensions.get('window').width
        let resolution_height = Dimensions.get('window').height
        let device_uuid = DeviceInfo.getUniqueId();
        let app_version_name = DeviceInfo.getSystemName();
        let app_version_code = DeviceInfo.getSystemVersion();
        let ip_address = DeviceInfo.getIpAddress();
        // let android_api_version = DeviceInfo.DeviceInfo.getApiLevel();
            console.log(" resolution_width >> " + resolution_width);

        var formData = new FormData();
            formData.append('api_key', api_key);
            formData.append('country_name', country_name);
            formData.append('device_type', device_type);
            formData.append('resolution_width', resolution_width);
            formData.append('resolution_height', resolution_height);
            // formData.append('device_density', this.state.device_type);
            formData.append('package_name', this.state.api_key);
            formData.append('app_version_name',app_version_name);
            formData.append('app_version_code', app_version_code);
            formData.append('ip_address', ip_address);
            formData.append('session_id', "");
            // formData.append('android_api_version', android_api_version);
            formData.append('device_uuid', device_uuid);

            console.log(" formData :  " + formData);
        return formData;
    },
    
}
export default AppConstant;
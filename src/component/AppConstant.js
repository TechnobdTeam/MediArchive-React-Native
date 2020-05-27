// import DeviceInfo from 'react-native-device-info';
import { Dimensions, AsyncStorage } from 'react-native'

const AppConstant = {
    BASE_URL: 'https://mediarchive.technobd.com/app_api/',
    name: '',
    email: '',
    password: '',
    phone_number:'',
    dial_code:'',
    forgot_pass_type: 'forgot_pass_type',
    forgot_verification_code: 'forgot_verification_code',
    
    dose_form:'',
    dose_take_times:'',
    dose_repeat_times:'',
    dose_quantity:'',
    dose_unit:'',
    custom_note:'',

    dose_take_times_text: '',
    dose_repeat_times_text: '',

    user_id: 'user_id',
    user_name: 'user_name',
    user_email : 'user_email',
    user_mobile_number: 'user_mobile_number',
    user_calling_code: 'calling_code',
    user_password: 'user_password',
    jwt_token:'jwt_token',
    LOGIN_REQUIRED: false,

    p_patient_id: '',
    p_action_type: '',
    p_prescribe_by: '',
    p_description: '',
    p_day:'',
    p_month: '',
    p_year: '',
    p_image_list: [],
    p_prescription_photo:[],
    p_prescription_id:'',

    r_prescription_id: '',
    r_patient_id: '',
    r_doctor_name: '',
    r_day: '',
    r_month: '',
    r_year: '',
    r_description: '',
    r_action_type: '',
    r_report_type: '',
    r_image_list: [],
    r_report_photo:[],
    r_report_id:'',


    login_response_status:'',
    COUNTRY_NAME :'afghanistan',
    THEME_COLOR: '#0099cb',
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
    home_refresh: false,
    


    NetInfo() { false },
    
    
}
export default AppConstant;
// import DeviceInfo from 'react-native-device-info';
import {
    Dimensions,
    AsyncStorage
} from 'react-native'

const CommonValues = {

    getGender(){
        return gender = [{
                label: 'Gender',
                value: '',
                key: 'Gender',
                color: 'black'
            },
            {
                label: 'Male',
                value: 'male',
                key: 'Male',
                color: 'black'
            },
            {
                label: 'Female',
                value: 'female',
                key: 'Female',
                color: 'black'
            },

        ]
    },
    getBloodGroup(){
        return blood_groups = [{
                label: 'Blood Group',
                value: '',
                key: 'Blood Group',
                color: 'black'
            },
            {
                label: 'A +',
                value: 'A +',
                key: 'A +',
                color: 'black'
            },
            {
                label: 'A -',
                value: 'A -',
                key: 'A -',
                color: 'black'
            },
            {
                label: 'B +',
                value: 'B +',
                key: 'B +',
                color: 'black'
            }, {
                label: 'B -',
                value: 'B -',
                key: 'B -',
                color: 'black'
            },
            {
                label: 'O +',
                value: 'O +',
                key: 'O +',
                color: 'black'
            },
            {
                label: 'O -',
                value: 'O -',
                key: 'O -',
                color: 'black'
            },
            {
                label: 'AB +',
                value: 'AB +',
                key: 'AB +',
                color: 'black'
            },
            {
                label: 'AB -',
                value: 'AB -',
                key: 'AB -',
                color: 'black'
            }
        ]
    },
    getMonth(){
        return month = [{
                label: 'Month',
                value: '',
                key: 'Month',
                color: 'black'
            },
            {
                label: 'January',
                value: '01',
                key: 'January',
                color: 'black'
            },
            {
                label: 'February',
                value: '02',
                key: 'February',
                color: 'black'
            },
            {
                label: 'March',
                value: '03',
                key: 'March',
                color: 'black'
            },
            {
                label: 'April',
                value: '04',
                key: 'April',
                color: 'black'
            },
            {
                label: 'May',
                value: '05',
                key: 'May',
                color: 'black'
            },
            {
                label: 'June',
                value: '06',
                key: 'June',
                color: 'black'
            },
            {
                label: 'July',
                value: '07',
                key: 'July',
                color: 'black'
            },
            {
                label: 'August',
                value: '08',
                key: 'August',
                color: 'black'
            },
            {
                label: 'September',
                value: '09',
                key: 'September',
                color: 'black'
            },
            {
                label: 'October',
                value: '10',
                key: 'October',
                color: 'black'
            },
            {
                label: 'November',
                value: '11',
                key: 'November',
                color: 'black'
            },
            {
                label: 'December',
                value: '12',
                key: 'December',
                color: 'black'
            }
        ]
    },
    getAmPm(){
        return am_pm_list = [{
            label: 'AM',
            value: 'AM',
            key: 'AM',
            color: 'black'
        }, {
            label: 'PM',
            value: 'PM',
            key: 'PM',
            color: 'black'
        }, ]
    }
    



}
export default CommonValues;
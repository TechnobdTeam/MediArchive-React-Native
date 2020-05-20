import React, {useState} from 'react';
import {View, Button, Platform, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
    
    const IconApp = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        console.log(selectedDate)
    };
    
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };
    
    return (
        <SafeAreaView>
        <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />
        )}
        </SafeAreaView>
    );
    };

export default IconApp;
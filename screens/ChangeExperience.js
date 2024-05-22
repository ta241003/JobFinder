import React, { useState } from 'react';
import { SafeAreaView} from "react-native-safe-area-context"
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native'
import BackButton from "../buttons/BackButton";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import DateTimePicker from '@react-native-community/datetimepicker';

const ChangeExperience = () => {
    const [startDated, setstartDated] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [displayStartDate, setDisplayStartDate] = useState('');
  
    const onStartDatePickerPress = () => {
      setShowStartDatePicker(true);
    };
  
    const changeStartDate = (event, startDated) => {
      const currentStartDate = startDated || date;
      setShowStartDatePicker(false);
      setstartDated(currentStartDate);
      setDisplayStartDate(currentStartDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })); // Cập nhật giá trị ngày đã chọn lên Text
    };

    const [endDated, setendDated] = useState(new Date());
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [displayEndDate, setDisplayEndDate] = useState('');

    const onEndDatePickerPress = () => {
        setShowEndDatePicker(true);
      };
  
    const changeEndDate = (event, endDated) => {
      const currentEndDate = endDated || date;
      setShowEndDatePicker(false);
      setendDated(currentEndDate);
      setDisplayEndDate(currentEndDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })); // Cập nhật giá trị ngày đã chọn lên Text
    };

    return(
        <SafeAreaView>
            <BackButton></BackButton>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:-5}}>
                <Text style={{fontSize:18, fontWeight: 'bold'}}>Change Work Experience</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Job Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}/>
                    </View>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Company Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}/>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginTop:30}}>
                    <TouchableOpacity style={{flex:1, marginRight:10}} onPress={onStartDatePickerPress}>
                        <View>
                            <Text style={styles.title}>Start date</Text>
                            <View style={styles.inputContainer}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingBottom: 3, paddingTop: 5, marginLeft: 10 }}>{displayStartDate || 'DD/MM/YYYY'}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={startDated}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={changeStartDate}
                    />)}
                    <TouchableOpacity style={{flex:1, marginLeft:10}} onPress={onEndDatePickerPress}>
                        <View>
                            <Text style={styles.title}>End date</Text>
                            <View style={styles.inputContainer}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingBottom: 3, paddingTop: 5, marginLeft: 10}}>{displayEndDate || 'DD/MM/YYYY'}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {showEndDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={endDated}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={changeEndDate}
                    />)}
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#FFE7E1', width: 100, padding: 10, margin: 20, marginTop: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLORS.maugach, fontSize: 18 }}>Remove</Text>
                </View>
                
                <View style={{ backgroundColor: COLORS.maugach, width: 100, padding: 10, margin: 20, marginTop: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{color:COLORS.white, fontSize:18}}>Save</Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default ChangeExperience;

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    titleContainer:{
        marginTop:30
    },
    title: {
        fontSize: 18,
        color: COLORS.black
    },
    inputContainer: {
        height:40,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop:10,
        justifyContent:'center'
    },
    input: {
        fontSize: 15,
        paddingLeft:10
    }, 
})
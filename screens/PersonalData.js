import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import BackButton from '../buttons/BackButton';

const PersonalData = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [displayDate, setDisplayDate] = useState('');
  
    const onDatePickerPress = () => {
      setShowDatePicker(true);
    };
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setSelectedDate(currentDate);
      setDisplayDate(currentDate.toDateString()); // Cập nhật giá trị ngày đã chọn lên Text
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <BackButton></BackButton>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:-5}}>
                <Text style={{fontSize:20, fontWeight: 'bold',}}>Personal Data</Text>
            </View>
        

        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={ require("../assets/avatar.png") } // Thay link_to_your_image bằng đường dẫn của ảnh đại diện của người dùng
                />  
                <View style={styles.cameraIconContainer}>
                    <FontAwesome name="camera" size={15} color="white" />
                </View>                 
            </View>
        </View>
        <View style={styles.info_container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Full Name</Text>
                <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={'#83829A'}
                />
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Email Address</Text>
                <View style={styles.inputContainer}>                    
                    <TextInput
                    style={styles.input}
                    placeholder="username@gmail.com"
                    placeholderTextColor={'#83829A'}
                    />
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Location</Text>
                <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor={'#83829A'}
                />
                </View>
            </View>
            <TouchableOpacity onPress={onDatePickerPress}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Birthday</Text>
                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={{ fontSize: 18, color: '#83829A'}}>{displayDate || 'DD/MM/YYYY'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
                {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />)}

            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default PersonalData;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',  
        top: 40,
        left: 0,
        right: 0
    },
    avatarContainer: {
        position: 'relative',
        backgroundColor: '#ccc',
        borderRadius: 100,
        width: 100,
        height: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    info_container: {
        flex: 1,
        padding: 40,
        top: 20
    },
    titleContainer:{
        marginTop:30
    },
    title: {
        fontSize: 20,
        color: COLORS.hidetitle
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.hidetitle,
        paddingTop: 5, 
        paddingBottom: 5,
    },
    input: {
        fontSize: 18
    },    
    button: {
        backgroundColor: '#FF7754',
        marginTop: 50,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
      },
})
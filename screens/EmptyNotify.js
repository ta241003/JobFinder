import React from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyNotify = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home'); // Điều hướng về trang Home khi nhấn nút back
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <TouchableOpacity onPress={handleBack} style={{top: 20, left: 20, zIndex: 1 }}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={{marginTop:80, justifyContents: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22}}>No notifications</Text>
        <Text style={{fontSize:15, color:COLORS.maugach, marginTop:20 }}>You have no notifications at this time</Text>
        <Text style={{fontSize:15, color:COLORS.maugach, marginTop:5}}>thank you</Text>
        <Image
          style={{width:200, height:200, marginTop: 60}}
          source={ require("../assets/bell-alarm.png") }
        />  
      </View>
    </SafeAreaView>
  );
}

export default EmptyNotify;

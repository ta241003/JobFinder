import React from 'react';
import { Text, View, TouchableOpacity, ScrollView,StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';

const ListItem = ({company, jobname, describe}) => {
  return(
    <View style={styles.container}>
      <Image source={require("../assets/ig.png")} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.company}>{company}</Text>
        <Text style={styles.jobname}>{jobname}</Text>
        <Text style={styles.describe}>{describe}</Text>
      </View>
      <View style={{flexDirection:'column',justifyContent:'space-between', alignItems:'center'}}>
        <AntDesign name="close" size={28} color='black'/>
        <View style={{backgroundColor:'#ffe7e1',padding:5, borderRadius:10}}>
          <Text style={{color:'#ff7754'}}>Apply</Text>
        </View>
      </View>
    </View>
  );
};

const SavedJob = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home'); // Điều hướng về trang Home khi nhấn nút back
  };

  return (
    <SafeAreaView>
      <View style={styles.top_content}>
        <TouchableOpacity onPress={handleBack} style={{ zIndex: 0 }}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{justifyContent:'center', alignItems:'center',marginTop:-5}}>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>My Favorite Job</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.avatar}
              source={require('../assets/avatar.png')} 
            />
          </TouchableOpacity>
      </View>
      <ScrollView>
        <ListItem company = 'Instagram' jobname = 'UI/UX Designer' describe = 'Full time - $8k' />
        <ListItem company = 'Instagram' jobname = 'UI/UX Designer' describe = 'Full time - $8k' />
        <ListItem company = 'Instagram' jobname = 'UI/UX Designer' describe = 'Full time - $8k' />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SavedJob;

const styles = StyleSheet.create({
  top_content: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems:'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10, // Để bo tròn hình ảnh
  },
  container: {
    marginHorizontal: 20, 
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom:5,
    marginTop:15,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 50,
  },
  textContainer: {
    flex:1,
  },
  company: {
    fontSize: 17, 
    marginBottom: 3, 
    fontWeight: 'bold',  
  },
  jobname: {
    fontSize: 17,
    color: '#555555',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  describe: {
    fontSize: 15,
    color: '#555555',
  },
})
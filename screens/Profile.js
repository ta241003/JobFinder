import { ScrollView, StyleSheet, Text, View, Image, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';
import { TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UploadModal from './UploadModal';
import Avatar from './Avatar';

const ListItem = ({ iconName, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item_container}>
        <View style={styles.leftSquare}>
          <MaterialIcons name={iconName} size={24} color={COLORS.maugach} />
        </View>
        <Text style={styles.text}>{text}</Text>
        <Entypo name="chevron-thin-right" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home'); // Điều hướng về trang Home khi nhấn nút back
  };

  const PersonalData = () => {
    navigation.navigate('PersonalData'); // Điều hướng đến trang PersonalData
  };

  const ResumeAndInfo = () => {
    navigation.navigate('ResumeAndInfo'); // Điều hướng đến trang Resume
  };

  const MyApplied = () => {
    navigation.navigate('MyApplied'); // Điều hướng đến trang My Application
  };

  const Settings = () => {
    navigation.navigate('Settings'); // Điều hướng đến trang Settings
  };

  const FAQ = () => {
    navigation.navigate('FAQ'); // Điều hướng đến trang FAQ
  };

  const Policy = () => {
    navigation.navigate('Policy'); // Điều hướng đến trang Privacy & Policy
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [image, setImage] = useState();

  const uploadImage = async (mode) => {
    try {
      if(mode === "gallery"){
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality:1,
        })
      }else{
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,
      });
      if (!result.canceled){
        await saveImage(result.assets[0].uri);
      }
      }
    }catch (error){
      alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch({message}){
      alert(message);
      setModalVisible(false);
    }
  }
  
  const saveImage = async (image) => {
    try {
      setImage(image);
      setModalVisible(false);
    }catch(error){
      throw error;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView>
        <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.container_wrapped}>
            <View style={styles.avatarContainer}>
              <Avatar onButtonPress={() => setModalVisible(true)} uri={image}></Avatar>
              <UploadModal 
                modalVisible={modalVisible} 
                onBackPress={() => setModalVisible((false))}
                onCameraPress={() => uploadImage()}
                onGalleryPress={() => uploadImage("gallery")}
                onRemovePress={() => removeImage()}></UploadModal>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.black,
                marginTop: 10,
                marginBottom: 4
                }}>
                  User name
              </Text>     

              <Text style={{
                fontSize: 15,                        
                color: '#83829A',
                marginBottom: 10
                }}>
                  User mail
              </Text>                         

              <Text style={{
                fontSize: 25,                        
                color: COLORS.maugach,
                fontWeight: 'bold',
                }}>
                  5
              </Text> 

              <Text style={{
                fontSize: 18,                        
                color: COLORS.black,
                }}>
                  Applied
              </Text> 
            </View> 
          </View>
        </View>

        <View>
          <Text style={{
            fontSize: 18,
            color: '#b7b7b7',
            marginHorizontal: 30,
            marginTop: 80
          }}>ACCOUNT</Text>  
        </View>            

        <View style={styles.listContainer}>
          <ListItem iconName="person" text="Personal Data" onPress={PersonalData} />
          <ListItem iconName="file-present" text="Resume & My Info" onPress={ResumeAndInfo}/>
          <ListItem iconName="format-list-bulleted" text="My Application" onPress={MyApplied}/>
        </View>

        <View>
          <Text style={{
            fontSize: 18,
            color: '#b7b7b7',
            marginHorizontal: 30,
            marginTop:20,
          }}>OTHERS</Text>  
        </View>            

        <View style={styles.listContainer}>
          <ListItem iconName="settings" text="Setting" onPress={Settings}/>
          <ListItem iconName="question-answer" text="FAQ" onPress={FAQ}/>
          <ListItem iconName="privacy-tip" text="Privacy & Policy" onPress={Policy}/>
        </View>
                                  
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',  
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,   
    marginHorizontal: 30           
  },
  container_wrapped:{
    top:-40
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
  listContainer: {
    marginTop:10,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
  },
  leftSquare: {
    width: 40,
    height: 40,
    backgroundColor: '#FFE7E1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize:15,
    marginRight: 10,
  },
  
})
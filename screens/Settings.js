import React, { useState } from 'react';
import { SafeAreaView} from "react-native-safe-area-context"
import {Picker} from '@react-native-picker/picker'
import { ScrollView, StyleSheet, Text, View, Image, Switch, TouchableOpacity} from 'react-native'
import BackButton from "../buttons/BackButton";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import { useNavigation } from '@react-navigation/native';



const Settings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const navigation = useNavigation();

    return(
        <SafeAreaView>
            <BackButton></BackButton>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:-5}}>
                <Text style={{fontSize:18, fontWeight: 'bold',}}>Settings</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.item_container}>
                    <View style={styles.leftSquare}>
                        <MaterialIcons name="email" size={24} color={COLORS.maugach} />
                    </View>
                    <View style={{flex:1, flexDirection:"column",marginLeft:10}}>
                        <Text style={styles.text}>Contact us</Text>
                        <Text style={{color:COLORS.hidetitle}}>ouremail@gmail.com</Text>
                    </View>
                </View> 
                <View style={styles.item_container}>
                    <View style={styles.leftSquare}>
                        <AntDesign name="star" size={24} color={COLORS.maugach} />
                    </View>
                    <View style={{flex:1, flexDirection:"column",marginLeft:10}}>
                        <Text style={styles.text}>Rate us</Text>
                        <Text style={{color:COLORS.hidetitle}}>Your review is useful for us</Text>
                    </View>
                </View> 
                <View style={styles.item_container}>
                    <View style={styles.leftSquare}>
                        <MaterialCommunityIcons name="bell-ring" size={24} color={COLORS.maugach} />
                    </View>
                    <Text style={{flex: 1, fontSize:16, marginRight: 10, marginLeft:10}}>Notification</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff7754" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.item_container}>
                    <View style={styles.leftSquare}>
                        <Ionicons name="language" size={24} color={COLORS.maugach} />
                    </View>
                    <View style={{flex:1, marginLeft:10}}>
                        <View style={{ borderWidth: 2,width: 150, height:60, borderColor:COLORS.hidetitle }}>
                            <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
                            >
                                <Picker.Item label="English" value="English" />
                                <Picker.Item label="Vietnamese" value="Vietnamese" />
                            </Picker>
                        </View>
                    </View>
                </View> 
                  

                <TouchableOpacity style={styles.item_container} onPress={() => navigation.navigate("Welcome")}>
                    <View style={styles.leftSquare}>
                        <AntDesign name="logout" size={24} color={COLORS.maugach} />
                    </View>
                    <Text style={{ flex: 1, fontSize: 16, marginRight: 10, marginLeft: 10 }}>Log out</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 30,
    },
    item_container: {
        flexDirection: 'row',
        borderBottomColor: '#CCCCCC',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftSquare: {
        width: 50,
        height: 50,
        backgroundColor: '#FFE7E1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    text: {
        flex: 1,
        fontSize:16,
        marginRight: 10
    },
})
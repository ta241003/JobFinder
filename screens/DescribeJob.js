import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react';
import BackButton from "../buttons/BackButton";
import { StyleSheet, Text, View, Image,TextInput, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from "../constants/colors";
import { AntDesign } from '@expo/vector-icons';

const DescribeJob = ({navigation}) => {
    const [selectedTab, setSelectedTab] = useState("Company");

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    return(
    <SafeAreaView>
        <BackButton></BackButton>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:30}}>
            <Image style={styles.avatar} source={ require("../assets/ig.png") }></Image>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:15}}>
            <Text style={{marginBottom:3, fontWeight: 800, fontSize:18}}>Product Designer</Text>
            <Text style={{marginBottom:3}}>Full time / Hai Chau, Da Nang</Text>
            <Text>Salary: $5k</Text>
        </View>
        <View style={{flexDirection:'row', marginTop:20, marginLeft:30}}>
            <TouchableOpacity onPress={() => handleTabPress('Company')}>
                <View style={[styles.choose_button, selectedTab === 'Company' && styles.selected]}>
                    <Text style={[selectedTab === 'Company' && styles.selected_text]}>Company</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Description')}>
                <View style={[styles.choose_button, selectedTab === 'Description' && styles.selected]}>
                    <Text style={[selectedTab === 'Description' && styles.selected_text]}>Description</Text>
                </View>
            </TouchableOpacity>
        </View>

        {selectedTab === 'Company' && (
            <View style={[styles.content, selectedTab === 'Company' && styles.contentVisible]}>
                <Text>Instagram is an American photo and video sharing social networking service created by Kevin Systrom and Mike Krieger. In April 2012, Facebook acquired the service for approximately $1 billion in cash and stock. The app allows users to upload media that can be edited with filters and sorted by hashtags and geotagging. Posts can be shared publicly or with pre-approved followers. Users can browse other users' content by tags and location and see trending content. Users can like photos and follow other users to add their content to their personal feed.</Text>
            </View>
        )}

        {selectedTab === 'Description' && (
            <View style={[styles.content, selectedTab === 'Description' && styles.contentVisible]}>
                <Text>Description</Text>
            </View>
        )}

        <View style={{flexDirection:'row', marginLeft: 30, marginRight:30}}>
            <View style={styles.tym_area}>
                <AntDesign name="hearto" size={30} color={COLORS.maugach} />
            </View>
            <TouchableOpacity 
                style={{backgroundColor:COLORS.maugach,marginLeft:10, borderRadius: 10, flex:1, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigation.navigate("UploadCV")}>
                <Text style={{color:'#fff', fontSize: 18}}>Apply for jobs</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
}

export default DescribeJob;

const styles = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10
    },
    choose_button: {
        backgroundColor: "#ccc", 
        marginRight:10, 
        padding:8,
        justifyContent: 'center',
        borderRadius: 10,
    },
    selected: {
        backgroundColor: COLORS.finding,
    },
    selected_text:{
        color:'#fff'
    },
    content: {
        backgroundColor: '#fff',        
        height: 300,
        padding: 10,
        margin: 30,
        marginTop: 20,
        marginBottom: 25,
        display: 'none',        
    },
    contentVisible: {
        display: 'flex',
    },
    tym_area: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: COLORS.maugach,
        color: COLORS.maugach,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
})
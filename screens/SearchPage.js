import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, Dimensions, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'
import BackButton from '../buttons/BackButton';


const jobTypes = ["Full-time", "Part-time", "Internship"];

const data = [
  { company: 'Instagram', jobname: 'UI/UX Designer', describe: 'Full time - $8k', time: '24h' },
  // Add more data items here if needed
];

const windowHeight = Dimensions.get('window').height;

const ListItem = ({company, jobname, describe, time}) => {
  return(
      <View style={styles.whiteBox}>
        <Image source={require("../assets/ig.png")} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.company}>{company}</Text>
          <Text style={styles.jobname}>{jobname}</Text>
          <Text style={styles.describe}>{describe}</Text>
        </View>
        <View>
          <AntDesign name="hearto" size={24} color="#ff7754" />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
  );
};

const SearchPage = ({ searchTerm, setSearchTerm, handleClick }) => {
  const [activeJobType, setActiveJobType] = useState("Full-time");

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home'); // Điều hướng về trang Home khi nhấn nút back
  };

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const [selectedJob, setSelectedJob] = useState('Choose Job');

  return (
    <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity onPress={handleBack} style={{top: 20, left: 20, zIndex: 1 }}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:-5}}>
                <Text style={{fontSize:20, fontWeight: 'bold',}}>Search</Text>
            </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={toggleFilter}>
            <View style={styles.searchBtnImage}>
              <Octicons name="filter" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showFilter}
            onRequestClose={toggleFilter}>
            <View style={styles.centeredView}>
              <View style={styles.modalBackground}></View>
              <View style={styles.modalView}>
                <View style={{}}>
                  <TouchableOpacity onPress={toggleFilter} style={{position: 'absolute',top:5,right:0}}>
                    <MaterialCommunityIcons name="window-close" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={{ justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:24, fontWeight: 'bold'}}>Set Filter</Text>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize:20, fontWeight: 'bold', marginTop: 20}}>Job</Text>
                  <View style={{ backgroundColor:'#f5f5f5', height:54, borderColor:COLORS.hidetitle, marginTop:10}}>
                    <Picker
                    selectedValue={selectedJob}
                    onValueChange={(itemValue, itemIndex) => setSelectedJob(itemValue)}
                    >
                        <Picker.Item label="UI/UX Design" value="UI/UX Design" />
                        <Picker.Item label="React Native" value="React Native" />
                        <Picker.Item label="PHP" value="PHP" />
                    </Picker>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize:20, fontWeight: 'bold', marginTop: 20}}>Location</Text>
                  <View style={{ backgroundColor:'#f5f5f5', height:54, borderColor:COLORS.hidetitle, marginTop:10}}>
                    <Picker
                    selectedValue={selectedJob}
                    onValueChange={(itemValue, itemIndex) => setSelectedJob(itemValue)}
                    >
                        <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                        <Picker.Item label="Quảng Nam" value="Quảng Nam" />
                        <Picker.Item label="Hà Nội" value="Hà Nội" />
                        <Picker.Item label="TP. HCM" value="TP. HCM" />
                    </Picker>
                  </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:30}}>
                  <View><Text style={{fontSize:20, fontWeight: 'bold', marginTop: 20}}>Salary</Text></View>
                  <View style={{ backgroundColor:'#f5f5f5', width:'70%',height:54, borderColor:COLORS.hidetitle, marginTop:10}}>
                    <Picker
                    selectedValue={selectedJob}
                    onValueChange={(itemValue, itemIndex) => setSelectedJob(itemValue)}
                    >
                        <Picker.Item label="100$ - 500$" value="100$ - 500$" />
                        <Picker.Item label="500$ - 1000$" value="500$ - 1000$" />
                    </Picker>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize:20, fontWeight: 'bold', marginTop: 30, marginBottom:15}}>Job Type</Text>
                  <View style={styles.tabsContainer}>
                    <FlatList
                      data={jobTypes}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.tab(activeJobType, item)}
                          onPress={() => {
                            setActiveJobType(item);
                            // router.push(`/search/${item}`);
                          }}
                        >
                          <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item}
                      contentContainerStyle={{ columnGap: SIZES.small }}
                      horizontal
                    />
                  </View>
                </View>
                <View style={{marginTop:50, backgroundColor:"#ff7754", height:50, justifyContent:'center', alignItems:'center', borderRadius:20}}>
                  <Text style={{color:"#fff", fontSize:20}}>Apply Filters</Text>
                </View>
              </View>
            </View>
          </Modal>          
        </View>
      </View>

      <ScrollView>
        <View>
          <Text style={styles.Opportunity}>
          5 Job Opportunity
          </Text>
        </View>


        <View style={styles.container}>
          <ListItem company = 'Instagram' jobname = 'UI/UX Designer' describe = 'Full time - $3k' time = '1h' />
          <ListItem company = 'Instagram' jobname = 'Tech Leader' describe = 'Full time - $8k' time = '2h' />
          <ListItem company = 'Instagram' jobname = 'Full-stack Developer' describe = 'Full time - $20k' time = '4h' />
          <ListItem company = 'Instagram' jobname = 'Senior Developer' describe = 'Full time - $5k' time = '8h' />
          <ListItem company = 'Instagram' jobname = 'Internship' describe = 'Part time - $1k' time = '9h' />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default SearchPage;


const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",    
    marginTop: SIZES.large,
    height: 50,
    marginHorizontal: 20,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    backgroundColor: "#E6E4E6",
  },
  searchInput: {
    // fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    fontSize: 18,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.lightWhite,
  },
  Opportunity: {
    marginHorizontal: 20,
    fontSize: 18,
    marginTop: 20,
    marginLeft:25,
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  whiteBox: {
    marginHorizontal: 20, 
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    marginLeft: 25,
    marginRight:25,
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
  time: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginTop: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    height: windowHeight * 0.85,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    // fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});
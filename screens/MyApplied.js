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
          <AntDesign name="closecircle" size={24} color="#ff7754" />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
  );
};

const MyApplied = ({ searchTerm, setSearchTerm, handleClick }) => {
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
      <BackButton></BackButton>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:-5}}>
                <Text style={{fontSize:18, fontWeight: 'bold', marginBottom: 20}}>My Application</Text>
            </View>

      <ScrollView>
        <View>
          <Text style={styles.Opportunity}>
          5 Job Applied
          </Text>
        </View>


        <View style={styles.container}>
          <ListItem company = 'Instagram' jobname = 'UI/UX Designer' describe = 'Full time - $3k' time = '1h ago' />
          <ListItem company = 'Instagram' jobname = 'Tech Leader' describe = 'Full time - $8k' time = '2h ago' />
          <ListItem company = 'Instagram' jobname = 'Full-stack Developer' describe = 'Full time - $20k' time = '4h ago' />
          <ListItem company = 'Instagram' jobname = 'Senior Developer' describe = 'Full time - $5k' time = '8h ago' />
          <ListItem company = 'Instagram' jobname = 'Internship' describe = 'Part time - $1k' time = '9h ago' />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default MyApplied;


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
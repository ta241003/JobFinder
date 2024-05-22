import React, {useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';



const ListItem = ({job, onRemove, onPress}) => {
  return(
    <View style={styles.container}>
      <Image source={job.logo} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.company}>{job.name}</Text>
        <Text style={styles.jobname}>{job.job}</Text>
        <Text style={styles.describe}>{job.location}</Text>
      </View>
      <View style={{flexDirection:'column',justifyContent:'space-between', alignItems:'center'}}>
        <AntDesign name="close" size={28} color='black' onPress={onRemove}/>
        <TouchableOpacity style={{backgroundColor:'#ffe7e1',padding:5, borderRadius:10}} onPress={onPress}>
          <Text style={{color:'#ff7754'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SavedJob = ({navigation}) => {

  const handleBack = () => {
    navigation.navigate('Home'); // Điều hướng về trang Home khi nhấn nút back
  };

  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Google",
      logo: require("../assets/google.png"),
      job: "React-native Developer",
      location: "Hai Chau, Da Nang",
      description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
    },
    {
      id: 2,
      name: "Facebook",
      logo: require("../assets/facebook.png"),
      job: "Load Product Manager",
      location: "Hai Chau, Da Nang",
      description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
    },
    {
      id: 3,
      name: "Google",
      logo: require("../assets/google.png"),
      job: "Tech Leader",
      location: "Hai Chau, Da Nang",
      description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
    },
    {
      id: 4,
      name: "Google",
      logo: require("../assets/google.png"),
      job: "Tech Leader",
      location: "Hai Chau, Da Nang",
      description: "Chúng tôi đang tìm kiếm một UI/UX Designer tài năng và đam mê để tham gia vào đội ngũ của chúng tôi. Bạn sẽ có...",
    },

    // Thêm các job khác nếu cần
  ]);

  const removeJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };


  return (
    <SafeAreaView>
      <View style={styles.top_content}>
        <TouchableOpacity onPress={handleBack} style={{ zIndex: 0 }}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>My Favorite Job</Text>
        </View>
      </View>
      <ScrollView>
        {jobs.map((company) => (
          <ListItem key={company.id} job={company} onRemove={() => removeJob(company.id)} onPress={() => navigation.navigate("DescribeJob", {company})}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SavedJob;

const styles = StyleSheet.create({
  top_content: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems:'center',
    marginHorizontal: 20,
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
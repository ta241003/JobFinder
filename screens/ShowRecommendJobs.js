import { SafeAreaView } from "react-native-safe-area-context";
import {StyleSheet, View, TouchableOpacity, Image, Text, ScrollView} from "react-native";
import BackButton from "../buttons/BackButton";
import styles from "./welcome.style";
import React, { useEffect, useState } from "react";
import { firebase } from "../configFirebase";

const Recommend_Job = ({ company, onPress }) => {
	const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        // Cắt chuỗi đến maxLength ký tự
        let truncatedText = text.substr(0, maxLength);
        // Đảm bảo cắt chuỗi tại khoảng trắng gần nhất để tránh cắt giữa từ
        truncatedText = truncatedText.substr(0, Math.min(truncatedText.length, truncatedText.lastIndexOf(" ")));
        // Thêm dấu ... nếu cần
        if (truncatedText.length < text.length) {
            truncatedText += '...';
        }
        return truncatedText;
    };

	return (
		<TouchableOpacity onPress={onPress} style={styles.nearby_job_container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image source={{uri : company.image_company}} style={styles.logo} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.company}>{company.company_name}</Text>
				<Text style={styles.jobname}>{company.job_name}</Text>
				<Text style={styles.location}>{company.location}</Text>
                <Text style={styles.describe}>{truncateDescription(company.job_description, 110)}</Text>
			</View>

		</TouchableOpacity>
	);
};

const ShowRecommendJobs = ({navigation}) => {
	const [jobs, setJobs] = useState([]);

	useEffect(() =>{
		const getJobsMatchingUserExperiences = async() => {
			try {
                // Lấy tất cả người dùng từ Firestore
                const userId = firebase.auth().currentUser.uid;
                const userDoc = await firebase.firestore().collection("users").doc(userId).get();
                const allUsers = userDoc.data();
            
                // Tạo một Set để lưu trữ tất cả jobName từ experiences của người dùng
                const jobNamesSet = new Set();

                allUsers.experiences.forEach(exp => {
                    jobNamesSet.add(exp.jobName.toLowerCase());
                })

              
                // Chuyển đổi Set thành Array để sử dụng trong truy vấn Firestore
			    const jobNamesArray = Array.from(jobNamesSet);
		  
			    // Lấy tất cả các jobs từ Firestore
			    const jobsSnapshot = await firebase.firestore().collection('jobs').get();
			    const allJobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

			    // Lọc các job có job_name nằm trong jobNamesArray
			    const matchingJobs = allJobs.filter(job => 
				  jobNamesArray.some(jobName => job.job_name.toLowerCase().includes(jobName))
			    );

                if(matchingJobs.length > 0){
                    setJobs(matchingJobs);
                }
                else{
                    allJobs.sort((a, b) => b.salary - a.salary);
                    setJobs(allJobs);
                }
			  
			} catch (error) {
			  console.error("Error getting jobs: ", error);
			}
		}
        getJobsMatchingUserExperiences();
	}, []);
	
    return(
        <SafeAreaView>
            <ScrollView>
				<BackButton></BackButton>
				<Text style={{textAlign:'center', fontSize:20, marginTop:-5}}>Recommended Job</Text>
				<View style={{marginHorizontal:20, marginVertical:30}}>
					{jobs.map((company) => (
						<Recommend_Job
							key={company.id}
							company={company}
							onPress={() =>
								navigation.navigate("DescribeJob", { company })
							}
						/>
					))}
				</View>
			</ScrollView>
        </SafeAreaView>
    );
}

export default ShowRecommendJobs;
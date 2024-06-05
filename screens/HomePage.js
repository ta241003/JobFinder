import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
	ScrollView,
} from "react-native";
import styles from "./welcome.style";
import { COLORS, SIZES, icons } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../configFirebase";
import { db } from "../configFirebase"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';

const jobTypes = ["Full time", "Part time"];

const Nearby_Job = ({ company, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.nearby_job_container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image source={{uri : company.image_company}} style={styles.logo} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.company}>{company.company_name}</Text>
				<Text style={styles.jobname}>{company.job_name}</Text>
				<Text style={styles.location}>{company.location}</Text>
			</View>
		</TouchableOpacity>
	);
};

const Recommended_Job = ({ item, onPress }) => {

	return (
		<TouchableOpacity onPress={onPress} style={styles.companyCard}>
			<View style={styles.cardContent}>
				<View style={styles.logo_container}>
					<Image source={{uri : item.image_company}} style={styles.companyLogo} />
				</View>
				<View style={styles.companyInfo}>
					<Text style={styles.companyName} numberOfLines={2} ellipsizeMode="tail">{item.company_name}</Text>
					<Text style={styles.jobName}>
						{item.job_name}
					</Text>
					<Text style={styles.jobDescription}>{item.location}</Text>
				</View>
			</View>
			<Feather
				name="info"
				size={25}
				color="black"
				style={styles.heartIcon}
			/>
		</TouchableOpacity>
	);
};

// Change Password
const changePassword = () => {
	firebase
		.auth()
		.sendPasswordResetEmail(firebase.auth().currentUser.email)
		.then(() => {
			alert("Password reset email sent");
		})
		.catch((error) => {
			alert(error);
		});
};



const HomePage = ({navigation }) => {
	const [activeJobType, setActiveJobType] = useState("Full-time");
	const [userAccount, setUserAccount] = useState({});
	const [avatarUrl, setAvatarUrl] = useState("");
	const [popularjobs, setPopularJobs] = useState([]);
	const [nearbyjobs, setNearbyJobs] = useState([]);
	const [recommendjobs, setRecommendJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");


	useEffect(() =>{
		const fetchJobs = async () => {
			try {
			  const jobsCollection = await db.collection('jobs').get();
			  const jobsList = jobsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			  const nearby_list = jobsList.slice(0,3);
			  setNearbyJobs(nearby_list);

			  jobsList.sort((a, b) => b.applied_number - a.applied_number);
			  const popular_list = jobsList.slice(0, 3);
			  setPopularJobs(popular_list);
			} catch (error) {
			  console.error("Error fetching jobs: ", error);
			}
		};
	  
		fetchJobs();
		const fetchUserData = async () => {
			try {
				const userId = firebase.auth().currentUser.uid;
				const userDoc = await firebase
					.firestore()
					.collection("users")
					.doc(userId)
					.get();
				if (userDoc.exists) {
					const userData = userDoc.data();
					setUserAccount(userData);
					if (userData.Avatar_image) {
						setAvatarUrl(userData.Avatar_image);
					} else {
						console.log("User does not have an avatar image");
					}
				} else {
					console.log("User does not exist");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();

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
				console.log(matchingJobs.size);

				if(matchingJobs.length > 0){
                    setRecommendJobs(matchingJobs.slice(0, 4));
                }
                else{
                    allJobs.sort((a, b) => b.salary - a.salary);
                    setRecommendJobs(allJobs.slice(0, 4));
                }
			  
			} catch (error) {
			  console.error("Error getting jobs: ", error);
			}
		}
		getJobsMatchingUserExperiences();

	}, []);
	
	return (
		<SafeAreaView>
		<ScrollView>
		<View style={styles.head}>
			<Text style={styles.userName}>
				Hello {userAccount.FullName} 👋
			</Text>
			<TouchableOpacity
				onPress={() => navigation.navigate("Profile")}
			>
				<Image
					style={styles.avatar}
					source={
						avatarUrl
							? { uri: avatarUrl }
							: require("../assets/avatar.png")
					}
				/>
			</TouchableOpacity>
		</View>
		<View style={styles.container}>
			<Text style={styles.welcomeMessage}>
				Find your perfect job 🚀
			</Text>
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

			<TouchableOpacity
				style={styles.searchBtn}
				onPress={()=>{
					navigation.navigate("SearchResultFromHomePage", {searchTerm});
				}}
			>
				<Image
					source={icons.search}
					resizeMode="contain"
					style={styles.searchBtnImage}
				/>
			</TouchableOpacity>
		</View>

		{/* Đoạn note dưới đây là 3 button Full time, Part time, Internship của project cũ*/}
		<View style={styles.tabsContainer}>
			<FlatList
				data={jobTypes}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.tab(activeJobType, item)}
						onPress={() => {
							setActiveJobType(item);
							navigation.navigate("SearchResultFromHomePage", {item})
						}}
					>
						<Text style={styles.tabText(activeJobType, item)}>
							{item}
						</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item}
				contentContainerStyle={{ columnGap: SIZES.small }}
				horizontal
			/>
		</View>

		<View style={styles.row}>
			<View style={styles.subrow}>
				<Text style={styles.boldText}>Recommended for you</Text>
				<TouchableOpacity>
					<Text
						style={styles.showAll}
						onPress={() =>
							navigation.navigate("ShowRecommendJobs")
						}
					>
						Show all
					</Text>
				</TouchableOpacity>
			</View>

			<View>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.companyList}
				>
					{recommendjobs.map((company) => (
						<View
							key={company.id}
							style={styles.companyCardContainer}
						>
							<Recommended_Job
								item={company}
								onPress={() =>
									navigation.navigate("DescribeJob", {company})
								}
							/>
						</View>
					))}
				</ScrollView>
			</View>

			<View style={styles.subrow}>
				<Text style={styles.boldText}>Popular Jobs</Text>
				<TouchableOpacity>
					<Text
						style={styles.showAll}
						onPress={() =>
							navigation.navigate("ShowAllPopularJob")
						}
					>
						Show all
					</Text>
				</TouchableOpacity>
			</View>
			<View>
				{popularjobs.map((company) => (
					<Nearby_Job
						key={company.id}
						company={company}
						onPress={() =>
							navigation.navigate("DescribeJob", { company })
						}
					/>
				))}
			</View>

			<View style={styles.subrow}>
				<Text style={styles.boldText}>Nearby Jobs</Text>
				<TouchableOpacity>
					<Text
						style={styles.showAll}
						onPress={() =>
							navigation.navigate("ShowAllNearbyJob")
						}
					>
						Show all
					</Text>
				</TouchableOpacity>
			</View>
			<View>
				{nearbyjobs.map((company) => (
					<Nearby_Job
						key={company.id}
						company={company}
						onPress={() =>
							navigation.navigate("DescribeJob", { company })
						}
					/>
				))}
			</View>
		</View>
	</ScrollView>
		</SafeAreaView>
	);
};

export default HomePage;

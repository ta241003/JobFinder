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
import { SafeAreaView } from "react-native-safe-area-context";

const jobTypes = ["Full-time", "Part-time", "Internship"];
const companies = [
	{
		id: 1,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "React-native Developer",
		description: "$8k - Hai Chau, Da Nang",
	},
	{
		id: 2,
		name: "Facebook",
		logo: require("../assets/facebook.png"),
		job: "Load Product Manager",
		description: "$8k - Hai Chau, Da Nang",
	},
	{
		id: 3,
		name: "Google",
		logo: require("../assets/google.png"),
		job: "Tech Leader",
		description: "$8k - Hai Chau, Da Nang",
	},
	// Add more company here...
];

const renderCompanyCard = ({ item }) => {
	return (
		<TouchableOpacity style={styles.companyCard}>
			<View style={styles.cardContent}>
				<View style={styles.logo_container}>
					<Image source={item.logo} style={styles.companyLogo} />
				</View>
				<View style={styles.companyInfo}>
					<Text style={styles.companyName}>{item.name}</Text>
					<Text style={styles.jobName}>{item.job}</Text>
					<Text style={styles.jobDescription}>
						{item.description}
					</Text>
				</View>
			</View>
			<AntDesign
				name="hearto"
				size={24}
				color="black"
				style={styles.heartIcon}
			/>
		</TouchableOpacity>
	);
};

const Nearby_Job = ({ company, jobname, describe }) => {
	return (
		<View style={styles.nearby_job_container}>
			<Image source={require("../assets/ig.png")} style={styles.logo} />
			<View style={styles.textContainer}>
				<Text style={styles.company}>{company}</Text>
				<Text style={styles.jobname}>{jobname}</Text>
				<Text style={styles.describe}>{describe}</Text>
			</View>
		</View>
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

const HomePage = ({ searchTerm, setSearchTerm, handleClick, navigation }) => {
	const [activeJobType, setActiveJobType] = useState("Full-time");
	const [userName, setUserName] = useState("");

	useEffect(() => {
		firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					setUserName(snapshot.data());
				} else {
					console.log("User does not exist");
				}
			});
	});

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.head}>
					<Text style={styles.userName}>
						Hello {userName.fullName} 👋
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Profile")}
					>
						<Image
							style={styles.avatar}
							source={require("../assets/avatar.png")}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.container}>
					{/* Change password */}
					<TouchableOpacity
						onPress={() => {
							changePassword();
						}}
					>
						<Text>Change Password</Text>
					</TouchableOpacity>

					{/* Sign out */}
					<TouchableOpacity
						onPress={() => {
							firebase.auth().signOut();
						}}
					>
						<Text>Sign Out</Text>
					</TouchableOpacity>
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
						onPress={handleClick}
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
									// router.push(`/search/${item}`);
								}}
							>
								<Text
									style={styles.tabText(activeJobType, item)}
								>
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
						<Text style={styles.boldText}>Popular Jobs</Text>
						<Text style={styles.showAll}>Show all</Text>
					</View>

					<View>
						<FlatList
							data={companies}
							renderItem={renderCompanyCard}
							keyExtractor={(item) => item.id.toString()}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.companyList}
						/>
					</View>

					<View style={styles.subrow}>
						<Text style={styles.boldText}>Nearby Jobs</Text>
						<Text style={styles.showAll}>Show all</Text>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => navigation.navigate("DescribeJob")}
						>
							<Nearby_Job
								company="Instagram"
								jobname="UI/UX Designer"
								describe="Full time - $8k"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("DescribeJob")}
						>
							<Nearby_Job
								company="Instagram"
								jobname="UI/UX Designer"
								describe="Full time - $8k"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("DescribeJob")}
						>
							<Nearby_Job
								company="Instagram"
								jobname="UI/UX Designer"
								describe="Full time - $8k"
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomePage;

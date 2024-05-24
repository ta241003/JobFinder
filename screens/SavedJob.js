import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { firebase } from "../configFirebase";
import { db } from "../configFirebase";
import * as Notifications from "expo-notifications";

const ListItem = ({ job, onRemove, onPress }) => {
	return (
		<View style={styles.container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image
					source={{ uri: job.image_company }}
					style={styles.logo}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.company}>{job.company_name}</Text>
				<Text style={styles.jobname}>{job.job_name}</Text>
				<Text style={styles.describe}>{job.location}</Text>
			</View>
			<View
				style={{
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<AntDesign
					name="close"
					size={28}
					color="black"
					onPress={onRemove}
				/>
				<TouchableOpacity
					style={{
						backgroundColor: "#ffe7e1",
						padding: 5,
						borderRadius: 10,
					}}
					onPress={onPress}
				>
					<Text style={{ color: "#ff7754" }}>Apply</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const SavedJob = ({ navigation, route }) => {
	const handleBack = () => {
		navigation.navigate("Home"); // Điều hướng về trang Home khi nhấn nút back
	};

	const [jobs, setJobs] = useState([]);
	const [userFavorite, setUserFavorite] = useState([]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchJobs();
			fetchUserData(); // Hàm lấy dữ liệu từ Firestore
		});
		return unsubscribe;
	}, [navigation]);

	const fetchJobs = async () => {
		try {
			const jobsCollection = await db.collection("jobs").get();
			const jobsList = jobsCollection.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setJobs(jobsList);
		} catch (error) {
			console.error("Error fetching jobs: ", error);
		}
	};

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
				setUserFavorite(userData.favoriteJobIds);
			} else {
				console.log("User does not exist");
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	const removeFavoriteJob = async (jobId) => {
		try {
			const db = firebase.firestore();
			const currentUser = firebase.auth().currentUser; // Lấy thông tin user hiện tại
			const userId = currentUser.uid; // Lấy ID của user hiện tại

			// Lấy dữ liệu hiện tại của user từ Firestore
			const userRef = db.collection("users").doc(userId);
			const userDoc = await userRef.get();
			const userData = userDoc.data();
			let favoriteJobIds = userData.favoriteJobIds || []; // Nếu đã có dữ liệu về job iu thích, sử dụng nó, nếu không, tạo một mảng mới
			favoriteJobIds = favoriteJobIds.filter((id) => id !== jobId.id);

			await userRef.update({ favoriteJobIds: favoriteJobIds }); // Cập nhật dữ liệu trong Firestore

			console.log("Favorite job deleted to Firestore successfully!");
			NotifyUnFavoriteJob(jobId);
		} catch (error) {
			console.error("Error delete favorite job to Firestore: ", error);
		}
	};

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});

	const NotifyUnFavoriteJob = async (jobId) => {
		//show the notification to the user
		Notifications.scheduleNotificationAsync({
			//set the content of the notification
			content: {
				title: "You have unfavorited Job:",
				body: `${jobId.company_name} ${jobId.job_name}`,
			},
			trigger: null,
		});
	};

	return (
		<SafeAreaView>
			<View style={styles.top_content}>
				<TouchableOpacity onPress={handleBack} style={{ zIndex: 0 }}>
					<Ionicons name="chevron-back" size={24} color="black" />
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						My Favorite Job
					</Text>
				</View>
			</View>
			<ScrollView>
				{jobs
					.filter((company) => userFavorite.includes(company.id))
					.map((company) => (
						<ListItem
							key={company.id}
							job={company}
							onRemove={() => removeFavoriteJob(company)}
							onPress={() =>
								navigation.navigate("DescribeJob", { company })
							}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default SavedJob;

const styles = StyleSheet.create({
	top_content: {
		marginVertical: 20,
		flexDirection: "row",
		alignItems: "center",
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
		flexDirection: "row",
		marginBottom: 5,
		marginTop: 15,
	},
	logo: {
		width: 70,
		height: 70,
		marginRight: 20,
		borderRadius: 10,
	},
	textContainer: {
		flex: 1,
	},
	company: {
		fontSize: 17,
		marginBottom: 3,
		fontWeight: "bold",
	},
	jobname: {
		fontSize: 17,
		color: "#555555",
		fontWeight: "bold",
		marginBottom: 2,
	},
	describe: {
		fontSize: 15,
		color: "#555555",
	},
});

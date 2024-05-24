import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../configFirebase";

const Notify = ({ notifies }) => {
	return (
		<View style={styles.nearby_job_container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image
					source={{ uri: notifies.imageCompany }}
					style={styles.logo}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text>
					{notifies.notifyString} {notifies.jobName}
				</Text>
				<Text style={styles.location}>
					From company: {notifies.companyName}
				</Text>
				<Text>{notifies.currentTime}</Text>
			</View>
		</View>
	);
};

const Empty_Notify = () => {
	return (
		<View
			style={{
				marginTop: 80,
				justifyContents: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ fontSize: 22 }}>No notifications</Text>
			<Text
				style={{ fontSize: 15, color: COLORS.maugach, marginTop: 20 }}
			>
				You have no notifications at this time
			</Text>
			<Text style={{ fontSize: 15, color: COLORS.maugach, marginTop: 5 }}>
				thank you
			</Text>
			<Image
				style={{ width: 200, height: 200, marginTop: 60 }}
				source={require("../assets/bell-alarm.png")}
			/>
		</View>
	);
};

const EmptyNotify = () => {
	const navigation = useNavigation();

	const handleBack = () => {
		navigation.navigate("Home"); // Điều hướng về trang Home khi nhấn nút back
	};

	const [notify, setNotify] = useState([]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchUserData(); // Hàm lấy dữ liệu từ Firestore
		});
		return unsubscribe;
	}, [navigation]);

	const fetchUserData = async () => {
		try {
			const userDoc = await firebase
				.firestore()
				.collection("users")
				.doc(firebase.auth().currentUser.uid)
				.get();

			if (userDoc.exists) {
				const userData = userDoc.data();
				setNotify(userData.notifies);
			} else {
				console.log("User does not exist");
			}
		} catch (error) {
			console.error("Error fetching user data: ", error);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
			<ScrollView>
				<TouchableOpacity
					onPress={handleBack}
					style={{ top: 20, left: 20, zIndex: 1 }}
				>
					<Ionicons name="chevron-back" size={24} color="black" />
				</TouchableOpacity>
				<View style={{ marginTop: 30 }}>
					{notify.length > 0 ? (
						notify
							.slice()
							.reverse()
							.map((notifies, index) => (
								<Notify key={index} notifies={notifies} />
							))
					) : (
						<Empty_Notify />
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default EmptyNotify;

const styles = StyleSheet.create({
	nearby_job_container: {
		borderRadius: 10,
		flexDirection: "row",
		marginBottom: 10,
		backgroundColor: "#fafafa",
		padding: 10,
		marginHorizontal: 20,
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
	location: {
		fontSize: 15,
		color: "#555555",
	},
});

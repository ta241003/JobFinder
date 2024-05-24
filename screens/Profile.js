import React, { useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import COLORS from "../constants/colors";
import { firebase } from "../configFirebase";

const ListItem = ({ iconName, text, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.item_container}>
				<View style={styles.leftSquare}>
					<MaterialIcons
						name={iconName}
						size={24}
						color={COLORS.maugach}
					/>
				</View>
				<Text style={styles.text}>{text}</Text>
				<Entypo name="chevron-thin-right" size={20} color="black" />
			</View>
		</TouchableOpacity>
	);
};

const AnItem = ({ iconName, text, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.item_container}>
				<View style={styles.leftSquare}>
					<MaterialIcons
						name={iconName}
						size={24}
						color={COLORS.maugach}
					/>
				</View>
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};

const Profile = () => {
	const navigation = useNavigation();
	const [userAccount, setUserAccount] = useState("");
	const [imageUri, setImageUri] = useState(null);

	const fetchUserData = async () => {
		try {
			const snapshot = await firebase
				.firestore()
				.collection("users")
				.doc(firebase.auth().currentUser.uid)
				.get();

			if (snapshot.exists) {
				const data = snapshot.data();
				setUserAccount(data);

				// Lấy đường dẫn hình ảnh từ Avatar_image
				const avatarImage = data.Avatar_image;

				// Kiểm tra nếu Avatar_image tồn tại
				if (avatarImage) {
					// Gán đường dẫn hình ảnh vào state để hiển thị
					setImageUri(avatarImage);
				}
			} else {
				console.log("User does not exist");
			}
		} catch (error) {
			console.error("Error fetching user data: ", error);
		}
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchUserData();
		});
		return unsubscribe;
	}, [navigation]);

	const handleBack = () => {
		navigation.navigate("Home"); // Điều hướng về trang Home khi nhấn nút back
	};

	const PersonalData = () => {
		navigation.navigate("PersonalData"); // Điều hướng đến trang PersonalData
	};

	const ResumeAndInfo = () => {
		navigation.navigate("ResumeAndInfo"); // Điều hướng đến trang Resume
	};

	const MyApplied = () => {
		navigation.navigate("MyApplied"); // Điều hướng đến trang My Application
	};

	const Settings = () => {
		navigation.navigate("Settings"); // Điều hướng đến trang Settings
	};

	const FAQ = () => {
		navigation.navigate("FAQ"); // Điều hướng đến trang FAQ
	};

	const Policy = () => {
		navigation.navigate("Policy"); // Điều hướng đến trang Privacy & Policy
	};

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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
			<ScrollView>
				<TouchableOpacity
					onPress={handleBack}
					style={{
						position: "absolute",
						top: 20,
						left: 20,
						zIndex: 1,
					}}
				>
					<Ionicons name="chevron-back" size={24} color="black" />
				</TouchableOpacity>
				<View style={styles.container}>
					<View style={styles.container_wrapped}>
						<View style={styles.avatarContainer}>
							{imageUri ? (
								<Image
									source={{ uri: imageUri }}
									style={styles.avatar}
								/>
							) : (
								<Image
									source={require("../assets/none_avatar.jpg")}
									style={styles.avatar}
								/>
							)}
						</View>

						<View style={{ alignItems: "center" }}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "bold",
									color: COLORS.black,
									marginTop: 10,
									marginBottom: 4,
								}}
							>
								{userAccount.FullName}
							</Text>

							<Text
								style={{
									fontSize: 15,
									color: "#83829A",
									marginBottom: 10,
								}}
							>
								{userAccount.Email}
							</Text>

							<Text
								style={{
									fontSize: 25,
									color: COLORS.maugach,
									fontWeight: "bold",
								}}
							>
								{userAccount.Applied}
							</Text>

							<Text
								style={{
									fontSize: 18,
									color: COLORS.black,
								}}
							>
								Applied
							</Text>
						</View>
					</View>
				</View>

				<View>
					<Text
						style={{
							fontSize: 18,
							color: "#b7b7b7",
							marginHorizontal: 30,
							marginTop: 80,
						}}
					>
						ACCOUNT
					</Text>
				</View>

				<View style={styles.listContainer}>
					<ListItem
						iconName="person"
						text="Personal Data"
						onPress={PersonalData}
					/>
					<ListItem
						iconName="file-present"
						text="Resume & My Info"
						onPress={ResumeAndInfo}
					/>
					<ListItem
						iconName="format-list-bulleted"
						text="My Application"
						onPress={MyApplied}
					/>
					<AnItem
						iconName="password"
						text="Change Password"
						onPress={() => {
							changePassword();
						}}
					/>
					<AnItem
						iconName="logout"
						text="Log out"
						onPress={() => {
							firebase.auth().signOut();
						}}
					/>
				</View>

				<View>
					<Text
						style={{
							fontSize: 18,
							color: "#b7b7b7",
							marginHorizontal: 30,
							marginTop: 20,
						}}
					>
						OTHERS
					</Text>
				</View>

				<View style={styles.listContainer}>
					<ListItem
						iconName="settings"
						text="Setting"
						onPress={Settings}
					/>
					<ListItem
						iconName="question-answer"
						text="FAQ"
						onPress={FAQ}
					/>
					<ListItem
						iconName="privacy-tip"
						text="Privacy & Policy"
						onPress={Policy}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		top: 60,
		left: 0,
		right: 0,
		backgroundColor: "#FAFAFA",
		borderRadius: 20,
		marginHorizontal: 30,
	},
	container_wrapped: {
		top: -40,
	},
	avatarContainer: {
		position: "relative",
		backgroundColor: "#ccc",
		borderRadius: 100,
		width: 100,
		height: 100,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	avatar: {
		width: "100%",
		height: "100%",
	},
	listContainer: {
		marginTop: 10,
		justifyContent: "center",
		paddingHorizontal: 30,
	},
	item_container: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "#CCCCCC",
		paddingVertical: 10,
	},
	leftSquare: {
		width: 40,
		height: 40,
		backgroundColor: "#FFE7E1",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	text: {
		flex: 1,
		fontSize: 15,
		marginRight: 10,
	},
});

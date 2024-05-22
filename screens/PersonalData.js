import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import BackButton from "../buttons/BackButton";
import * as ImagePicker from "expo-image-picker";
import UploadModal from "./UploadModal";
import Avatar from "./Avatar";
import { firebase } from "../configFirebase";

const PersonalData = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [displayDate, setDisplayDate] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [image, setImage] = useState(null);
	const [userAccount, setUserAccount] = useState({});
	const [initialBirthday, setInitialBirthday] = useState("");
	const [fullName, setFullName] = useState("");
	const [location, setLocation] = useState("");

	useEffect(() => {
		firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					const userData = snapshot.data();
					setUserAccount(userData);
					setFullName(userData.FullName);
					setLocation(userData.Location);
					const birthday = userData.Birthday;
					setInitialBirthday(birthday);
				} else {
					console.log("User does not exist");
				}
			});
	}, []);

	const onDatePickerPress = () => {
		setShowDatePicker(true);
	};

	const onChange = (event, selectedDate) => {
		if (selectedDate) {
			setShowDatePicker(false);
			setSelectedDate(selectedDate);
			setDisplayDate(selectedDate.toDateString());
		}
	};

	const uploadImage = async (mode) => {
		try {
			let result;
			if (mode === "gallery") {
				await ImagePicker.requestMediaLibraryPermissionsAsync();
				result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [1, 1],
					quality: 1,
				});
			} else {
				await ImagePicker.requestCameraPermissionsAsync();
				result = await ImagePicker.launchCameraAsync({
					cameraType: ImagePicker.CameraType.front,
					allowsEditing: true,
					aspect: [1, 1],
					quality: 1,
				});
			}
			if (!result.canceled) {
				await saveImage(result.assets[0].uri);
			}
		} catch (error) {
			alert("Error uploading image: " + error.message);
			setModalVisible(false);
		}
	};

	const removeImage = async () => {
		try {
			saveImage(null);
		} catch ({ message }) {
			alert(message);
			setModalVisible(false);
		}
	};

	const saveImage = async (image) => {
		try {
			setImage(image);
			setModalVisible(false);
		} catch (error) {
			throw error;
		}
	};

	const saveUserData = () => {
		// if (!fullName.trim() || !location.trim() || !displayDate.trim()) {
		// 	Alert.alert("Error", "Please fill in all fields");
		// 	return;
		// }

		const userRef = firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid);

		userRef
			.update({
				FullName: fullName,
				Location: location,
				Birthday: selectedDate.toDateString(),
			})
			.then(() => {
				console.log("User data updated successfully");
			})
			.catch((error) => {
				console.error("Error updating user data: ", error);
			});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
			<BackButton />
			<View style={styles.header}>
				<Text style={styles.headerText}>Personal Data</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.avatarContainer}>
					<Avatar
						onButtonPress={() => setModalVisible(true)}
						uri={image}
					/>
					<UploadModal
						modalVisible={modalVisible}
						onBackPress={() => setModalVisible(false)}
						onCameraPress={() => uploadImage()}
						onGalleryPress={() => uploadImage("gallery")}
						onRemovePress={() => removeImage()}
					/>
				</View>
			</View>
			<View style={styles.info_container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Full Name</Text>
					<View style={styles.inputContainer}>
						<TextInput
							onChangeText={setFullName}
							style={styles.input}
							placeholder={userAccount.FullName}
							placeholderTextColor={"#83829A"}
						/>
					</View>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Email Address</Text>
					<View style={styles.inputContainer}>
						<Text style={styles.input}>{userAccount.Email}</Text>
					</View>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Location</Text>
					<View style={styles.inputContainer}>
						<TextInput
							onChangeText={setLocation}
							style={styles.input}
							placeholder={userAccount.Location}
							placeholderTextColor={"#83829A"}
						/>
					</View>
				</View>
				<TouchableOpacity onPress={onDatePickerPress}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Birthday</Text>
						<View style={styles.inputContainer}>
							<Text style={styles.input}>
								{displayDate || initialBirthday}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
				{showDatePicker && (
					<DateTimePicker
						testID="dateTimePicker"
						value={selectedDate}
						mode="date"
						is24Hour={true}
						display="default"
						onChange={onChange}
					/>
				)}
				<TouchableOpacity style={styles.button} onPress={saveUserData}>
					<Text style={styles.text}>Save</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default PersonalData;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		top: 20,
		left: 0,
		right: 0,
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
	info_container: {
		flex: 1,
		padding: 40,
		top: 20,
	},
	titleContainer: {
		marginTop: 20,
	},
	title: {
		fontSize: 20,
		color: COLORS.hidetitle,
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.hidetitle,
		paddingTop: 5,
		paddingBottom: 5,
	},
	input: {
		fontSize: 18,
		color: "#83829a",
	},
	button: {
		backgroundColor: "#FF7754",
		marginTop: 50,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: -5,
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
	},
});

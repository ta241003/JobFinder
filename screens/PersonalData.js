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
import { useNavigation } from "@react-navigation/native";

const PersonalData = () => {
	const navigation = useNavigation();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [displayDate, setDisplayDate] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [image, setImage] = useState(null);
	const [userAccount, setUserAccount] = useState({});
	const [fullName, setFullName] = useState("");
	const [location, setLocation] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userDoc = await firebase
					.firestore()
					.collection("users")
					.doc(firebase.auth().currentUser.uid)
					.get();

				if (userDoc.exists) {
					const userData = userDoc.data();
					setUserAccount(userData);
					setFullName(userData.FullName);
					setLocation(userData.Location);
					const birthday = new Date(userData.Birthday);
					setSelectedDate(birthday);
					setDisplayDate(birthday.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }));
					setImage(userData.Avatar_image); // Load image from Firestore
				} else {
					console.log("User does not exist");
				}
			} catch (error) {
				console.error("Error fetching user data: ", error);
			}
		};

		fetchUserData();
	}, []);

	const onDatePickerPress = () => {
		setShowDatePicker(true);
	};

	const onChange = (event, selectedDate) => {
		if (selectedDate) {
			setShowDatePicker(false);
			setSelectedDate(selectedDate);
			setDisplayDate(selectedDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }));
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

	const saveImage = async (imageUri) => {
		try {
			setModalVisible(false);

			const userRef = firebase
				.firestore()
				.collection("users")
				.doc(firebase.auth().currentUser.uid);

			// Tạo một tên ngẫu nhiên cho hình ảnh trong Storage
			const imageName = `${Date.now()}.jpg`;

			// Tạo đường dẫn trong Storage
			const response = await fetch(imageUri);
			const blob = await response.blob();
			const storageRef = firebase
				.storage()
				.ref()
				.child(`avatars/${imageName}`);

			// Upload hình ảnh vào Storage
			await storageRef.put(blob);

			// Lấy URL của hình ảnh từ Storage
			const imageURL = await storageRef.getDownloadURL();

			// Lưu URL vào Firestore
			await userRef.update({
				Avatar_image: imageURL,
			});

			// Đặt hình ảnh cho giao diện người dùng
			setImage(imageURL);
		} catch (error) {
			throw error;
		}
	};

	const saveUserData = () => {
		if (!fullName.trim() || !location.trim() || !displayDate.trim()) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		const userRef = firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid);

		userRef
			.update({
				FullName: fullName,
				Location: location,
				Birthday: selectedDate.toDateString(),
				Avatar_image: image, // Save image URL
			})
			.then(() => {
				console.log("User data updated successfully");
				Alert.alert("Success", "User data updated successfully", [
					{
						text: "OK",
						onPress: () => navigation.goBack(),
					},
				]);
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
							value={fullName}
							onChangeText={setFullName}
							style={styles.input}
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
							value={location}
							onChangeText={setLocation}
							style={styles.input}
						/>
					</View>
				</View>
				<TouchableOpacity onPress={onDatePickerPress}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Birthday</Text>
						<View style={styles.inputContainer}>
							<Text style={styles.input}>{displayDate}</Text>
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

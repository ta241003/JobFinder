import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	Button,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../configFirebase";

const ChangeExperience = ({ route }) => {
	const navigation = useNavigation();
	const { experience } = route.params;
	const [startDated, setstartDated] = useState(new Date());
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [displayStartDate, setDisplayStartDate] = useState("");

	// Bổ sung state để lưu thông tin mới của kinh nghiệm
	const [jobName, setJobName] = useState(experience.jobName);
	const [companyName, setCompanyName] = useState(experience.companyName);
	const [startDate, setStartDate] = useState(experience.startDate);
	const [endDate, setEndDate] = useState(experience.endDate);

	const onStartDatePickerPress = () => {
		setShowStartDatePicker(true);
	};

	const changeStartDate = (event, startDated) => {
		const currentStartDate = startDated || date;
		setShowStartDatePicker(false);
		setstartDated(currentStartDate);
		const formattedDate = currentStartDate.toLocaleDateString("en-GB", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		setDisplayStartDate(formattedDate); // Cập nhật giá trị ngày đã chọn lên Text
		setStartDate(formattedDate); // Cập nhật state startDate
		console.log("Selected Start Date:", formattedDate); // In giá trị ra console
	};

	const [endDated, setendDated] = useState(new Date());
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [displayEndDate, setDisplayEndDate] = useState("");

	const onEndDatePickerPress = () => {
		setShowEndDatePicker(true);
	};

	const changeEndDate = (event, endDated) => {
		const currentEndDate = endDated || date;
		setShowEndDatePicker(false);
		setendDated(currentEndDate);
		const formattedDate = currentEndDate.toLocaleDateString("en-GB", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		setDisplayEndDate(formattedDate); // Cập nhật giá trị ngày đã chọn lên Text
		setEndDate(formattedDate); // Cập nhật state endDate
		console.log("Selected End Date:", formattedDate); // In giá trị ra console
	};

	// Bổ sung hàm cập nhật kinh nghiệm trong Firestore
	const updateExperienceInFirestore = async () => {
		try {
			const userId = firebase.auth().currentUser.uid;
			const userRef = firebase
				.firestore()
				.collection("users")
				.doc(userId);
			const doc = await userRef.get();
			if (doc.exists) {
				const userData = doc.data();
				const updatedExperiences = userData.experiences.map((exp) => {
					if (
						exp.jobName === experience.jobName &&
						exp.companyName === experience.companyName &&
						exp.startDate === experience.startDate &&
						exp.endDate === experience.endDate
					) {
						console.log("Matching experience found. Updating...");
						return {
							...exp,
							jobName,
							companyName,
							startDate,
							endDate,
						};
					}
					return exp;
				});
				console.log("Updated experiences:", updatedExperiences);
				await userRef.update({ experiences: updatedExperiences });
				console.log("Experience updated successfully.");
				navigation.goBack();
			} else {
				console.log("User does not exist");
			}
		} catch (error) {
			console.error("Error updating experience in Firestore: ", error);
		}
	};

	// Bổ sung hàm xoá kinh nghiệm trong Firestore
	const removeExperienceFromFirestore = async () => {
		try {
			const userId = firebase.auth().currentUser.uid;
			const userRef = firebase
				.firestore()
				.collection("users")
				.doc(userId);
			const doc = await userRef.get();
			if (doc.exists) {
				const userData = doc.data();
				const updatedExperiences = userData.experiences.filter(
					(exp) =>
						!(
							exp.jobName === experience.jobName &&
							exp.companyName === experience.companyName
						)
				);
				await userRef.update({ experiences: updatedExperiences });
				navigation.goBack();
			} else {
				console.log("User does not exist");
			}
		} catch (error) {
			console.error("Error removing experience from Firestore: ", error);
		}
	};

	return (
		<SafeAreaView>
			<BackButton></BackButton>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: -5,
				}}
			>
				<Text style={{ fontSize: 18, fontWeight: "bold" }}>
					Change Work Experience
				</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Job name</Text>
					<View style={styles.inputContainer}>
						<TextInput
							onChangeText={setJobName}
							style={styles.input}
							placeholder={experience.jobName}
							placeholderTextColor="black"
						/>
					</View>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Company name</Text>
					<View style={styles.inputContainer}>
						<TextInput
							onChangeText={setCompanyName}
							style={styles.input}
							placeholder={experience.companyName}
							placeholderTextColor="black"
						/>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginTop: 30 }}>
					<TouchableOpacity
						style={{ flex: 1, marginRight: 10 }}
						onPress={onStartDatePickerPress}
					>
						<View>
							<Text style={styles.title}>Start time</Text>
							<View style={styles.inputContainer}>
								<View>
									<Text
										style={{
											fontSize: 15,
											paddingBottom: 3,
											paddingTop: 5,
											marginLeft: 10,
										}}
									>
										{displayStartDate ||
											experience.startDate}
									</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
					{showStartDatePicker && (
						<DateTimePicker
							testID="dateTimePicker"
							value={startDated}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={changeStartDate}
						/>
					)}
					<TouchableOpacity
						style={{ flex: 1, marginLeft: 10 }}
						onPress={onEndDatePickerPress}
					>
						<View>
							<Text style={styles.title}>End time</Text>
							<View style={styles.inputContainer}>
								<View>
									<Text
										style={{
											fontSize: 15,
											paddingBottom: 3,
											paddingTop: 5,
											marginLeft: 10,
										}}
									>
										{displayEndDate || experience.endDate}
									</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
					{showEndDatePicker && (
						<DateTimePicker
							testID="dateTimePicker"
							value={endDated}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={changeEndDate}
						/>
					)}
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: "#FFE7E1",
						width: 100,
						padding: 10,
						margin: 20,
						marginTop: 10,
						borderRadius: 20,
						alignItems: "center",
						justifyContent: "center",
					}}
					onPress={removeExperienceFromFirestore} // Xoá kinh nghiệm khi nhấn nút "Remove"
				>
					<Text style={{ color: COLORS.maugach, fontSize: 18 }}>
						Remove
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: COLORS.maugach,
						width: 100,
						padding: 10,
						margin: 20,
						marginTop: 10,
						borderRadius: 20,
						alignItems: "center",
						justifyContent: "center",
					}}
					onPress={updateExperienceInFirestore} // Cập nhật kinh nghiệm khi nhấn nút "Save"
				>
					<Text style={{ color: COLORS.white, fontSize: 18 }}>
						Save
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ChangeExperience;

const styles = StyleSheet.create({
	container: {
		padding: 30,
	},
	titleContainer: {
		marginTop: 30,
	},
	title: {
		fontSize: 18,
		color: COLORS.black,
	},
	inputContainer: {
		height: 40,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		marginTop: 10,
		justifyContent: "center",
	},
	input: {
		fontSize: 15,
		paddingLeft: 10,
	},
});

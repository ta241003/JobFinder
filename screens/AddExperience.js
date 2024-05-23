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

const AddExperience = () => {
	const navigation = useNavigation();

	const [jobName, setJobName] = useState(""); // Thêm state cho jobName
	const [companyName, setCompanyName] = useState(""); // Thêm state cho companyName
	const [startDated, setstartDated] = useState(new Date());
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [displayStartDate, setDisplayStartDate] = useState("");
	const [endDated, setendDated] = useState(new Date());
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [displayEndDate, setDisplayEndDate] = useState("");

	const onStartDatePickerPress = () => {
		setShowStartDatePicker(true);
	};

	const changeStartDate = (event, startDated) => {
		const currentStartDate = startDated || date;
		setShowStartDatePicker(false);
		setstartDated(currentStartDate);
		setDisplayStartDate(
			currentStartDate.toLocaleDateString("en-GB", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
		); // Cập nhật giá trị ngày đã chọn lên Text
	};

	const onEndDatePickerPress = () => {
		setShowEndDatePicker(true);
	};

	const changeEndDate = (event, endDated) => {
		const currentEndDate = endDated || date;
		setShowEndDatePicker(false);
		setendDated(currentEndDate);
		setDisplayEndDate(
			currentEndDate.toLocaleDateString("en-GB", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
		); // Cập nhật giá trị ngày đã chọn lên Text
	};

	const saveExperienceToFirestore = async (
		jobName,
		companyName,
		startDate,
		endDate
	) => {
		try {
			const db = firebase.firestore();
			const currentUser = firebase.auth().currentUser; // Lấy thông tin user hiện tại
			const userId = currentUser.uid; // Lấy ID của user hiện tại

			// Chuyển đổi startDate và endDate thành chuỗi ngày tháng năm
			const formattedStartDate = startDate.toLocaleDateString("en-GB", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
			const formattedEndDate = endDate.toLocaleDateString("en-GB", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});

			// Tạo đối tượng Experience
			const experience = {
				jobName: jobName,
				companyName: companyName,
				startDate: formattedStartDate, // Lưu startDate dưới dạng chuỗi ngày tháng năm
				endDate: formattedEndDate, // Lưu endDate dưới dạng chuỗi ngày tháng năm
			};

			// Lấy dữ liệu hiện tại của user từ Firestore
			const userRef = db.collection("users").doc(userId);
			const userDoc = await userRef.get();

			if (userDoc.exists) {
				// Nếu user đã tồn tại trong Firestore
				const userData = userDoc.data();
				let experiences = userData.experiences || []; // Nếu đã có dữ liệu về kinh nghiệm, sử dụng nó, nếu không, tạo một mảng mới
				experiences.push(experience); // Thêm thông tin kinh nghiệm mới vào mảng
				await userRef.update({ experiences: experiences }); // Cập nhật dữ liệu trong Firestore
			} else {
				// Nếu user chưa tồn tại trong Firestore
				await userRef.set({ experiences: [experience] }); // Tạo một user mới với thông tin kinh nghiệm
			}

			console.log("Experience added to Firestore successfully!");
			navigation.goBack();
		} catch (error) {
			console.error("Error adding experience to Firestore: ", error);
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
					Add Work Experience
				</Text>
			</View>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Job Name</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={jobName} // Thêm giá trị value và onChangeText
							onChangeText={(text) => setJobName(text)} // Cập nhật giá trị của jobName khi TextInput thay đổi
						/>
					</View>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Company Name</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={companyName} // Thêm giá trị value và onChangeText
							onChangeText={(text) => setCompanyName(text)} // Cập nhật giá trị của companyName khi TextInput thay đổi
						/>
					</View>
				</View>

				<View style={{ flexDirection: "row", marginTop: 30 }}>
					<TouchableOpacity
						style={{ flex: 1, marginRight: 10 }}
						onPress={onStartDatePickerPress}
					>
						<View>
							<Text style={styles.title}>Start date</Text>
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
										{displayStartDate || "DD/MM/YYYY"}
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
							<Text style={styles.title}>End date</Text>
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
										{displayEndDate || "DD/MM/YYYY"}
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
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<TouchableOpacity
					onPress={() => {
						saveExperienceToFirestore(
							jobName, // Thay jobName bằng state của TextInput cho Job Name
							companyName, // Thay companyName bằng state của TextInput cho Company Name
							startDated, // Thay startDated bằng state của DatePicker cho Start date
							endDated // Thay endDated bằng state của DatePicker cho End date
						);
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.maugach,
							width: 100,
							padding: 10,
							marginTop: 10,
							borderRadius: 20,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={{ color: COLORS.white, fontSize: 18 }}>
							Add
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default AddExperience;

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

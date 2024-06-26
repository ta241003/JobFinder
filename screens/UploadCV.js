import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	Platform,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import COLORS from "../constants/colors";
import { firebase } from "../configFirebase"; // Ensure this import is correct
import * as MailComposer from "expo-mail-composer";
import * as Notifications from "expo-notifications";

const UploadCV = ({ navigation, route }) => {
	const { company } = route.params;
	const [cvFile, setCvFile] = useState("");
	const [description, setDescription] = useState("");
	const [isAvailable, setIsAvailable] = useState(false);

	const notificationListener = useRef();
	const responseListener = useRef();

	const [notifyOption, setNotifyOption] = useState(false); // Khai báo biến lưu trữ giá trị Notify_option

	// Function để lấy giá trị Notify_option từ Firestore và console.log
	const fetchNotifyOption = async () => {
		try {
			const db = firebase.firestore();
			const currentUser = firebase.auth().currentUser;
			const userId = currentUser.uid;

			const userRef = db.collection("users").doc(userId);
			const userDoc = await userRef.get();

			if (userDoc.exists) {
				const userData = userDoc.data();
				const notifyOptionValue = userData.Notify_option; // Lấy giá trị của trường Notify_option từ dữ liệu người dùng
				setNotifyOption(notifyOptionValue); // Lưu giá trị vào state
				console.log("Notify Option Value:", notifyOptionValue); // Console.log giá trị
			} else {
				console.log("User document not found!");
			}
		} catch (error) {
			console.error("Error fetching notify option:", error);
		}
	};

	const setTimeNow = () => {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		const day = now.getDate().toString().padStart(2, "0");
		const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Tháng tính từ 0-11, nên cần +1
		const year = now.getFullYear();
		const formattedTime = `${hours}:${minutes} ${day} thg ${month}, ${year}`;
		return formattedTime;
	};

	useEffect(() => {
		async function checkAvailability() {
			const isMailAvailable = await MailComposer.isAvailableAsync();
			setIsAvailable(isMailAvailable);
		}
		checkAvailability();

		fetchNotifyOption();

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				console.log(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(
				responseListener.current
			);
		};
	}, []);

	const handleDocumentSelection = async () => {
		try {
			const res = await DocumentPicker.getDocumentAsync({
				type: "application/pdf",
			});
			const assets = res.assets;
			const file = assets[0];
			const pdfFile = {
				name: file.name.split(".")[0],
				uri: file.uri,
				type: file.mimeType,
				size: file.size,
			};
			setCvFile(pdfFile);
		} catch (err) {
			Alert.alert("Error", "Failed to pick document: " + err.message);
		}
	};

	const updateAppliedNumber = async () => {
		try {
			console.log("Starting to update applied number...");
			console.log(
				`Searching for job with email: ${company.company_email} and name: ${company.company_name}`
			);

			const jobQuerySnapshot = await firebase
				.firestore()
				.collection("jobs")
				.where("company_email", "==", company.company_email)
				.where("company_name", "==", company.company_name)
				.get();

			console.log("Query snapshot size: ", jobQuerySnapshot.size);

			if (!jobQuerySnapshot.empty) {
				const jobDoc = jobQuerySnapshot.docs[0];
				console.log("Job found: ", jobDoc.id, jobDoc.data());
				await jobDoc.ref.update({
					applied_number: firebase.firestore.FieldValue.increment(1),
				});
				console.log("Successfully updated applied number.");
			} else {
				console.log("No matching job found in Firestore.");
			}
		} catch (error) {
			console.error("Error updating applied number: ", error);
		}
	};

	const sendMail = async () => {
		try {
			const result = await MailComposer.composeAsync({
				subject: "JOB APPLICATION",
				body: description,
				recipients: [company.company_email],
				attachments: [cvFile.uri],
			});

			if (result.status === MailComposer.MailComposerStatus.SENT) {
				await updateAppliedNumber();
				await updateAppliedField();
				saveJobApplication();
				if (notifyOption === true) {
					sendNotification();
				}
				const notify_apllied = "You applied successfully job:";
				saveNotify(
					notify_apllied,
					company.job_name,
					company.company_name,
					company.image_company,
					setTimeNow()
				);
				navigation.navigate("UploadCVSuccess", { company, cvFile });
			} else {
				Alert.alert("Failed to send email");
			}
		} catch (error) {
			Alert.alert("Error", "Failed to send email: " + error.message);
		}
	};

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});

	const sendNotification = async () => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Successfully submitted application",
				body: `${company.job_name} position at ${company.company_name}`,
				data: {
					image: company.image_company,
					jobName: company.job_name,
					companyName: company.company_name,
					jobType: company.job_type,
					salary: company.salary,
					address: company.company_info,
				},
			},
			trigger: null,
		});
	};

	const updateAppliedField = async () => {
		try {
			const currentUser = firebase.auth().currentUser;
			if (currentUser) {
				const userRef = firebase
					.firestore()
					.collection("users")
					.doc(currentUser.uid);
				await userRef.update({
					Applied: firebase.firestore.FieldValue.increment(1),
				});
				console.log(
					"Successfully updated 'applied' field in the user's document."
				);
			} else {
				console.log("No user is currently logged in.");
			}
		} catch (error) {
			console.error(
				"Error updating 'applied' field in the user's document: ",
				error
			);
		}
	};

	const saveJobApplication = async () => {
		try {
			const currentUser = firebase.auth().currentUser;
			if (currentUser) {
				const userDoc = await firebase
					.firestore()
					.collection("users")
					.doc(currentUser.uid)
					.get();
				const userData = userDoc.data();
				if (userData) {
					await firebase
						.firestore()
						.collection("jobs_application")
						.add({
							Candidate_email: userData.Email,
							Candidate_fullName: userData.FullName,
							company_email: company.company_email,
							company_name: company.company_name,
							company_image: company.image_company,
							job_name: company.job_name,
							job_type: company.job_type,
							company_info: company.company_info,
							salary: company.salary,
							upload_time:
								firebase.firestore.FieldValue.serverTimestamp(),
						});
					console.log("Successfully saved job application.");
				} else {
					console.log("No user data found in Firestore.");
				}
			} else {
				console.log("No user is currently logged in.");
			}
		} catch (error) {
			console.error("Error saving job application: ", error);
		}
	};

	const saveNotify = async (
		notifyString,
		jobName,
		companyName,
		imageCompany,
		currentTime
	) => {
		try {
			const db = firebase.firestore();
			const currentUser = firebase.auth().currentUser; // Lấy thông tin user hiện tại
			const userId = currentUser.uid; // Lấy ID của user hiện tại

			// Tạo đối tượng Experience
			const notify = {
				notifyString: notifyString,
				jobName: jobName,
				companyName: companyName,
				imageCompany: imageCompany,
				currentTime: currentTime,
			};

			// Lấy dữ liệu hiện tại của user từ Firestore
			const userRef = db.collection("users").doc(userId);
			const userDoc = await userRef.get();

			if (userDoc.exists) {
				// Nếu user đã tồn tại trong Firestore
				const userData = userDoc.data();
				let notifies = userData.notifies || []; // Nếu đã có dữ liệu về kinh nghiệm, sử dụng nó, nếu không, tạo một mảng mới
				notifies.push(notify); // Thêm thông tin kinh nghiệm mới vào mảng
				await userRef.update({ notifies: notifies }); // Cập nhật dữ liệu trong Firestore
			} else {
				// Nếu user chưa tồn tại trong Firestore
				await userRef.set({ notifies: [notify] }); // Tạo một user mới với thông tin kinh nghiệm
			}

			console.log("Notify added to Firestore successfully!");
		} catch (error) {
			console.error("Error adding notify to Firestore: ", error);
		}
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ marginTop: 20 }}>
					<BackButton></BackButton>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginTop: 30,
							marginHorizontal: 30,
						}}
					>
						<Image
							style={styles.avatar}
							source={{ uri: company.image_company }}
						></Image>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginTop: 15,
							marginHorizontal: 30,
						}}
					>
						<Text
							style={{
								marginBottom: 3,
								fontWeight: "500",
								fontSize: 18,
							}}
						>
							{company.job_name}
						</Text>
						<Text style={{ marginBottom: 5 }}>
							{company.company_name}
						</Text>
						<Text style={{ marginBottom: 5 }}>
							Job Type: {company.job_type}
						</Text>
						<Text style={{ marginBottom: 5 }}>
							Salary: {company.salary} milions
						</Text>
						<Text style={{ marginBottom: 5, textAlign: "center" }}>
							Address: {company.company_info}
						</Text>
						<Text>Deadline for submittion: {company.deadline}</Text>
					</View>
				</View>
				<View style={{ marginLeft: 30, marginTop: 40 }}>
					<Text
						style={{
							fontWeight: "500",
							marginBottom: 5,
							fontSize: 16,
						}}
					>
						Upload CV
					</Text>
					<Text>Add your CV/resume to apply for a job</Text>
				</View>
				<TouchableOpacity
					style={styles.upload_container}
					onPress={handleDocumentSelection}
				>
					{cvFile ? (
						<>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<MaterialCommunityIcons
									name="file-pdf-box"
									size={70}
									color="#b22222"
								/>
								<Text>{cvFile.name}</Text>
							</View>
						</>
					) : (
						<>
							<Text style={{ color: COLORS.maugach }}>
								Upload your file here
							</Text>
							<Feather
								name="upload"
								size={24}
								color={COLORS.maugach}
							/>
						</>
					)}
				</TouchableOpacity>
				<View style={{ margin: 30, marginBottom: 10 }}>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 16,
							marginBottom: 10,
						}}
					>
						Information
					</Text>
					<View
						style={{
							borderWidth: 1,
							borderColor: "#d9d9d9",
							height: 120,
						}}
					>
						<TextInput
							multiline={true}
							placeholder="Write a few words to send to the employer"
							value={description}
							onChangeText={(text) => setDescription(text)}
						></TextInput>
					</View>
				</View>
				{isAvailable ? (
					<TouchableOpacity
						style={{
							backgroundColor: description
								? COLORS.maugach
								: "#d3d3d3",
							marginHorizontal: 30,
							marginBottom: 20,
							height: 50,
							borderRadius: 20,
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={sendMail}
						disabled={!description}
					>
						<Text style={{ color: "#fff", fontSize: 18 }}>
							Apply for jobs
						</Text>
					</TouchableOpacity>
				) : (
					<Text>Email not available</Text>
				)}
				<StatusBar style="auto" />
			</ScrollView>
		</SafeAreaView>
	);
};

export default UploadCV;

const styles = StyleSheet.create({
	avatar: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	upload_container: {
		backgroundColor: "#edecf1",
		height: 80,
		margin: 30,
		marginTop: 20,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: "dashed",
		borderColor: "#83829a",
		justifyContent: "center",
		alignItems: "center",
	},
});

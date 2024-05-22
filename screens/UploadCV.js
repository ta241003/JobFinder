import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
} from "react-native";
import BackButton from "../buttons/BackButton";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import COLORS from "../constants/colors";
import * as MailComposer from "expo-mail-composer";

const UploadCV = ({ navigation, route }) => {
	const { company } = route.params;
	const [cvFile, setCvFile] = useState("");
	const [description, setDescription] = useState("");

	const [isAvailable, setIsAvailable] = useState(false);
	const [subject, setSubject] = useState(undefined);
	const [email, setEmail] = useState(undefined);
	const [attachment, setAttachment] = useState(undefined);

	const handleDocumentSelection = async () => {
		try {
			const res = await DocumentPicker.getDocumentAsync({
				type: "application/pdf",
			});

			const assets = res.assets;

			const file = assets[0];
			console.log(file);

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

	useEffect(() => {
		async function checkAvailability() {
			const isMailAvailable = await MailComposer.isAvailableAsync();
			setIsAvailable(isMailAvailable);
		}

		checkAvailability();
	}, []);

	const sendMail = async () => {
		try {
			const result = await MailComposer.composeAsync({
				subject: "ĐƠN XIN VIỆC LÀM",
				body: description,
				recipients: ["lethibinhminh1307@gmail.com"],
				attachments: [cvFile.uri],
			});

			if (result.status === MailComposer.MailComposerStatus.SENT) {
				navigation.navigate("UploadCVSuccess", { company, cvFile });
			} else {
				Alert.alert("Failed to send email");
			}
		} catch (error) {
			Alert.alert("Error", "Failed to send email: " + error.message);
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
						}}
					>
						<Image
							style={styles.avatar}
							source={require("../assets/ig.png")}
						></Image>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginTop: 15,
						}}
					>
						<Text
							style={{
								marginBottom: 3,
								fontWeight: "500",
								fontSize: 18,
							}}
						>
							{company.job}
						</Text>
						<Text style={{ marginBottom: 3 }}>
							{company.location}
						</Text>
						<Text>{company.name}</Text>
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
							placeholder="Explain why you are the right person for this job"
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
							marginLeft: 30,
							marginRight: 30,
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

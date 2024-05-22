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
	Modal,
	Dimensions,
	Button,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

const windowHeight = Dimensions.get("window").height;

const ListExperience = ({ job, company, time, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.item_container}>
				<View style={styles.leftSquare}>
					<MaterialIcons
						name="work"
						size={24}
						color={COLORS.maugach}
					/>
				</View>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<Text style={styles.text}>{job}</Text>
					<Text style={{ color: COLORS.hidetitle }}>{company}</Text>
					<Text style={{ color: COLORS.hidetitle }}>{time}</Text>
				</View>
				<Feather name="edit-3" size={20} color={COLORS.maugach} />
			</View>
		</TouchableOpacity>
	);
};

const ListSkill = ({ skill }) => {
	return (
		<View
			style={{
				borderWidth: 1,
				borderColor: COLORS.maugach,
				borderStyle: "solid",
				borderRadius: 20,
				height: 35,
				paddingLeft: 10,
				paddingRight: 10,
				margin: 5,
				marginLeft: 0,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: COLORS.maugach }}>{skill}</Text>
		</View>
	);
};

const ResumeAndInfo = () => {
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState(
		"Hi, I’m users, a web designer with 3 year experience..."
	); // Nội dung ban đầu

	const handleEditPress = () => {
		setEditing(true);
	};

	const handleSavePress = () => {
		setEditing(false);
	};

	const navigation = useNavigation();
	const AddExperience = () => {
		navigation.navigate("AddExperience");
	};

	const ChangeExperience = () => {
		navigation.navigate("ChangeExperience");
	};

	const [skills, setSkills] = useState([
		"Singing",
		"Team work",
		"Communication",
		"Leader",
	]);
	const [modalVisible, setModalVisible] = useState(false);
	const [newSkill, setNewSkill] = useState("");

	const addSkill = () => {
		setSkills([...skills, newSkill]);
		setNewSkill("");
		setModalVisible(false);
	};

	const [cvFile, setCvFile] = useState(null);

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

			setCvFile(pdfFile.name);
		} catch (err) {
			Alert.alert("Error", "Failed to pick document: " + err.message);
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
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					Resume and Info
				</Text>
			</View>
			<ScrollView>
				<TouchableOpacity
					style={styles.resume_container}
					onPress={handleDocumentSelection}
				>
					<View style={{ paddingBottom: 10, fontSize: 18 }}>
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
										size={30}
										color="#b22222"
									/>
									<Text>{cvFile}</Text>
								</View>
							</>
						) : (
							<>
								<Text>Upload your file here</Text>
							</>
						)}
					</View>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<Feather
							name="edit-3"
							size={24}
							color={COLORS.maugach}
						/>
						<Text style={{ color: COLORS.maugach, paddingLeft: 5 }}>
							Edit resume
						</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.resume_container}>
					<View
						style={{ flexDirection: "row", justifyItems: "center" }}
					>
						<Text
							style={{ flex: 1, fontSize: 18, marginBottom: 10 }}
						>
							About me
						</Text>
					</View>
					{editing ? (
						<View>
							<TextInput
								style={{ fontSize: 15 }}
								multiline
								value={content}
								onChangeText={setContent}
							/>
							<TouchableOpacity onPress={handleSavePress}>
								<Text style={{ color: COLORS.maugach }}>
									Save
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity onPress={handleEditPress}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										flex: 1,
										fontSize: 15,
										marginBottom: 10,
										color: COLORS.hidetitle,
									}}
								>
									{content}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.resume_container}>
					<View
						style={{ flexDirection: "row", justifyItems: "center" }}
					>
						<Text
							style={{ flex: 1, fontSize: 18, marginBottom: 10 }}
						>
							Experience
						</Text>
						<MaterialIcons
							name="add"
							size={24}
							color={COLORS.maugach}
							onPress={AddExperience}
						/>
					</View>
					<View style={styles.listExperience}>
						<ListExperience
							job="UX/UI"
							company="Facebook"
							time="Jan 2018 - 3 year 8 month"
							onPress={ChangeExperience}
						/>
						<ListExperience
							job="UX/UI"
							company="Facebook"
							time="Jan 2018 - 3 year 8 month"
							onPress={ChangeExperience}
						/>
					</View>
				</View>
				<View style={styles.skill_container}>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<Text
							style={{ flex: 1, fontSize: 18, marginBottom: 10 }}
						>
							Skill
						</Text>
						<MaterialIcons
							name="add"
							size={24}
							color={COLORS.maugach}
							onPress={() => setModalVisible(true)}
						/>
					</View>
					<View style={styles.listSkill}>
						{skills.map((skill, index) => (
							<ListSkill key={index} skill={skill} />
						))}
					</View>

					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => setModalVisible(false)}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalBackground}></View>
							<View style={styles.modalView}>
								<TextInput
									style={{
										fontSize: 18,
										marginBottom: 20,
										borderBottomColor: "#ccc",
										borderBottomWidth: 1,
										paddingVertical: 5,
									}}
									placeholder="Enter new skill"
									value={newSkill}
									onChangeText={setNewSkill}
								/>
								<View style={{ flexDirection: "row" }}>
									<View
										style={{ width: 70, marginRight: 30 }}
									>
										<Button
											color={COLORS.maugach}
											title="OK"
											onPress={addSkill}
										/>
									</View>
									<View style={{ width: 70 }}>
										<Button
											color={COLORS.maugach}
											title="Cancel"
											onPress={() =>
												setModalVisible(false)
											}
										/>
									</View>
								</View>
							</View>
						</View>
					</Modal>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ResumeAndInfo;

const styles = StyleSheet.create({
	resume_container: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		padding: 20,
	},
	listExperience: {
		marginTop: 10,
		justifyContent: "center",
	},
	item_container: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "#CCCCCC",
		paddingVertical: 10,
	},
	leftSquare: {
		width: 50,
		height: 60,
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
	skill_container: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		marginBottom: 60,
		padding: 20,
	},
	listSkill: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
	},
	modalBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		backgroundColor: "white",
		margin: 20,
		width: "90%",
		height: windowHeight * 0.18,
		alignItems: "center",
		justifyContent: "center",
	},
});

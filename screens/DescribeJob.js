import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import BackButton from "../buttons/BackButton";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../configFirebase";

const DescribeJob = ({ navigation, route }) => {
	const [selectedTab, setSelectedTab] = useState("Description");

	const handleTabPress = (tab) => {
		setSelectedTab(tab);
	};

	const { company } = route.params;

	const lines_job_description = company.job_description.split("-");
	const lines_requirements = company.requirements.split("-");
	const lines_benefit = company.benefit.split("-");

	const saveFavoriteJob = async (jobId) => {
		try {
			const db = firebase.firestore();
			const currentUser = firebase.auth().currentUser; // Lấy thông tin user hiện tại
			const userId = currentUser.uid; // Lấy ID của user hiện tại
	
			// Lấy dữ liệu hiện tại của user từ Firestore
			const userRef = db.collection("users").doc(userId);
			const userDoc = await userRef.get();
	
			if (userDoc.exists) {
				// Nếu user đã tồn tại trong Firestore
				const userData = userDoc.data();
				let favoriteJobIds = userData.favoriteJobIds || []; // Nếu đã có dữ liệu về job iu thích, sử dụng nó, nếu không, tạo một mảng mới
				if (favoriteJobIds.includes(jobId)) { // Kiểm tra xem jobId có trong mảng chưa
					favoriteJobIds = favoriteJobIds.filter(id => id !== jobId);
				}else{
					favoriteJobIds.push(jobId);
				} // Thêm jobId vào mảng nếu chưa tồn tại
				
				await userRef.update({ favoriteJobIds: favoriteJobIds }); // Cập nhật dữ liệu trong Firestore
			}else{
				// Nếu user chưa tồn tại trong Firestore
				await userRef.set({ favoriteJobIds: [jobId] }); // Tạo một user mới với thông tin job iu thích
			}
	
			console.log("Favorite job added to Firestore successfully!");
		} catch (error) {
			console.error("Error adding favorite job to Firestore: ", error);
		}
	};

	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const checkFavoriteStatus = async () => {
			const isJobFavorite = await checkFavoriteJob(company.id);
			setIsFavorite(isJobFavorite);
		};

		checkFavoriteStatus();
	}, [company.id]); // Chạy lại effect khi id của công việc thay đổi

	const toggleFavorite = async () => {
		if (isFavorite) {
			// Nếu công việc đã được yêu thích, bấm lần nữa để bỏ yêu thích
			await saveFavoriteJob(company.id); // Cập nhật trạng thái yêu thích
			setIsFavorite(false); // Cập nhật trạng thái của icon
		} else {
			await saveFavoriteJob(company.id); // Cập nhật trạng thái yêu thích
			setIsFavorite(true); // Cập nhật trạng thái của icon
		}
	};

	const iconName = isFavorite ? "heart" : "hearto";

	const checkFavoriteJob = async (jobId) => {
		try {
			const db = firebase.firestore();
			const currentUser = firebase.auth().currentUser; // Lấy thông tin user hiện tại
			const userId = currentUser.uid; // Lấy ID của user hiện tại
	
			// Lấy dữ liệu hiện tại của user từ Firestore
			const userRef = db.collection("users").doc(userId);
			const userDoc = await userRef.get();
			const userData = userDoc.data();
			let favoriteJobIds = userData.favoriteJobIds || []; // Nếu đã có dữ liệu về job iu thích, sử dụng nó, nếu không, tạo một mảng mới
			if (favoriteJobIds.includes(jobId)) { // Kiểm tra xem jobId có trong mảng chưa
				return true; // Trả về true nếu jobId có trong mảng
			} else {
				return false; // Trả về false nếu jobId không có trong mảng
			}
		} catch (error) {
			console.error("Error checking favorite job in Firestore: ", error);
			return false; // Trả về false nếu có lỗi xảy ra
		}
	};
	
	

	return (
		<SafeAreaView>
			<ScrollView>
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
							fontWeight: 800,
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
						Salary: {company.salary}$
					</Text>
					<Text style={{ marginBottom: 5, textAlign: "center" }}>
						Address: {company.company_info}
					</Text>
					<Text>Deadline for submittion: {company.deadline}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						marginTop: 20,
						marginLeft: 30,
					}}
				>
					<TouchableOpacity
						onPress={() => handleTabPress("Description")}
					>
						<View
							style={[
								styles.choose_button,
								selectedTab === "Description" &&
									styles.selected,
							]}
						>
							<Text
								style={[
									selectedTab === "Description" &&
										styles.selected_text,
								]}
							>
								Description
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleTabPress("Requirements")}
					>
						<View
							style={[
								styles.choose_button,
								selectedTab === "Requirements" &&
									styles.selected,
							]}
						>
							<Text
								style={[
									selectedTab === "Requirements" &&
										styles.selected_text,
								]}
							>
								Requirements
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleTabPress("Benefits")}
					>
						<View
							style={[
								styles.choose_button,
								selectedTab === "Benefits" && styles.selected,
							]}
						>
							<Text
								style={[
									selectedTab === "Benefits" &&
										styles.selected_text,
								]}
							>
								Benefits
							</Text>
						</View>
					</TouchableOpacity>
				</View>

				{selectedTab === "Description" && (
					<View
						style={[
							styles.content,
							selectedTab === "Description" &&
								styles.contentVisible,
						]}
					>
						<ScrollView nestedScrollEnabled={true}>
							{lines_job_description
								.slice(1)
								.map((line, index) => (
									<Text key={index + 1}>
										{line.startsWith(" ")
											? "\u2022 " + line.trim()
											: line.trim()}
									</Text>
								))}
						</ScrollView>
					</View>
				)}

				{selectedTab === "Requirements" && (
					<View
						style={[
							styles.content,
							selectedTab === "Requirements" &&
								styles.contentVisible,
						]}
					>
						<ScrollView nestedScrollEnabled={true}>
							{lines_requirements.slice(1).map((line, index) => (
								<Text key={index + 1}>
									{line.startsWith(" ")
										? "\u2022 " + line.trim()
										: line.trim()}
								</Text>
							))}
						</ScrollView>
					</View>
				)}

				{selectedTab === "Benefits" && (
					<View
						style={[
							styles.content,
							selectedTab === "Benefits" && styles.contentVisible,
						]}
					>
						<ScrollView nestedScrollEnabled={true}>
							{lines_benefit.slice(1).map((line, index) => (
								<Text key={index + 1}>
									{line.startsWith(" ")
										? "\u2022 " + line.trim()
										: line.trim()}
								</Text>
							))}
						</ScrollView>
					</View>
				)}

				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 30,
						marginBottom: 20,
					}}
				>
					<TouchableOpacity style={styles.tym_area} onPress={toggleFavorite}>
						<AntDesign
							name={iconName}
							size={30}
							color={COLORS.maugach}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.maugach,
							marginLeft: 10,
							borderRadius: 10,
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() =>
							navigation.navigate("UploadCV", { company })
						}
					>
						<Text style={{ color: "#fff", fontSize: 18 }}>
							Apply for jobs
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default DescribeJob;

const styles = StyleSheet.create({
	avatar: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	choose_button: {
		backgroundColor: "#ccc",
		marginRight: 10,
		padding: 8,
		justifyContent: "center",
		borderRadius: 10,
	},
	selected: {
		backgroundColor: COLORS.finding,
	},
	selected_text: {
		color: "#fff",
	},
	content: {
		backgroundColor: "#fff",
		height: 300,
		padding: 10,
		margin: 30,
		marginTop: 20,
		marginBottom: 25,
		display: "none",
	},
	contentVisible: {
		display: "flex",
	},
	tym_area: {
		borderWidth: 2,
		borderRadius: 10,
		borderColor: COLORS.maugach,
		color: COLORS.maugach,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
});

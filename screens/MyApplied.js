import React, { useState, useEffect } from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../configFirebase";

const ListItem = ({
	jobCompany,
	jobName,
	jobCompanyLogo,
	jobType,
	jobSalary,
	jobTimeApplied,
}) => {
	return (
		<View style={styles.whiteBox}>
			<Image
				source={{ uri: jobCompanyLogo }}
				style={styles.logo}
				resizeMode="contain"
			/>
			<View style={styles.textContainer}>
				<View style={styles.row}>
					<Text
						style={styles.company}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{jobCompany}
					</Text>
					<Text style={styles.jobTimeApplied}>{jobTimeApplied}</Text>
				</View>
				<Text>{jobName}</Text>
				<View style={styles.row2}>
					<Text>{jobType} - </Text>
					<Text>{jobSalary} $</Text>
				</View>
			</View>
		</View>
	);
};

const MyApplied = () => {
	const navigation = useNavigation();
	const [appliedJobs, setAppliedJobs] = useState([]);

	const handleBack = () => {
		navigation.navigate("Home");
	};

	useEffect(() => {
		const fetchAppliedJobs = async () => {
			try {
				const currentUser = firebase.auth().currentUser;
				if (currentUser) {
					const userDoc = await firebase
						.firestore()
						.collection("users")
						.doc(currentUser.uid)
						.get();
					if (userDoc.exists) {
						const userData = userDoc.data();
						const userEmail = userData.Email;
						const userFullName = userData.FullName;

						const jobsApplicationSnapshot = await firebase
							.firestore()
							.collection("jobs_application")
							.get();
						const matchedJobs = [];

						jobsApplicationSnapshot.forEach((doc) => {
							const jobData = doc.data();
							if (
								jobData.Candidate_email === userEmail &&
								jobData.Candidate_fullName === userFullName
							) {
								matchedJobs.push({
									company: jobData.company_name,
									jobname: jobData.job_name,
									companyLogo: jobData.company_image,
									jobType: jobData.job_type,
									salary: jobData.salary,
									time: new Date(
										jobData.upload_time.seconds * 1000
									).toLocaleDateString(), // Chuyển đổi thời gian
								});
							}
						});

						setAppliedJobs(matchedJobs);
					}
				}
			} catch (error) {
				console.error("Error fetching applied jobs: ", error);
			}
		};

		fetchAppliedJobs();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BackButton onPress={handleBack} />
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: -5,
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						marginBottom: 20,
					}}
				>
					My Application
				</Text>
			</View>

			<ScrollView>
				<View>
					<Text style={styles.Opportunity}>
						{appliedJobs.length} Job Applied
					</Text>
				</View>

				<View style={styles.container}>
					{appliedJobs.map((job, index) => (
						<ListItem
							key={index}
							jobCompany={job.company}
							jobName={job.jobname}
							jobCompanyLogo={job.companyLogo}
							jobType={job.jobType}
							jobSalary={job.salary}
							jobTimeApplied={job.time}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyApplied;

const styles = StyleSheet.create({
	searchContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 20,
		height: 50,
		marginHorizontal: 20,
	},
	searchWrapper: {
		flex: 1,
		backgroundColor: "#E6E4E6",
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		height: "100%",
	},
	searchInput: {
		width: "100%",
		height: "100%",
		paddingHorizontal: 20,
		fontSize: 18,
	},
	searchBtn: {
		width: 50,
		height: "100%",
		backgroundColor: "#FFC107",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	searchBtnImage: {
		width: "50%",
		height: "50%",
		tintColor: "#FFFFFF",
	},
	Opportunity: {
		marginHorizontal: 20,
		fontSize: 20,
		marginTop: 20,
		marginLeft: 25,
	},
	container: {
		alignItems: "center",
		marginTop: 20,
	},
	whiteBox: {
		marginHorizontal: 20,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		height: 120,
		marginLeft: 25,
		marginRight: 25,
	},
	logo: {
		width: 70,
		height: 70,
		marginRight: 20,
		borderRadius: 50,
	},
	textContainer: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	row2: {
		flexDirection: "row",
		marginBottom: 5,
	},
	company: {
		fontSize: 17,
		marginBottom: 3,
		fontWeight: "bold",
		flex: 1, // Thêm thuộc tính này
	},
	jobTimeApplied: {
		marginLeft: 10,
		fontSize: 14,
		color: "#888",
	},
	jobname: {
		fontSize: 17,
		color: "#555555",
		fontWeight: "bold",
		marginBottom: 2,
	},
	describe: {
		fontSize: 15,
		color: "#555555",
	},
	time: {
		fontSize: 16,
		marginTop: 12,
	},
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
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
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		width: "100%",
		height: "85%",
	},
	tab: (activeJobType, item) => ({
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: activeJobType === item ? "#FFC107" : "#C4C4C4",
	}),
	tabText: (activeJobType, item) => ({
		color: activeJobType === item ? "#FFC107" : "#C4C4C4",
	}),
	backButton: {
		position: "absolute",
		top: 40,
		left: 20,
		zIndex: 1,
	},
});

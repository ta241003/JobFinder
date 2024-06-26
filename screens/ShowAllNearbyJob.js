import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Text,
	ScrollView,
} from "react-native";
import BackButton from "../buttons/BackButton";
import { AntDesign } from "@expo/vector-icons";
import styles from "./welcome.style";
import { db } from "../configFirebase";

const Nearby_Job = ({ company, onPress }) => {
	const truncateDescription = (text, maxLength) => {
		if (text.length <= maxLength) {
			return text;
		}
		// Cắt chuỗi đến maxLength ký tự
		let truncatedText = text.substr(0, maxLength);
		// Đảm bảo cắt chuỗi tại khoảng trắng gần nhất để tránh cắt giữa từ
		truncatedText = truncatedText.substr(
			0,
			Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))
		);
		// Thêm dấu ... nếu cần
		if (truncatedText.length < text.length) {
			truncatedText += "...";
		}
		return truncatedText;
	};

	return (
		<TouchableOpacity onPress={onPress} style={styles.nearby_job_container}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Image
					source={{ uri: company.image_company }}
					style={styles.logo}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.company}>{company.company_name}</Text>
				<Text style={styles.jobname}>{company.job_name}</Text>
				<Text style={styles.location}>{company.location}</Text>
				<Text style={styles.describe}>
					{truncateDescription(company.job_description, 110)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const ShowAllNearbyJob = ({ navigation }) => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const jobsCollection = await db.collection("jobs").get();
				const jobsList = jobsCollection.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setJobs(jobsList);
			} catch (error) {
				console.error("Error fetching jobs: ", error);
			}
		};

		fetchJobs();
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				<BackButton></BackButton>
				<Text style={{textAlign:'center', fontSize:20, marginTop:-5}}>Nearby Job</Text>
				<View style={{ marginHorizontal: 20, marginVertical: 30 }}>
					{jobs.map((company) => (
						<Nearby_Job
							key={company.id}
							company={company}
							onPress={() =>
								navigation.navigate("DescribeJob", { company })
							}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ShowAllNearbyJob;

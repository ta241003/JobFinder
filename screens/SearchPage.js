import React, { useState, useEffect } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
	Modal,
	Dimensions,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, icons } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import BackButton from "../buttons/BackButton";
import { firebase } from "../configFirebase";

const windowHeight = Dimensions.get("window").height;
const jobTypes = ["Full time", "Part time"];
const jobSalary = [200, 500, 800, 1000];
const jobName = [
	"Java",
	"NodeJS",
	"JavaScript",
	"Python",
	"HTML/CSS",
	"Flutter",
	"React Native",
	"Kotlin",
	"PHP",
	".NET",
];

const ListItem = ({ company, jobname, location, image, onPress }) => {
	return (
		<TouchableOpacity style={styles.whiteBox} onPress={onPress}>
			<Image source={{ uri: image }} style={styles.logo} />
			<View style={styles.textContainer}>
				<Text style={styles.company}>{jobname}</Text>
				<Text style={styles.jobname}>{company}</Text>
				<Text style={styles.describe}>{location}</Text>
			</View>
		</TouchableOpacity>
	);
};

const SearchPage = () => {
	const [jobs, setJobs] = useState([]);
	const [activeJobType, setActiveJobType] = useState("");
	const [selectedJob, setSelectedJob] = useState("");
	const onJobChange = (itemValue, itemIndex) => {
		setSelectedJob(itemValue);
	};

	const [selectedLocation, setSelectedLocation] = useState("");
	const onLocationChange = (itemValue, itemIndex) => {
		setSelectedLocation(itemValue);
	};

	const [selectedSalary, setSelectedSalary] = useState("");
	const onSalaryChange = (itemValue, itemIndex) => {
		setSelectedSalary(itemValue);
	};

	const navigation = useNavigation();

	const handleBack = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: "Home" }],
		});
	};

	const [showFilter, setShowFilter] = useState(false);

	const toggleFilter = () => {
		setShowFilter(!showFilter);
	};

	const searchFilter_job = async () => {
		try {
			const jobsCollection = await firebase
				.firestore()
				.collection("jobs")
				.get();
			const jobsList = jobsCollection.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			// Convert the search term to lower case for case-insensitive comparison
			const lowerCaseJobType = activeJobType ? activeJobType.toLowerCase() : '';
        	const lowerCaseSelectedJob = selectedJob ? selectedJob.toLowerCase() : '';
        	const lowerCaseSelectedLocation = selectedLocation ? selectedLocation.toLowerCase() : '';

			// Filter the jobs to include those where the search term matches any attribute
			const filteredJobs = jobsList.filter((job) => {
				const { job_type, job_name, salary_level, location } = job;

				const jobTypeMatch = lowerCaseJobType ? job_type.toLowerCase().includes(lowerCaseJobType) : true;
            	const jobNameMatch = lowerCaseSelectedJob ? job_name.toLowerCase().includes(lowerCaseSelectedJob) : true;
            	const locationMatch = lowerCaseSelectedLocation ? location.toLowerCase().includes(lowerCaseSelectedLocation) : true;
				const salaryMatch = selectedSalary ? salary_level.includes(selectedSalary) : true;
            	
				return jobTypeMatch && jobNameMatch && locationMatch && salaryMatch;
			});

			setJobs(filteredJobs);
		} catch (error) {
			console.error("Error fetching jobs: ", error);
		}
	};

	const applyFilters = () => {
		toggleFilter(); // Ẩn modal
		searchFilter_job(); // Áp dụng bộ lọc
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TouchableOpacity
				onPress={handleBack}
				style={{ top: 20, left: 20, zIndex: 1 }}
			>
				<Ionicons name="chevron-back" size={24} color="black" />
			</TouchableOpacity>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: -5,
				}}
			>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>Search</Text>
			</View>

			<View style={styles.searchContainer}>
				<View style={styles.searchWrapper}>
					<Text style={{ fontSize: 18, color: "#c0c0c0" }}>
						What are you looking for?
					</Text>
				</View>
				<View>
					<TouchableOpacity
						style={styles.searchBtn}
						onPress={toggleFilter}
					>
						<View style={styles.searchBtnImage}>
							<Octicons name="filter" size={26} color="#fff" />
						</View>
					</TouchableOpacity>
					<Modal
						animationType="slide"
						transparent={true}
						visible={showFilter}
						onRequestClose={toggleFilter}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalBackground}></View>
							<View style={styles.modalView}>
								<View style={{}}>
									<TouchableOpacity
										onPress={toggleFilter}
										style={{
											position: "absolute",
											top: 5,
											right: 0,
										}}
									>
										<MaterialCommunityIcons
											name="window-close"
											size={24}
											color="black"
										/>
									</TouchableOpacity>
									<View
										style={{
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Text
											style={{
												fontSize: 24,
												fontWeight: "bold",
											}}
										>
											Set Filter
										</Text>
									</View>
								</View>
								<View>
									<Text
										style={{
											fontSize: 20,
											fontWeight: "bold",
											marginTop: 20,
										}}
									>
										Job
									</Text>
									<View
										style={{
											backgroundColor: "#f5f5f5",
											height: 54,
											borderColor: COLORS.hidetitle,
											marginTop: 10,
										}}
									>
										<Picker
											selectedValue={selectedJob}
											style={styles.picker}
											onValueChange={onJobChange}
										>
											<Picker.Item label="Choose job" value="" />
											{jobName.map((job, index) => (
												<Picker.Item
													label={job}
													value={job}
													key={index}
												/>
											))}
										</Picker>
									</View>
								</View>
								<View>
									<Text
										style={{
											fontSize: 20,
											fontWeight: "bold",
											marginTop: 20,
										}}
									>
										Location
									</Text>
									<View
										style={{
											backgroundColor: "#f5f5f5",
											height: 54,
											borderColor: COLORS.hidetitle,
											marginTop: 10,
										}}
									>
										<Picker
											selectedValue={selectedLocation}
											onValueChange={onLocationChange}
										>
											<Picker.Item label="Choose location" value="" />
											<Picker.Item
												label="Da Nang"
												value="Da Nang"
											/>
											<Picker.Item
												label="Hue"
												value="Hue"
											/>
											<Picker.Item
												label="Ha Noi"
												value="Ha Noi"
											/>
											<Picker.Item
												label="Ho Chi Minh"
												value="Ho Chi Minh"
											/>
										</Picker>
									</View>
								</View>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginTop: 30,
									}}
								>
									<View>
										<Text
											style={{
												fontSize: 20,
												fontWeight: "bold",
												marginTop: 20,
											}}
										>
											Salary
										</Text>
									</View>
									<View
										style={{
											backgroundColor: "#f5f5f5",
											width: "70%",
											height: 54,
											borderColor: COLORS.hidetitle,
											marginTop: 10,
										}}
									>
										<Picker
											selectedValue={selectedSalary}
											onValueChange={onSalaryChange}
										>
											<Picker.Item
												label="Choose salary"
												value=""
											/>
											<Picker.Item
												label="Less than 200$"
												value="Less than 200$"
											/>
											<Picker.Item
												label="200$ - 500$"
												value="200$ - 500$"
											/>
											<Picker.Item
												label="500$ - 800$"
												value="500$ - 800$"
											/>
											<Picker.Item
												label="800$ - 1000$"
												value="800$ - 1000$"
											/>
											<Picker.Item
												label="More than 1000$"
												value="More than 1000$"
											/>
										</Picker>
									</View>
								</View>
								<View>
									<Text
										style={{
											fontSize: 20,
											fontWeight: "bold",
											marginTop: 30,
											marginBottom: 15,
										}}
									>
										Job Type
									</Text>
									<View style={styles.tabsContainer}>
										<FlatList
											data={jobTypes}
											renderItem={({ item }) => (
												<TouchableOpacity
													style={styles.tab(
														activeJobType,
														item
													)}
													onPress={() => {
														setActiveJobType(item);
														// router.push(`/search/${item}`);
													}}
												>
													<Text
														style={styles.tabText(
															activeJobType,
															item
														)}
													>
														{item}
													</Text>
												</TouchableOpacity>
											)}
											keyExtractor={(item) => item}
											contentContainerStyle={{
												columnGap: SIZES.small,
											}}
											horizontal
										/>
									</View>
								</View>
								<View
									style={{
										marginTop: 50,
										backgroundColor: "#ff7754",
										height: 50,
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 20,
									}}
								>
									<TouchableOpacity onPress={applyFilters}>
										<Text
											style={{
												color: "#fff",
												fontSize: 20,
											}}
										>
											Apply Filters
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>
				</View>
			</View>

			<ScrollView>
				<View>
					<Text style={styles.Opportunity}>
						{jobs.length} Job Opportunity
					</Text>
				</View>

				<View style={styles.container}>
					{jobs.map((company) => (
						<ListItem
							key={company.id}
							company={company.company_name}
							jobname={company.job_name}
							location={company.location}
							image={company.image_company}
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

export default SearchPage;

const styles = StyleSheet.create({
	searchContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: SIZES.large,
		height: 50,
		marginHorizontal: 20,
	},
	searchWrapper: {
		flex: 1,
		backgroundColor: COLORS.white,
		marginRight: SIZES.small,
		justifyContent: "center",
		paddingLeft: 15,
		borderRadius: SIZES.medium,
		height: "100%",
		backgroundColor: "#E6E4E6",
	},
	searchInput: {
		// fontFamily: FONT.regular,
		width: "100%",
		height: "100%",
		paddingHorizontal: SIZES.medium,
		fontSize: 18,
	},
	searchBtn: {
		width: 50,
		height: "100%",
		backgroundColor: COLORS.tertiary,
		borderRadius: SIZES.medium,
		justifyContent: "center",
		alignItems: "center",
	},
	searchBtnImage: {
		width: "50%",
		height: "50%",
		tintColor: COLORS.lightWhite,
	},
	Opportunity: {
		marginHorizontal: 20,
		fontSize: 18,
		marginTop: 20,
		marginLeft: 25,
	},
	container: {
		alignItems: "center",
		marginTop: 20,
	},
	whiteBox: {
		marginHorizontal: 25,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		height: 100,
		marginBottom: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	logo: {
		width: 70,
		height: 70,
		marginHorizontal: 20,
		borderRadius: 10,
	},
	textContainer: {
		flex: 1,
	},
	company: {
		fontSize: 17,
		marginBottom: 3,
		fontWeight: "bold",
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
		// fontWeight: 'bold',
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
		height: windowHeight * 0.85,
	},
	tab: (activeJobType, item) => ({
		paddingVertical: SIZES.small / 2,
		paddingHorizontal: SIZES.small,
		borderRadius: SIZES.medium,
		borderWidth: 1,
		borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
	}),
	tabText: (activeJobType, item) => ({
		// fontFamily: FONT.medium,
		color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
	}),
});

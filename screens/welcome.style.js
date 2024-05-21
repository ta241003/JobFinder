import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginHorizontal: 20,
	},
	head: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginVertical: 30,
	},
	menu: {
		marginTop: 50,
		marginBottom: 20,
		width: 30,
		height: 30,
		// borderRadius: 10,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 20, // Để bo tròn hình ảnh
	},
	userName: {
		// fontFamily: FONT.regular,
		fontSize: SIZES.large,
		color: "#ff6347",
		fontWeight: "bold",
	},
	welcomeMessage: {
		// fontFamily: FONT.bold,
		fontSize: SIZES.xLarge,
		color: COLORS.primary,
		marginTop: 2,
		fontWeight: "bold",
		fontSize: 28,
	},
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
		alignItems: "center",
		borderRadius: SIZES.medium,
		height: "100%",
		backgroundColor: "#E6E4E6",
	},
	searchInput: {
		// fontFamily: FONT.regular,
		width: "100%",
		height: "100%",
		paddingHorizontal: SIZES.medium,
		fontSize: 17,
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
	tabsContainer: {
		width: "100%",
		marginTop: SIZES.medium,
		paddingHorizontal: 20,
	},
	row: {
		marginHorizontal: 20,
	},
	subrow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 15,
	},
	boldText: {
		fontWeight: "bold",
		fontSize: 20,
	},
	showAll: {
		color: "#83829A",
		fontSize: 16,
	},
	companyList: {
		// paddingHorizontal: 10,
	},
	companyCard: {
		backgroundColor: "#312651",
		borderRadius: 20,
		padding: 10,
		marginRight: 10,
		alignItems: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		position: "relative",
		width: 200,
	},
	logo_container: {
		width: 60,
		height: 60,
		backgroundColor: "#fff",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	companyLogo: {
		width: 50,
		height: 50,
	},
	companyInfo: {
		marginTop: 10,
	},
	companyName: {
		fontSize: 14,
		color: COLORS.white,
		marginBottom: 3,
	},
	jobName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 3,
		color: COLORS.white,
	},
	jobDescription: {
		fontSize: 14,
		color: COLORS.white,
	},
	heartIcon: {
		position: "absolute",
		top: 15,
		right: 20,
		color: "#ff7754",
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

	nearby_job_container: {
		borderRadius: 10,
		flexDirection: "row",
		marginBottom: 10,
		backgroundColor: "#fafafa",
		padding: 10,
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
});

export default styles;

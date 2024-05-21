import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Welcome = ({ navigation }) => {
	return (
		<LinearGradient
			style={{
				flex: 1,
			}}
			colors={[COLORS.background, COLORS.background]}
		>
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1, alignItems: "center" }}>
					<Image
						source={require("../assets/hero1.png")}
						style={{
							height: 300,
							width: 300,
							borderRadius: 20,
							marginTop: 100,
						}}
					/>
				</View>

				{/* content  */}

				<View
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: "white",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						padding: 30,
					}}
				>
					<View
						style={{
							marginBottom: 22,
							position: "relative",
							top: 2,
							width: "100%",
						}}
					>
						<Text
							style={{
								fontSize: 30,
								fontWeight: "bold",
								color: COLORS.finding,
							}}
						>
							Finding a perfect job
						</Text>

						<View style={{ marginTop: 12, marginBottom: 22 }}>
							<Text
								style={{
									fontSize: 18,
									color: COLORS.black,
									marginBottom: 4,
								}}
							>
								Finding your dream job is now much easier and
								faster like never before!
							</Text>
						</View>
					</View>

					<Button
						title="Let’s Get Started"
						filled
						onPress={() => navigation.navigate("Login")}
						style={{
							backgroundColor: COLORS.maugach,
							borderColor: "transparent",
							marginTop: 2,
							width: "100%",
						}}
					/>

					<View
						style={{
							flexDirection: "row",
							marginTop: 12,
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								fontSize: 16,
								color: COLORS.black,
							}}
						>
							Already have an account?
						</Text>
						<Pressable onPress={() => navigation.navigate("Login")}>
							<Text
								style={{
									fontSize: 16,
									color: COLORS.black,
									fontWeight: "bold",
									marginLeft: 4,
								}}
							>
								Login
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</LinearGradient>
	);
};

export default Welcome;

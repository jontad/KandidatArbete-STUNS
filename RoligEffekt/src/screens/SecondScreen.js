import React, { Component } from 'react';
import { View } from 'react-native';
import { Layout, TopNav, Text } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';

class SecondScreen extends Component {
	render() {
		return (
			<Layout>
				<TopNav
					middleContent="Förklaring Export/Import"
					leftContent={<Ionicons name="chevron-back" size={20} color="black" />}
					leftAction={() => this.props.navigation.goBack()}
				/>
				<View style={{ left: 10, top: 10 }}>
					<Text>
						<Text fontWeight="bold">IMPORT </Text>
						<Text>
							innebär att Sverige importerar el, vilket leder till risken att el som har producerats av kolkraft
							importeras. Därför bör du använda el när den
						</Text>
						<Text fontWeight="bold"> EXPORTERAS</Text>
						<Text>, då vi endast producerar "ren" el.{'\n'}</Text>
					</Text>

					<Text>
						<Text fontWeight="bold">NEG </Text>
						<Text>(Negativ) och</Text>
						<Text fontWeight="bold"> POS </Text>
						<Text>(Positiv) talar om...{'\n'}</Text>
					</Text>

					<Text>
						<Text fontWeight="bold">% </Text>
						<Text>talar om...</Text>
					</Text>
				</View>
			</Layout>
		);
	}
}
export default SecondScreen;

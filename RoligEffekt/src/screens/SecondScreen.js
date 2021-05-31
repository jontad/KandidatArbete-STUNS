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
							– Användning bör undvikas när el importeras. Det medför stor risk för användandet av icke-grön energikälla
							(kol, olja {'&'} naturgas). Landet är i behov av större mängd energi än det produceras, vi importerar
							därför från grannländerna.{'\n'}
						</Text>
					</Text>

					<Text>
						<Text fontWeight="bold">EXPORT </Text>
						<Text>
							– Bra tillfälle att nyttja el, det är ingen risk för användandet av icke-grön energikälla och bättre för
							miljön! Landets elproduktion är nog för att täcka den nuvarande konsumtionen, överskottet exporteras
							därför!{'\n'}
						</Text>
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

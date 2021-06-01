const prodConfig = {
	baseUrl: '',
	//Enter meter-ID here
	meterID: '7340157011176133', 
	production: true,
};

const localConfig = {
	baseUrl: 'http://90.229.185.190:3000',
	//Enter meter-ID here
	meterID: '7340157011176133',
	production: false,
};
 

export const config = process.env['NODE_ENV'] === 'production' ? prodConfig : localConfig;

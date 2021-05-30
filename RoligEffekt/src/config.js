const prodConfig = {
	baseUrl: '',
	production: true,
};

const localConfig = {
	baseUrl: 'http://192.168.10.213:3000',
	production: false,
};

export const config = process.env['NODE_ENV'] === 'production' ? prodConfig : localConfig;

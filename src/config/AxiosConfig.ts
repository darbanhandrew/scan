import axios from 'axios';

import config from './config.json';

/**
 * * Axios defaults
 */
const isDevEnv = process.env.NODE_ENV === 'development';

const ConfiguredAxios = axios.create({
	baseURL: isDevEnv ? config.devApiUrl : config.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'token 9ede50b2450c6de:43c8661f5567f8d'
	},
});

// * Headers
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common.Accept = 'application/json';
// * Request Interceptor

// ConfiguredAxios.interceptors.request.use(
// 	async (inputConfig) => {
// 		const config = inputConfig;

// 		// Check for and add the stored Auth Token to the header request
// 		let token: string | null = '';
// 		try {
// 			token = await localStorage.getItem('@Auth:token');
// 		} catch (error) {
// 			/* Nothing */
// 		}
// 		if (token && config) {
// 			config.headers.common['Authorization'] = `Bearer ${token}`;
// 		}

// 		return config;
// 	},
// 	(error) => {
// 		throw error;
// 	},
// );

/**
 * Response Interceptor
 */
ConfiguredAxios.interceptors.response.use(
	(res) => {
		// Status code isn't a success code - throw error
		if (!`${res.status}`.startsWith('2')) {
			throw res.data;
		}

		// Otherwise just return the data
		return res;
	},
	(error) => {
		// Pass the response from the API, rather than a status code
		/* 
		TODO: handle unauthorized requests
		if (
			error.response.status === 400 &&
			[
				'Invalid grant: refresh token is invalid',
				'Invalid grant: refresh token has expired',
			].includes(error.response.data.message)
		) {
			Cookies.remove(cookieKeys.userAccessToken);
			Cookies.remove(cookieKeys.userRefreshToken);

			return Promise.reject(error);
		}
 */
		if (error.response.status === 401) {
			// * unauthorized
			// localStorage.removeItem('@Auth:token');
			// localStorage.removeItem('recoil-persist');
		}
		if (error && error.response && error.response.data) {
			throw error.response.data;
		}
		throw error;
	},
);

export default ConfiguredAxios;

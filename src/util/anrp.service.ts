import axios from 'axios'

export const ANRPManager = {
	
	detectPlate: async (file: File) => {

		const formData = new FormData();

		// append the name of the required services separated by comma, its value can be 'anpr' or 'mmr' or 'anpr,mmr'
		formData.append('service', 'anpr,mmr');

		// an image file selected from your computer by clicking the browse button of a form
		formData.append('image', file);

		// append the location of your device, not required, but can speed up the recognition process
		// formData.append('location', 'CAS');

		// append the maximum number of recognitions, not required (1 by default), but if you want us to return more vehicles per one image, than increase this number
		formData.append('maxreads', '1');


		try {
			const resp = await axios.post('https://api.cloud.adaptiverecognition.com/vehicle/cas', formData, {
				headers: {
					// NOTE: your API Key is confidential and needs to be treated
					// like a password: never commit it to a version control
					// repository and always store it in a secure way.
					'X-Api-Key': 'd644253d45c6f89e90831b4d9cbb06a03d54320d',
					// 'x-enable-wide-range-analysis': 'true',
				},
			});
			return resp;
		} catch (err) {
			throw err;
		}
	}
};
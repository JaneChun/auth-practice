import axios from 'axios';
const API_KEY = process.env.API_KEY;
const ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export const createUser = async ({ email, password }) => {
	console.log('ENDPOINT:', ENDPOINT);

	try {
		const response = await axios.post(ENDPOINT, {
			email,
			password,
			returnSecureToken: true,
		});
		console.log('Response Data:', response.data);
	} catch (error) {
		console.error(
			'Error creating user:',
			error.response?.data || error.message,
		);
	}
};

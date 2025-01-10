import axios from 'axios';
const API_KEY = process.env.API_KEY;

export const authenticate = async ({ email, password, mode }) => {
	const ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

	try {
		const response = await axios.post(ENDPOINT, {
			email,
			password,
			returnSecureToken: true,
		});
		console.log('Response Data:', response.data);

		const token = response.data.idToken;
		return { token };
	} catch (err) {
		console.error(err.response?.data || err.message);
		throw err;
	}
};

export const signUp = ({ email, password }) => {
	return authenticate({ email, password, mode: 'signUp' });
};

export const login = ({ email, password }) => {
	return authenticate({ email, password, mode: 'signInWithPassword' });
};

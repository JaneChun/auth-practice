import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
});

export default function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState('');

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem('authToken', token);
	}
	function logout() {
		setAuthToken(null);
		AsyncStorage.removeItem('authToken');
	}

	const value = {
		token: authToken,
		isAuthenticated: Boolean(authToken),
		authenticate,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

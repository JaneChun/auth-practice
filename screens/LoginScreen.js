import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import { login } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);

		try {
			await login({ email, password });
		} catch (err) {
			Alert.alert('Authentication failed', err.response?.data?.error?.message);
		}

		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Logging you in...' />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

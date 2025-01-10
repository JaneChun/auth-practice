import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { signUp } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function signUpHandler({ email, password }) {
		setIsAuthenticating(true);

		try {
			await signUp({ email, password });
		} catch (err) {
			Alert.alert('Authentication failed', err.response?.data?.error?.message);
		}

		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Creating user...' />;
	}

	return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;

import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { signUp } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const authCtx = useContext(AuthContext);

	async function signUpHandler({ email, password }) {
		setIsAuthenticating(true);

		try {
			const { token } = await signUp({ email, password });
			authCtx.authenticate(token);
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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AppLoading from 'expo-app-loading';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Signup' component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const authCtx = useContext(AuthContext);
	const { logout } = authCtx;
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
				headerRight: ({ tintColor }) => (
					<IconButton
						icon='exit'
						color={tintColor}
						size={24}
						onPress={logout}
					/>
				),
			}}
		>
			<Stack.Screen name='Welcome' component={WelcomeScreen} />
		</Stack.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);
	const { isAuthenticated } = authCtx;

	return (
		<NavigationContainer>
			{isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
		</NavigationContainer>
	);
}

function Root() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);

	const authCtx = useContext(AuthContext);
	const { authenticate } = authCtx;

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const storedToken = await AsyncStorage.getItem('authToken');
				if (storedToken) {
					authenticate(storedToken);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setIsTryingLogin(false);
			}
		};

		fetchToken();
	}, []);

	if (isTryingLogin) {
		return <AppLoading />;
	}
	return <Navigation />;
}

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}

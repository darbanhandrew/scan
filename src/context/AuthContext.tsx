import React, { useState, createContext } from 'react';

const AuthContext = createContext<{
	auth: {
		userType: string | null;
		prefix: string | null;
		// user: User | null;
		// doctor: Doctor | null;
		// customer: Customer | null;
		// token: string;
		login: (userType: string, prefix: string) => void;
		logout: () => void;
		// checkToken: () => void;
		// getUserInfo: () => void;
		// saveToken: (data: {
		// 	access_token: string;
		// 	access_token_expires_at: string;
		// 	refresh_token: string;
		// 	refresh_token_expires_at: string;
		// 	scope: string;
		// 	success: boolean;
		// }) => void;
	};
}>({
	auth: {
		userType: null,
		prefix: null,
		// user: null,
		// customer: null,
		// doctor: null,
		// token: '',
		login: (userType: string, prefix: string) => { },
		logout: () => { },
		// checkToken: () => { },
		// getUserInfo: () => { },
		// saveToken: (data: {
		// 	access_token: string;
		// 	access_token_expires_at: string;
		// 	refresh_token: string;
		// 	refresh_token_expires_at: string;
		// 	scope: string;
		// 	success: boolean;
		// }) => { },
	},
});

function useProvideAuth() {
	
	const [userType, setUserType] = useState<string | null>(null);
	const [prefix, setPrefix] = useState<string | null>(null);

	const login = (userType: string, prefix: string) => {
		setPrefix(prefix);
		setUserType(userType);
	};
	const logout = () => {
		setUserType(null);
	};

	return {
		userType,
		prefix,
		login,
		logout,	
	};
}

export const AuthProvider = (props: any) => {
	const auth = useProvideAuth();
	// const clientAuth = useProvideClientAuth();

	const { children } = props;

	return (
		<AuthContext.Provider
			value={{
				auth,
				// clientAuth
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const { Consumer } = AuthContext;

export default AuthContext;

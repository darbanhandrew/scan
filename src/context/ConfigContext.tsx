import { createContext, ReactNode } from 'react';

// project import
import useLocalStorage from '../hooks/useLocalStorage';

// types
import { ConfigProps, CustomizationProps } from '../types/Config.type';


const defaultConfig: ConfigProps = {
	locale: 'en', // 'en' - English, 'fa' - Persian,
	rtlLayout: false,
};

// initial state
const initialState: CustomizationProps = {
	...defaultConfig,
	onChangeLocale: (locale: string) => { },
	onChangeRTL: (rtlLayout: boolean) => { },
	onChangeLocaleAndRTL: (locale: string, rtlLayout: boolean) => { }
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
	children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {

	const [config, setConfig] = useLocalStorage('realagro-config', {
		locale: initialState.locale,
		rtlLayout: initialState.rtlLayout
	});


	const onChangeLocale = (locale: string) => {

		console.log('config locale', locale);
		setConfig({
			...config,
			locale
		});
	};

	const onChangeRTL = (rtlLayout: boolean) => {
		setConfig({
			...config,
			rtlLayout
		});
	};

	const onChangeLocaleAndRTL = (locale: string, rtlLayout: boolean) => {
		setConfig({
			...config,
			locale,
			rtlLayout
		});
	};



	return (
		<ConfigContext.Provider value={{
			...config,
			onChangeLocale,
			onChangeRTL,
			onChangeLocaleAndRTL
		}}>
			{children}
		</ConfigContext.Provider>		
    );
}

export { ConfigProvider, ConfigContext };

import React, { useState, useEffect } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';
import useConfig from '../hooks/useConfig';

// load locales files
const loadLocaleData = (locale: string) => {
	
	switch (locale) {
		case 'uz-Cyrl-UZ':
			return import('./locales/y3b.json');
		case 'ru':
			return import('./locales/ru.json');
		case 'uz-Latn-UZ': 
			return import('./locales/uzb.json');
		case 'en':
			return import('./locales/en.json');
		default:
			return import('./locales/en.json');
	}
};

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
	children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
	const { locale } = useConfig();
	const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

	useEffect(() => {

		console.log('locale', locale);
		loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
			setMessages(d.default);
		});
	}, [locale]);

	return (
		<>
			{messages && (
				<IntlProvider locale={locale} defaultLocale="en" messages={messages}>
					{children}
				</IntlProvider>
			)}
		</>
	);
};

export default Locales;



export type ConfigProps = {
    locale: string;
    rtlLayout: boolean;
};

export type CustomizationProps = {

    locale: string;
    rtlLayout: boolean;

    onChangeLocale: (locale: string) => void;
    onChangeRTL: (rtlLayout: boolean) => void;
    onChangeLocaleAndRTL: (locale: string, rtlLayout: boolean) => void;
};

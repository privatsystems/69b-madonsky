import React, { Component, ReactNode } from "react";

interface SiteContextType {
    isMob: boolean;
    isTab: boolean;
    page: string;
    setIsMob: (data: boolean) => void;
    setIsTab: (data: boolean) => void;
    setLocale: (data: string) => void;
    setPage: (data: string) => void;
}

const initialContext: SiteContextType = {
    isMob: false,
    isTab: false,
    page: '/',
    setIsMob: () => { },
    setIsTab: () => { },
    setLocale: () => { },
    setPage: () => { },
};

const SiteContext = React.createContext<SiteContextType>(initialContext);

class SiteProvider extends Component<{ children: ReactNode }> {
    state: SiteContextType = {
        ...initialContext
    };

    setIsMob = (data: boolean) => {
        this.setState({ isMob: data });
    };

    setIsTab = (data: boolean) => {
        this.setState({ isTab: data });
    };

    setPage = (data: string) => {
        this.setState({ page: data });
    };

    render() {
        const { children } = this.props;
        return (
            <SiteContext.Provider
                value={{
                    ...this.state,
                    setIsMob: this.setIsMob,
                    setIsTab: this.setIsTab,
                    setPage: this.setPage,
                }}
            >
                {children}
            </SiteContext.Provider>
        );
    }
}

const SiteConsumer = SiteContext.Consumer;

export { SiteConsumer, SiteContext };
export default SiteProvider;
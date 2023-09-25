import React, { ReactNode } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import '../styles/layout.scss';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <div className='mfxshop-container'>
            <Header />
            <div className='mfxshop-wrapper'>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;

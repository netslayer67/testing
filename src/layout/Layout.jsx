import { NavbarComp, Footer, WrapperDashboard } from '../components';

const Layout = ({ children, role }) => {
    switch (role) {
        case 'USER':
            return (
                <>
                    <NavbarComp />
                    {children}
                    <Footer />
                </>
            );
        case 'ADMIN':
        case 'SUPER_ADMIN':
        case 'JOKI':
            return (
                <>
                    <WrapperDashboard>{children}</WrapperDashboard>
                </>
            );
        default:
            break;
    }
};

export default Layout;

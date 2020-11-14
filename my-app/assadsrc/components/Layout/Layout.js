import React, { useState } from 'react';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';





function Layout(props) {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const SideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () =>  setShowSideDrawer(!showSideDrawer); 
    
       

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer 
            open={showSideDrawer} 
            closed={SideDrawerClosedHandler}/>
            <main className={"Content"}>
                {props.children}
            </main>
        </React.Fragment>
        
    );
}

export default Layout;

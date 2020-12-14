import React from 'react'
import classes from "./ToolBar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const ToolBar= (props) =>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggleHandler}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default ToolBar
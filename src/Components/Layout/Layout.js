import React,{Component} from 'react';
import  classes from "./Layout.module.css"
import ToolBar from "../Navigation/ToolBar/ToolBar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             showSideDrawer: false
        }
    }
    
    sideDrawerClosedHandler = () => (
        this.setState({
            showSideDrawer: false
        })  
    )

    

    toggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
           
        })
    }
    render(){
        return(
            <React.Fragment>
            <SideDrawer closed={this.sideDrawerClosedHandler}
                        open={this.state.showSideDrawer}/>
            <ToolBar toggleHandler={this.toggleHandler}/>
            <main className= {classes.content}>
                {this.props.children}
                
            </main>
        </React.Fragment>
        )
    }
}



export default Layout
import React from 'react';
import classes from  './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]


const Buildcontrols= (props)=> (
    
    <div className={classes.BuildControls}>
        Current Price: {props.price}
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} 
            added={()=>props.addIngredient(ctrl.type)}
            removed ={()=>props.removeIngredient(ctrl.type)}
            disableCheck ={props.disabledInfo[ctrl.type]}/>))}
        
        <button className = {classes.OrderButton} disabled={props.purchasable}
                            onClick={props.purchasing}>ORDER BUTTON</button>
    </div>
    
)

export default Buildcontrols
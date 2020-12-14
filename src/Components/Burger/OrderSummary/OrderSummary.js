import React from 'react'
import Button from '../../UI/Button/Button'



const OrderSummary = (props) =>{
    const ingredients = Object.keys(props.ingredient)
                        .map((igKey) => {
                        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredient[igKey]}</li>
                        })
    return(
    <React.Fragment>
        <h3>Your delicious order's ingredients</h3>
        <ul>{ingredients}</ul>
    <strong>Total Price: {props.price}</strong>
        <div>Please proceed to Checkout</div>
        <Button btnType={"Danger"} clicked={props.purchaseCancel} >CANCEL</Button>
        <Button btnType={"Success"} clicked={props.purchaseDone}>CONTINUE</Button>
    </React.Fragment>)
}

export default OrderSummary
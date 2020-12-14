import React, { Component } from 'react'
import Burger from "../../Components/Burger/Burger"
import BuildControls from "../../Components/Burger/BuildControls/BuildControls"
import Modal from "../../Components/UI/Modals/Modal"
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../Components/UI/Spinner/Spinner"
import ErrorBoundary from "../../HOC/ErrorBoundary/ErrorBoundary"

const INGREDIENT_PRICE={
    cheese: 7,
    salad: 8,
    bacon: 20,
    meat: 25
}
export class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ingredient: null,
            totalPrice: 30,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }
    componentDidMount() {
        axios.get("https://react-myburgerapp-2065c-default-rtdb.firebaseio.com/ingredient.json")
        .then(response => {this.setState({ingredient: response.data})
        console.log(response.data, "Ingre")
    }).catch(error => this.setState({error: true}))
    }
    updatePurchasable=(ingredient)=>{
        const eachItemCount = Object.values(ingredient)
                            .reduce((sum,el)=>{
                                return sum + el;
                            },0)
                            console.log(eachItemCount)
        this.setState({purchasable: eachItemCount > 0})
        

    }
    addIngredient=(type) => {
        const newCount = this.state.ingredient[type] + 1;
        const updatedIngredient = {... this.state.ingredient}
        updatedIngredient[type]= newCount
        const newPrice= this.state.totalPrice + INGREDIENT_PRICE[type]
        this.setState({ingredient: updatedIngredient, totalPrice: newPrice})
        this.updatePurchasable(updatedIngredient)

    }

    removeIngredient=(type) => {
        const newCount = this.state.ingredient[type] - 1
        const updatedIngredient = {... this.state.ingredient}
        updatedIngredient[type] = newCount
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type]
        this.setState({ingredient: updatedIngredient, totalPrice: newPrice})
        this.updatePurchasable(updatedIngredient)
    }

    purchasingHandler=()=>(
        this.setState({purchasing: true})
    )
    
    purchaseCancelHandler=()=>(
        this.setState({purchasing: false})
        
    )
    purchaseDoneHandler=()=>{
        this.setState({purchasing: false , loading: true})
        const orders={
            ingredients: this.state.ingredient,
            price: this.totalPrice,
            customer: {
                name: "Deepak",
                address: "Arkham's",
                code: "65454",
                country: "India"
            }
        }
        axios.post("/orders.json", orders)
            .then(response => {
                this.setState({loading: false})
                console.log(response)
            })
            .catch(error => {
                this.setState({loading: false})
                console.log(error)
            })
    }
    render() {
        const disabledInfo = {...this.state.ingredient}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null
        let burger=this.state.error ? <p>Ingredients not found</p>: <Spinner />

       
        if (this.state.ingredient){
            burger =(
                <React.Fragment>
                <Burger ingredient={this.state.ingredient}/>
                <BuildControls  addIngredient={this.addIngredient}
                                removeIngredient={this.removeIngredient}
                                disabledInfo = {disabledInfo}
                                price = {this.state.totalPrice}
                                purchasable ={!this.state.purchasable}
                                purchasing = {this.purchasingHandler}/>
                </React.Fragment>
            )
            orderSummary=(
                <OrderSummary ingredient={this.state.ingredient}
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseDone={this.purchaseDoneHandler}
                            price={this.state.totalPrice}/>
            )
        } 
        if(this.state.loading){
            orderSummary = <Spinner />
        }   
    
        return (
            <React.Fragment>
            
                {burger}
            <Modal show={this.state.purchasing} backDrop={this.purchaseHandler}>
                {orderSummary}
        
            </Modal>
          
            </React.Fragment>
        )
    }
}

export default ErrorBoundary(BurgerBuilder, axios)

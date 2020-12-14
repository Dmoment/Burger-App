import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients"

const Burger= (props)=> {
    const ingredientKeys = Object.keys(props.ingredient)
    const ingredientValues = Object.values(props.ingredient)
    let newIngredient=[]
    var i=0;
    var j;
    for(i; i<ingredientKeys.length; i++){
        for(j=0; j<ingredientValues[i]; j++){
           newIngredient.push( <BurgerIngredients key={ingredientKeys[i]+j} type={ingredientKeys[i]} />)
        }
    }
    if(newIngredient.length == 0){
        newIngredient.push(<p>Please start adding ingredients</p>)
    }
    console.log(newIngredient)
    /* const transFormedIngredient= Object.keys(props.ingredient)
                                    .map(igKey =>{
                                        return [...Array(props.ingredient[igKey])]
                                        .map((_,i)=>{
                                            return <BurgerIngredients key={igKey + i} type={igKey} />
                                         })
                                    }) */
                                    
    //console.log(transFormedIngredient)
    return (
        <div className={classes.Burger}>
            
            <BurgerIngredients type="bread-top"/>
            {newIngredient}
            <BurgerIngredients type="bread-bottom"/>
            
        </div>
    )
}

export default Burger

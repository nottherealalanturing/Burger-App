import React, { useEffect } from 'react';
import {useState} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}



function BurgerBuilder(props) {
    const [ingredients, setIngredients] = useState();

    useEffect(() => {
        const subscription = 'https://react-my-burger-f3997.firebaseio.com/ingredients.json';
        return () => {
          // Clean up the subscription
          axios.get(subscription)
          .then(response => {
            setIngredients(
                response.data
            )
          }).catch(error => {setError(true)});
        };
      }, [ingredients]);

    const [totalPrice, setTotalPrice] = useState(4);

    const [purchaseable, setPurchaseable] = useState(false);

    const [purchasing, setPurchasing] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);



    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;


        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        updatePurchaseState(updatedIngredients);
    }
    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...ingredients};
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice - priceDeduction;


        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        updatePurchaseState(updatedIngredients);
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        //alert('You continued!');
        setLoading(true);
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            customer: {
                name: 'Vic Vinegar',
                address: {
                    street: 'Test Street 1',
                    zipCode: 70009,
                    country: 'Nigeria'
                },
                email: 'test@test.com'    
            },
            deliveryMethod: 'fastest'        
        }
        axios.post('/orders.json', order)
        .then(response=> {
            setLoading(false);
            setPurchasing(false);
        })
        .catch(error => {
            setLoading(false);
            setPurchasing(false)
        });

    }

    const updatePurchaseState = (myIngredients) => {
        const sum = Object.keys(myIngredients)
        .map(igKey => {
            return myIngredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0);
        setPurchaseable(sum > 0)
    }

    const disabledInfo = {...ingredients};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    
    let burger = error ? <p>Ingredients Cant be loaded </p> : <Spinner />
    if (ingredients) {
        burger = (<>
            <Burger ingredients={ingredients}/>
            <BuildControls 
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disabledInfo}
            purchaseable={purchaseable}
            price={totalPrice}
            ordered={purchaseHandler}
        /> 
        </>);

        orderSummary = <OrderSummary 
        ingredients={ingredients} 
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        />
    }
    if(loading) {
        orderSummary = <Spinner />
    }
    return (
        
        <>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>
            {burger}
        </>
    );
}

export default withErrorHandler(BurgerBuilder, axios);


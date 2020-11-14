/* import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({});
    //const [totalPrice, setTotalPrices] = useState(null);
    let totalPrice = 0;

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        //console.log(props);

        const ing = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ing[param[0]] = +param[1];
            }
        }
       
        totalPrice = price;
        setIngredients(ing);
    }, []);


    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data');
    }

    console.log(totalPrice);
    return (
        <div>
            
            <CheckoutSummary 
            ingredients={ingredients}
            checkoutCancelled={checkoutCancelled}
            checkoutContinued={checkoutContinued} />
            <Route path={props.match.path + '/contact-data'}
                render={
                    (props) => (
                        <>
                        <ContactData ingredients={ingredients} price={totalPrice} {...props}/>
                        console.log(totalPrice)
                        </>
                        
                    ) 
                } />
        </div>
    )
} 

export default Checkout; 
 */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients: ingredients, totalPrice: price } );
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;
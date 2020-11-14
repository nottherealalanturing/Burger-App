import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';


const ContactData = (props) => {
    const [state, setState] =  useState({
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        }
    });

    const [loading, setLoading] = useState(false);
    //const [ingredients, setIngredients] = useState();

    
    const orderHandler = (event) => {
        event.preventDefault();
        
        
       setLoading(true);
        const order = {
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest',
            ingredients: props.ingredients,
            price: props.totalPrice
        }
        axios.post( '/orders.json', order )
            .then( response => {
                //console.log(order);
                setLoading(false);
                props.history.push('/');
            } )
            .catch( error => {
                setLoading(false);
            } ); 
        
    }

    let form = (
        <form>
                <input className='Input' type="text" name="name" placeholder="Your name"></input>
                <input className='Input' type="text" name="email" placeholder="Your email"></input>
                <input className='Input' type="text" name="Street" placeholder="Your Street"></input>
                <input className='Input' type="text" name="postalCode" placeholder="Your Postal Code"></input>
                <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (loading) {
        form = <Spinner />;
    }

    return (
        <div className='ContactData'>
            <h4> Enter Your Contact Data</h4>
                {form}
        </div>
    );
}

export default ContactData;
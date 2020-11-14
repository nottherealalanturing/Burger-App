import React from 'react';
import Button from '../../UI/Button/Button';

function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {return (
    <li key={igKey}>
    <span style={{textTransform: 'capitalize'}}>
    {igKey}
    </span> : {props.ingredients[igKey]}
    </li>)
    });

    /* Will Component Update */
   /*  const isFirstRender = React.useRef(true);
    React.useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    console.log('[Order Summary] will update')
    });
 */
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
}

export default OrderSummary;


import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishabeKey = 'pk_test_51IalLcFzu7Iyr1gjXFPqscwISpyVJHEfZEB7Yuy8A8dPHZGw67330CqKWQjGg7Cgxptko0g1BijDxlugs5bb9IH300FNJsz6BK';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay now'
            name = 'E-Commere'
            billingAddress
            shippingAddress
            image=''
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishabeKey}
        />
    )
};

export default StripCheckoutButton;
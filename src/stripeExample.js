import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { CardElement, ElementsConsumer, Elements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { deductPayment } from './reducer/stripeReducer';
import { useHistory } from 'react-router-dom';

const CheckoutForm = (props) => {
    const { email } = useSelector((store) => store.items_reducer);
    const { status } = useSelector((store) => store.stripeReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log('status ==> ', status);
        if (status === 'fulfilled') {
            history.push('/signin');
        }
    })

    const [value, setValue] = useState("50$");
    console.log("value => ", value);
    console.log('email ==> ', email);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { stripe, elements } = props;
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            const userData = { token: paymentMethod, email, subscription_type: value }
            dispatch(deductPayment(userData))
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    const { stripe } = props;
    return (
        <div style={{ width: '50%', justifyContent: 'center', border: '3px solid' }}>
            <form onSubmit={handleSubmit}>
                <h2>Subscribe our service</h2>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            }

                        },
                        hidePostalCode: true,
                        width: 50
                    }}
                /> &nbsp; &nbsp;
                <FormControl component="fieldset"><br /><br />
                    <FormLabel component="legend">select subscription </FormLabel><br /><br />
                    <RadioGroup
                        column
                        aria-label="subscription"
                        defaultValue="50$"
                        name="radio-buttons-group"
                        onChange={(e) => { setValue(e.target.value) }}
                    >
                        <FormControlLabel value="50$" control={<Radio />} label="Basic Plan 50$" />
                        <FormControlLabel value="60$" control={<Radio />} label="Standard 60$" />
                        <FormControlLabel value="70$" control={<Radio />} label="Premium 70$" />
                    </RadioGroup>
                </FormControl>
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>

            </form>
        </div>
    );

}

const InjectedCheckoutForm = () => {
    const stripeElement = loadStripe('pk_test_51Jk6rhGbPq8HgjNU86NxpbB18j2evSTgnycMGTY6YxQgwwMBE9tHnftR0VoUNUjnmNjjTCN9vD082H4fBRcNSSPe00wF841yAA');
    return (
        <Elements stripe={stripeElement}>
            <ElementsConsumer>
                {({ elements, stripe }) => (
                    <CheckoutForm elements={elements} stripe={stripe} />
                )}
            </ElementsConsumer>
        </Elements>
    );
};

export default InjectedCheckoutForm
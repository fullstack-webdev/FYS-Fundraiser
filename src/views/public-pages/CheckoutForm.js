import React, {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

export default function CheckoutForm(props) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break
                default:
                    setMessage("Something went wrong.")
                    break
            }
        })
    }, [stripe])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${process.env.REACT_APP_FYS_APP_URL}/donation/thankyou`
            }
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message)
        } else {
            setMessage("An unexpected error occured.")
        }

        setIsLoading(false)
    }

    const SubmitDonation = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/stripe/pi`, {
            cardAmount: props.donationAmount * 100,
            transferGroup: "transfer11123456",
            items: "asdf",
            user: '',
            firstName: props.formData.firstName,
            lastName: props.formData.lastName,
            email: props.formData.email
        })
        .then((data) => {
            props.updateClientSecret(data.data.data.client_secret)
        })
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <br />
            <button className="myLeft donate_btn" disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" onClick={SubmitDonation}>
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Donate Now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}
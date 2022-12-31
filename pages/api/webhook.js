import initStripe from 'stripe'
import {buffer} from 'micro'
import axios from 'axios'

export const config = {api: {bodyParser: false}}

async function handler(req, res) {
    console.log(req.body, 'hook')
    const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]
    const signingSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_KEY
    let reqBuffer = await buffer(req)
    reqBuffer = reqBuffer.toString()

    let event;

    try{
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
        if ( 'checkout.session.completed' === stripeEvent.type ) {
            const session = stripeEvent.data.object;
            console.log( 'payment success', session )
        } else {
            console.log('Failure')
        }
    } catch(e) {
        console.log(e)
        return res.status(400).send(`Webhook error: ${e.message}`)
    }
    
    res.send({received: true})
}

export default handler
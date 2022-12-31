import initStripe from 'stripe'
import {buffer} from 'micro'
import axios from 'axios'

export const config = {api: {bodyParser: false}}

async function handler(req, res) {
    console.log(req.body, 'hook')
    const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]
    const signingSecret = process.env.NEXT_PUBLIC_STRIPE__WEBHOOK_KEY
    let reqBuffer = await buffer(req)
    reqBuffer = reqBuffer.toString()

    let event;

    try{
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
        if (event.data.object.status === 'succeeded') {
            const subscriberEmail = event.data.object.charges.data[0].billing_details.email
            const subscriberName = event.data.object.charges.data[0].billing_details.name
            axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/subscribeUser',{
                email: subscriberEmail
            })
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
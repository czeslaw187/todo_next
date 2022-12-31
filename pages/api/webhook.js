import initStripe from 'stripe'
import {buffer} from 'micro'
import axios from 'axios'

export const config = {api: {bodyParser: false}}

async function handler(req, res) {
    console.log(req.body, 'hook')
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]
    const signingSecret = process.env.STRIPE_SIGNING_SECRET
    let reqBuffer = await buffer(req)
    reqBuffer = reqBuffer.toString()

    let event;

    try{
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
        if (event.type === "charge.succeeded") {
            const charge = event.data.object;
            res.json(charge)
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
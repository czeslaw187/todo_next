import initStripe from 'stripe'
import {buffer} from 'micro'
import axios from 'axios'

export const config = {api: {bodyParser: false}}

async function handler(req, res) {
    console.log(req.body, 'hook')
    const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]
    const signingSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET
    let reqBuffer = await buffer(req)
    reqBuffer = reqBuffer.toString()

    let event;

    try{
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
        const name = event.data.object.charges.data[0].billing_details.name
        const email = event.data.object.charges.data[0].billing_details.email
        if (event.data.object.status === 'succeeded') {
            await axios.post(process.env.NEXT_PUBLIC_URL + '/api/subscribeUser',{
                name: name,
                email: email
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
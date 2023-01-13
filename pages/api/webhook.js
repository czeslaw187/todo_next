import initStripe from 'stripe'
import {buffer} from 'micro'
import axios from 'axios'
import { useSelector } from 'react-redux'

export const config = {api: {bodyParser: false}}

async function handler(req, res) {
    console.log(req.body, 'hook')
    const user = useSelector(state=>state.todos.user)
    const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]
    const signingSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET
    let reqBuffer = await buffer(req)
    reqBuffer = reqBuffer.toString()

    let event;

    try{
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
        if (event.data.object.status === 'succeeded') {
            let resp = await axios.post(process.env.NEXT_PUBLIC_URL + '/api/getUser',{
                email: user.email
            })
            resp = resp.data
            if (resp.length <= 0) {
                await axios.post(process.env.NEXT_PUBLIC_URL + '/api/createUser',{
                    name: user.name,
                    email: user.email
                })
            }
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
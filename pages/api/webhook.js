import axios from 'axios';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET;

axios.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.rawBody;
  if (endpointSecret) {
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    response.json(charge)
  } else {
    console.warn(`Unhandled event type: ${event.type}`);
  }
  response.send();
});

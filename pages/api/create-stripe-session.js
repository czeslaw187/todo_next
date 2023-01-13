const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {

  const redirectURL = process.env.NEXT_PUBLIC_URL

  const transformedItem = {
    price_data: {
      currency: 'gbp',
      unit_amount: 699,
      product_data: {
        name: 'ToDo subscription',
      },
    },
    quantity: 1
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '/success?status=success',
    cancel_url: redirectURL + '?status=cancel',
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
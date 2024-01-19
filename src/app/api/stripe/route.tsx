
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST(req) {
   
       
    if (req.method === 'POST') {
      const body = await req.json()
        //   console.log(body, "bodddyyd")
        console.log(req.headers.origin, "URLlLLL")
      try {
          // Create Checkout Sessions from body params.
            const params = {
              submit_type: 'pay',
              mode: 'payment',
              payment_method_types: ['card'],
              billing_address_collection: 'auto',
              shipping_options: [
                  { shipping_rate: 'shr_1OTa1OKqAScwG4OfuaMc1p31' },
                  { shipping_rate: 'shr_1OTa3uKqAScwG4Of2Zy4qdFM' },
                ],
        
                line_items: body.map((item) => {
                        return  {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.name,
                                    // images: item.image
                                },
                                unit_amount: item.price * 100
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum: 1
                            },
                            quantity: item.stock
                        }   
                }),
                
              success_url: `${process.env.SUCCESS_URL}/success`,
              cancel_url: `${process.env.SUCCESS_URL}/products`,
          }
         
          const session = await stripe.checkout.sessions.create(params);


          console.log(session, "sessionizer")
          return new NextResponse(JSON.stringify(session))
       

          
      } catch (err) {
          return new NextResponse(err, {status: 500} )
      }
  } else {
    new NextResponse('Allow', 'POST');
    return new NextResponse('Method Not Allowed', {status:405});
  }

   
}
import Stripe from "stripe";


const stripe = Stripe(`sk_test_51MyvmbSGiNjG3rZcOfyOBofLOfZ2oyBYOv4hmuaJ0xmXZyFub3XLThUqtUDzdeECB1V95EG2tLtrAhhtOyToT05V0045wTunku`)


// for(let i=0;i<5;i++){
//     const product = await stripe.products.create({
//         name: `NP-${i+1}`,
//     });
//     console.log(product);
// }

// for(let i=0;i<5;i++){
//     const product = await stripe.products.create({
//         name: `BP-${i+1}`,
//     });
//     console.log(product);
// }

// for(let i=0;i<5;i++){
//     const product = await stripe.products.create({
//         name: `GP-${i+1}`,
//     });
//     console.log(product);
// }

const prices = await stripe.prices.list({
    limit: 20,
});

console.log(prices);
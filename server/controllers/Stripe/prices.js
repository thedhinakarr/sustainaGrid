import Stripe from "stripe";


const stripe = Stripe(`sk_test_51MyvmbSGiNjG3rZcOfyOBofLOfZ2oyBYOv4hmuaJ0xmXZyFub3XLThUqtUDzdeECB1V95EG2tLtrAhhtOyToT05V0045wTunku`)


async function x(pid,price){

    const productx = await stripe.products.retrieve(pid);

    console.log(productx)

    const pricex = await stripe.prices.create({
        unit_amount: price,
        currency: 'inr',
        recurring: {interval: 'month'},
        product: productx.id,
    });
}

x("prod_NlBvBpoXsA9NVv",250000)
x("prod_NlBvqM2Sig6FW7",300000)
x("prod_NlBv2BN61uSAGG",200000)
//NP
x("prod_NlBwDcYRJd4P84",500000)
x("prod_NlBwqDJ4zyvcwR",600000)
x("prod_NlBwXUx4WupeA5",700000)
x("prod_NlBw3tSzKy6Uvr",650000)
x("prod_NlBwKUXDhwsrkN",660000)
//BP
x("prod_NlBwzPLm1GPVe5",500000)
x("prod_NlBwimkWztSIBB",510000)
x("prod_NlBw0YaDxekHcJ",510000)
x("prod_NlBwX6cRMDnhQl",520000)
x("prod_NlBwUAOhousPLt",510000)
//GP
x("prod_NlBwngMnzU5Ewl",500000)
x("prod_NlBwLel7LzQImw",600000)
x("prod_NlBwL5qlmkeZoU",600000)
x("prod_NlBwICprCWsmvj",550000)
x("prod_NlBwlrwjVYHDZG",500000)


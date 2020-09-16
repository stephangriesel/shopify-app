console.log("**script tag api test**")

const body = $('body');

body.css({
    'position': 'relative'
})

const shop = Shopify.shop;

const makeApp = products => {

    const bestSellerContainer = $(
        `<div style="overflow-y: scroll;text-align:center;">
            <h3 style="font-family: Arial, Helvetica, sans-serif; margin:0;padding:10px 0;font-weight:bold;">Best Sellers</h3>
            ${products.map(item => {
            return `
            <a href="/products/${item.handle}" style="display:flex; align-items: center;padding:20px 10px; border-top:1px solid black;">
            <img src=${item.images[0].originalSrc} style="width:75px;" />        
            <div style="display:flex; justify-content: space-between; align-items:start;width:100%;">
            <p style="padding: 0 10px;">${item.title}</p>
            <p style="font-weight:bold">$${item.variants[0].price}</p>
            </div>
            </a>
                `
        }).join('')
        }
        </div>`
    )
        .css({
            'position': 'fixed',
            'background-color': '#FFFFFF',
            'border': '1px solid #000000',
            'bottom': '80px',
            'right': '25px',
            'height': '400px',
            'width': '350px',
            'display': 'none'
        })

    const bestSellerButton = $('<img />').attr('src', 'https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923')
        .css({
            'position': 'fixed',
            'width': '150px',
            'bottom': '1%',
            'right': '1%',
            'cursor': 'pointer'
        })

    body.append(bestSellerButton);
    body.append(bestSellerContainer);

    bestSellerButton.click(() => {
        bestSellerContainer.slideToggle();
    })
}

fetch('https://cors-anywhere.herokuapp.com/https://63fb4eb8316c.ngrok.io/api/products?=shop=de-mondkapje.myshopify.com')
    .then(res => res.json())
    .then(data => {
        console.log(data, 'data test for server')
        makeApp(data.data);
    })
    .catch(error => console.log(error));
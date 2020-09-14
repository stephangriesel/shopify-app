console.log("**script tag api test**")

const body = $('body');

body.css({
    'position': 'relative'
})

const shop = Shopify.shop;

const makeApp = products => {
    const bestSellerContainer = $(
        `<div>
            <h3>Best Sellers</h3>
        </div>`
    ).css({
        'position': 'fixed',
        'background-color': '#FFFFFF',
        'border': '1px solid #000000',
        'bottom': '80px',
        'right': '25px',
        'height': '400px',
        'width': '350px',
        'display': 'none'
    })

    const bestSellerButton = $('</img>').attr('src', 'ADDIMAGEHERE')
        .css({
            'position': 'fixed',
            'width': '150px',
            'bottom': '20px',
            'right': '20px',
            'cursor': 'pointer'
        })

    body.append(bestSellerButton);
    body.append(bestSellerContainer);

    bestSellerButton.click(() => {
        bestSellerContainer.slideToggle();
    })
}

fetch('https://cors-anywhere.herokuapp.com/https://6ddf7ee84b03.ngrok.io/api/products?=shop=de-mondkapje.myshopify.com')
    .then(res => res.json())
    .then(data => {
        console.log(data, 'data test for server')
        makeApp(data.data);
    })
    .catch(error => console.log(error));
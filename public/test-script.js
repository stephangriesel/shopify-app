console.log("**script tag api test**")

const header = $('header.site-header').parent();

const makeHeader = data => {
    header.prepend(`<div>${data}</div>`).css({ 'background-color': 'red', 'text-align': 'center' });
}


fetch('https://cors-anywhere.herokuapp.com/https://890cb54f870a.ngrok.io/api/products?shop=de-mondkapje.myshopify.com')
    .then(res => res.json())
    .then(data => {
        console.log(data, 'data test for server')
        makeHeader(data.data)
    })
    .catch(error => console.log(error));
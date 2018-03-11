let paymentMethods = [{
    supportedMethods: ['basic-card'],
    data: {
        supportedNetworks: ['visa', 'mastercard']
    }
}, {
    supportedMethods: ['https://android.pay/pay'],
    data: {
        merchantID: '12345'
    }
}];
let txInfo = {
    total: {
        label: 'total',
        amount: {currency: 'USD', value: '0.01'}
    },
    displayItems: [{
        label: 'Subtotal',
        amount: {currency: 'USD', value: '0.01'}
    }],
    shippingOptions: [{
        id: 'standard',
        label: 'Standard shipping',
        amount: {currency: 'USD', value: '0.01'},
        selected: true
    }, {
        id: 'express',
        label: 'Express shipping',
        amount: {currency: "USD", value: "0.01"}
    }]
};
let options = {
    requestShipping: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestPayerName: true,
    shippingType: 'shipping'
};
let pr = new PaymentRequest(paymentMethods, txInfo, options);

pr.show()
    .then( (res)=> console.log(res, res.complete('success')) )
    .catch( (err)=> console.log(err) );
pr.addEventListener('shippingaddresschange', (e)=> {
    e.updateWith(new Promise((ev)=> ev(txInfo)))
});
pr.addEventListener('shippingoptionchange', (e)=> {
    e.updateWith(new Promise((ev)=> ev(txInfo)))
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then( (reg)=> console.log(reg) )
        .catch( (err)=> console.log(err) )
}

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
let swRegistration;
const applicationServerPublicKey = 'BOiwHQkDJBQfDdftrKhYc3nvvo26R0HmK1ZApG98WY35'+
    'qcv_qnHYD-tO6-nY6cwej2EpZAKrMakvMJclRzdPNrU';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function(subscription) {
            console.log('User is subscribed.', subscription);
        })
        .catch(function(err) {
            console.log('Failed to subscribe the user: ', err);
        });
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then( (reg)=> swRegistration = reg ).then( ()=> subscribeUser() )
        .catch( (err)=> console.log(err) )
}

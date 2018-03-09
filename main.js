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
let pr = new PaymentRequest(paymentMethods, txInfo, options);
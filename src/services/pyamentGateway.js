const RazorPay = require('razorpay');
let keyId = 'rzp_test_Hqy8SPuxif3XKM';
let secret ='OT9cUCJ1HaCAUz4DKfqkk5LN'
let razorpay = new RazorPay({
  key_id: keyId,
  key_secret: secret
})


module.exports = {
    createOrder:  async function(amount){
        var options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        return new Promise(function(resolve,reject){
            razorpay.orders.create(options, function(err, order) {
                if(err){
                    console.log('err',err)
                    return reject("PAYMENT_ORDER_CREATION_FAILED");
                }
                return resolve(order);
                /*
                {
                  "id": "order_DBJOWzybf0sJbb",
                  "entity": "order",
                  "amount": 50000,
                  "amount_paid": 0,
                  "amount_due": 39900,
                  "currency": "INR",
                  "receipt": "order_rcptid_11",
                  "status": "created",
                  "attempts": 0,
                  "notes": [],
                  "created_at": 1566986570
                }

                */
              });
        })
    },
    
    getPaymentPage: (order)=>{
        let html = `<button id="rzp-button1">Pay</button><script src="https://checkout.razorpay.com/v1/checkout.js"></script><script>
        var options = {
            "timeout": 100,    
            "key": '${keyId}', // Enter the Key ID generated from the Dashboard   
            "amount": ${order.amount}, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise    
            "currency": "INR",    
            "name": "Melody Cafe",    
            "description": "Test Transaction",    
            "image": "https://example.com/your_logo",    
            "order_id": '${order.id}', //This is a sample Order ID. Pass the id obtained in the previous step   
            "handler": function (response){        alert(response.razorpay_payment_id);        alert(response.razorpay_order_id);        alert(response.razorpay_signature)    },    
            "theme": {        "color": "#3399cc"    }};
            var rzp1 = new Razorpay(options);rzp1.on('payment.failed', function (response){        alert(response.error.code);        alert(response.error.description);        alert(response.error.source);        alert(response.error.step);        alert(response.error.reason);        alert(response.error.metadata.order_id);        alert(response.error.metadata.payment_id);});document.getElementById('rzp-button1').onclick = function(e){    rzp1.open();    e.preventDefault();}</script>`
         return html;
    }
}

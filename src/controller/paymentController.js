const logger = require('../services/loggerService');
const paymentService = require('../services/pyamentGateway');
module.exports = {
    makePayment:  async function(req,res){
        try{
            const paymentAmount = req.query.plan;
            if(!paymentAmount){
                return res.status(400).send('Bad Request');
            }
            const order = await paymentService.createOrder(paymentAmount);
            const html = await paymentService.getPaymentPage(order);
             return res.status(200).send(html)
            }catch(err){
                logger.error(`[ALBUM-CONTROLLER] :: [GETALBUMBYID] :: `,err);
                let errObj = {
                    type: 'INTERNAl_SERVICE_ERROR',
                    code: 'GETALBUMBYID_NOT_AVAIABLE',
                    message: 'ERROR WHILE GETTING THE ALBUM'
                }  
                return res.status(500).send(errObj);        
            }        
    }
}
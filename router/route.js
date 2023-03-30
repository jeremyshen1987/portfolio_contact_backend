import express from 'express'
const router = express.Router()

import {SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

import dotenv from 'dotenv';
dotenv.config()




const REGION = "ca-central-1";
const ses = new SESClient({region: REGION})


router.post('/email', async (req, res) => {

    const {name, email, message, receiveCopy} = req.body
    const mailTo = [process.env.MY_EMAIL]

    if(receiveCopy === true){
        mailTo.push(email)
    }

    try{

        const result = await sendEmail(name, mailTo, message)
        res.status(200).json({
            msg:'Thank you! I received your message!'
        })

    } catch(err){
        res.json({
            msg: 'Ops, something went wrong'
        })
    }

})


async function sendEmail(name, mailTo, message){

    const params = {

        Destination: {
            ToAddresses: mailTo
        },

        Message: {
            Subject:{
                Data: `Message Received`
            },
            Body: {
                Text: {
                    Data:`Hey ${name}, \n \n Thank you for your message! \nYou wrote: ${message} \n \nJeremy`
                }
                
            },
            
        },

        Source: process.env.MY_EMAIL
    }

    const command = new SendEmailCommand(params)


    return ses.send(command)


}



export default router;
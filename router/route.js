import express from 'express'
const router = express.Router()

import aws from "aws-sdk";

import {SESClient, SendEmailCommand } from "@aws-sdk/client-ses"


const REGION = "ca-central-1";
const ses = new SESClient({region: REGION})


router.post('/email', (req, res) => {

    const {name, email, message} = req.body
    console.log(`name: ${name}, email: ${email}, message: ${message}`)

    // res.send('email page')

    sendEmail(name, email, message)


})


async function sendEmail(name, email, message){

    const params = {

        Destination: {
            ToAddresses: [email]
        },

        Message: {
            Subject:{
                Data: `Hey ${name} I got your message! `
            },
            Body: {
                Text: {
                    Data:`Thank you for your message!  You wrote: ${message}`
                }
                
            },
            
        },

        Source: 'jeremyshen1987@gmail.com'
    }

    const command = new SendEmailCommand(params)


    try{

        ses.send(command)

    } catch(err){
        console.log('oops error: ', err)
    } finally{
        console.log('sendemail function complete')
    }
}



export default router;
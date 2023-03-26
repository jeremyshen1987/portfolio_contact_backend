import express from 'express'
import cors from 'cors'

import router from './router/route.js'

// import { SESClient } from "@aws-sdk/client-ses";
// const REGION = "us-east-1";
// const sesClient = new SESClient({ region: REGION });
// export { sesClient };



const app = express()

app.use(express.json())
app.use(cors())
app.use(router)


app.get('/', (req, res) => {


    res.status(200),
    res.send('hey there')
    
    
})


app.listen(5000, () => {
    console.log('listen on port 5000')
})
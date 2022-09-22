import express from "express"
import * as indexRouter from './modules/index.router.js'
import cors from 'cors'

const baseURL = '/api/v1'
const app = express()

app.use(cors())
app.use(express.json())


app.use(`${baseURL}/users`, indexRouter.userRouter)
app.use(`${baseURL}/products`, indexRouter.productRouter)


app.use('*', (req, res) => {
    res.json({
        messege: '404 Page not found',
        details: 'In-valid method or URL'
    })
})


app.listen(5000, () => {
    console.log('Server is running...........')
})




// index.ts
import express, {Request, Response} from 'express'
import { ProfileRouter } from './router/profile.routes'
import cors from "cors"
import { DonationRouter } from './router/donation.routes'
import { BankRouter } from './router/bank.routes'
import { UserRouter } from './router/user.routes'
import { qrRouter } from './router/qr.routes'

const app = express()
const PORT = 4000
app.use(express.json())
app.use(cors())
app.get('/', (req:Request, res:Response) => {
  res.send('test').status(200)
})
app.use('/profile', ProfileRouter)
app.use('/donation', DonationRouter)
app.use('/bankcard', BankRouter)
app.use('/user', UserRouter)
app.use('/qr', qrRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

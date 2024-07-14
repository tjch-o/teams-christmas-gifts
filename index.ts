const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// app.get("/test", async (req, res) => {
//     try {
//         const result = await prisma.staff.findMany()
//         res.status(200).json(result)
//     } catch (e) {
//         console.log(e)
//     }
// })


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
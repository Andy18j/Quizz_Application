const express = require('express')
const { connection } = require("mongoose")
const {config} = require("./config/db")
const {userRouter} = require("./routes/user.routes")
require("dotenv").config()
const cors = require("cors")
const { quizRouter } = require('./routes/quiz.routes')
// const { errorHandler } = require('./middleware/errorhandler')
const { scheduleCronJobs } = require('./utils/cronjobs');

const app = express()
app.use(express.json())
app.use(cors())




app.use("/api/users", userRouter)
app.use("/api",quizRouter)

app.get('/',(req,res)=>{
    res.send("welcome to Quizz Application🙏")
})


app.listen(process.env.PORT,async()=>{
    try{
         await connection
         console.log("Server connected to the DB")
         scheduleCronJobs();
    }
    catch(error){
        console.log("Server not connected To the DB")
    }
    console.log(`port is running on the ${process.env.PORT}`)
})
const express = require("express")
const {quizModel} = require("../model/quiz.model");
const { auth } = require("../middleware/auth");
const { rateLimiter } = require("../middleware/ratelimiter");
// const { errorHandler } = require("../middleware/errorhandler");

const quizRouter = express.Router()

quizRouter.post('/quizzes',auth, rateLimiter, async(req,res)=>{
    try {
        const { question, options, rightAnswer, startDate, endDate } = req.body;

        if (!Number.isInteger(rightAnswer) || rightAnswer < 0 || rightAnswer >= options.length) {
            return res.status(400).json({ error: 'Invalid rightAnswer index' });
          }


        const quiz = new quizModel({ question, options, rightAnswer, startDate, endDate });
        await quiz.save();
        res.status(201).json({msg:"quiz are created sucessfully"});
      } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Failed to create quiz' });
      }
})


quizRouter.get("/quizzes/active",auth,async(req,res)=>{
    try {
        const now = new Date();
        const activeQuiz = await Quiz.findOne({
          startDate: { $lte: now },
          endDate: { $gte: now },
          status: 'active'
        });
    
        if (!activeQuiz) {
          return res.status(404).json({ error: 'No active quiz found' });
        }
    
        res.json(activeQuiz);
      } catch (error) {
        res.status(400).json({ error: 'Failed to fetch active quiz' });
      }
})

quizRouter.get('/quizzes/:id/active',auth,async(req,res)=>{
    try {
        const { id } = req.params;
        const quiz = await quizModel.findById(id);
    
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
    
        const resultTime = new Date(quiz.endDate).getTime() + 5 * 60 * 1000; // 5 minutes after endDate
        if (Date.now() < resultTime) {
          return res.status(400).json({ error: 'Results not available yet' });
        }
    
        res.json({ correctAnswer: quiz.options[quiz.rightAnswer] });
      } catch (error) {
        res.status(400).json({ error: 'Failed to fetch quiz result' });
      }
})


quizRouter.get("/quizzes/all",auth,async(req,res)=>{
    try {
        const quizzes = await quizModel.find();
        res.json(quizzes);
      } catch (error) {
        res.status(400).json({ error: 'Failed to fetch quizzes' });
      }
})



module.exports = {
    quizRouter
}
const cron = require('node-cron');
const {quizModel} = require('../model/quiz.model');

const scheduleCronJobs = () => {
    cron.schedule('* * * * *', async () => {
      const now = new Date();
      console.log('Cron job running at:', now.toISOString());
  
      // Update quizzes to 'active'
      const activeUpdateResult = await Quiz.updateMany(
        { startDate: { $lte: now }, endDate: { $gte: now }, status: 'inactive' },
        { $set: { status: 'active' } }
      );
      console.log(`Active quizzes updated: ${activeUpdateResult.modifiedCount}`);
  
      // Update quizzes to 'finished'
      const finishedUpdateResult = await Quiz.updateMany(
        { endDate: { $lt: now }, status: { $ne: 'finished' } },
        { $set: { status: 'finished' } }
      );
      console.log(`Finished quizzes updated: ${finishedUpdateResult.modifiedCount}`);
    });
  };
  

module.exports = { 
    scheduleCronJobs
 };
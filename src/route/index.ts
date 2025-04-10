import express from 'express';
import cors from 'cors';
import taskRouter from './taskRoute';



const app = express();
app.use(cors());

app.use(express.json());

// app.use((err, req, res, next) => {
  //   console.error(err);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // });
  
  app.use('/api', taskRouter);
app.listen(3333, () => {
  console.log('server started on port 3333');
});

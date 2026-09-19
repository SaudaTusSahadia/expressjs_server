import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRouter } from './modules/users/user.routs';




const app = express();
const port = config.port;

//initilize database

initDB();



//parser
app.use(express.json());
// app.use(espress.urlencoded({ extended: true }));

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World Node Js!');
});


//users crud
app.use("/users", userRouter);


//todos crud

app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *`,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: result.rows[0]
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: result.rows
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
});


app.use((req, res)=>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Pool, QueryResult } from "pg";
import dotenv from 'dotenv';
import { VDPpappointment } from "../shared/interfaces/VDPpappointment";

const app = express();
app.use(bodyParser.json());
//Create a connection pool, to provide quicker connection
dotenv.config();
console.log(process.env.databaseHost);
console.log(process.env.databaseName);
console.log(process.env.password);
console.log(process.env.port);
const pool = new Pool({
  user: "postgres",
  host: process.env.databaseHost,
  database: process.env.databaseName,
  password: process.env.password,
  port: +process.env.port
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("gpappointment test backend");
});

//get all the Data from database
app.get("/api/getall", (req, res) => {
  pool.query("SELECT * FROM vdp_appointment", (error: Error, results: QueryResult<VDPpappointment[]>) => {
    if (error) {
      res.status(503).send("error message is " + error);
    } else {
      res.send(results);
    }
  });
});

//post all 
app.post("/api/postappointment",(req,res)=>{
  pool.query("INSERT INTO vdp_appointment VALUES (?,?,?,?,?,?,?)",req.body, (error: Error, results: QueryResult<VDPpappointment[]>) => {
    if (error) {
      res.status(403).send("error message is " + error);
    } else {
      res.send(results);
    }
  });
})

app.post("/api/vdp_main",(req,res)=>{
  pool.query("INSERT INTO vdp_main VALUES (?,?,?,?,?,?)",req.body, (error: Error, results: QueryResult<VDPpappointment[]>) => {
    if (error) {
      res.status(403).send("error message is " + error);
    } else {
      res.send(results);
    }
  });
})

// start the Express server
const server = app.listen(8080, () => {});

export default { app, server };

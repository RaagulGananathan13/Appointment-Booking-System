import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "password",
    database: "test",
});



app.get("/", (req, res) => {
    res.json("hello this is the backend");
  });

  app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post("/users", (req, res) => {
    const q = "INSERT INTO users(`username`, `phone`, `profilepicture`, `email`) VALUES (?)";
  
    const values = [
        req.body.username,
        req.body.phone,
        req.body.profilepicture,
        req.body.email,
      ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    });

    app.delete("/users/:id", (req, res) => {
        const userId = req.params.id;
        const q = " DELETE FROM users WHERE id = ? ";
      
        db.query(q, [userId], (err, data) => {
          if (err) return res.send(err);
          return res.json(data);
        });
      });



app.listen(8800, () =>{
    console.log("Connectd to Backend!")
})


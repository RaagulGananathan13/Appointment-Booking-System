import express from "express"
import mysql from "mysql"


const app = express()
app.use(express.json());


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
    const q = "INSERT INTO users(`username`, `phone`, `profilepicture`) VALUES (?)";
  
    const values = [
        req.body.username,
        req.body.phone,
        req.body.profilepicture,
      ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    });

app.listen(8800, () =>{
    console.log("Connectd to Backend!")
})


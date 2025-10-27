import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

const users = []; 

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token }, { message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  // const cookies = req.headers.cookie;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json({ message: "Profile information", user });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import quizRouter from "./routes/quiz.route.js";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "view")));

app.use("/api/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
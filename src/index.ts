import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import errormiddleware from "./middlewares/error.middleware";
import routes from "./routes";

require("dotenv").config();

const app: Application = express();   // create instance server
app.use(express.json());              // middleware to parse incoming requests
app.use(morgan("common"));            // HTTP request logger middleware
app.use(helmet());                    // HTTP security middleware
app.use(errormiddleware);

// Apply the rate limiting middleware
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100,                 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after an hour",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
const port = 3000;


app.use((_req: Request, res: Response) => {
  res.send("Store Front - Backend Project");
});

app.listen(port, () => console.log(`listen on ${port}`));

export default app;

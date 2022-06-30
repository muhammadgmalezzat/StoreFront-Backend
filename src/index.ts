import express, { Application ,Request , Response} from 'express';


const app:Application = express();

const port = 3000;


app.get('/', (req: Request, res: Response) => {
    res.send("ffffffffffffffffffff");
})

app.listen(port, () => console.log(`listen on ${port}`));

export default app;

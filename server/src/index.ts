import express, {
  Application,
} from 'express';

const APP_PORT: number = 5000;

const app: Application = express();

app.use(express.json());

app.listen(APP_PORT, () => {
  console.log(`Server running on http://localhost:${APP_PORT}`);
});

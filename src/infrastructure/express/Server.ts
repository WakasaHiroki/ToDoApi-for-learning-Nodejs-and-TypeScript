import * as express from 'express';
import router from './router';

const app = express();

// bodyがundefinedにならないように
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route設定
app.use('/api', router);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

export default app;

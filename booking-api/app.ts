import { JSONPreset } from 'lowdb/node'
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

type Data = {
  users: {id: number, username: string, password: string}[],
  bookings: {id: number, from: string, to: string, persons: number}[]
}

const init = async () => {
  const defaultData = { users: [{id: 1, username: "admin", password: "admin"}], bookings: [] }
  const db = await JSONPreset<Data>('db.json', defaultData)
  await db.write();

  const app: Express = express(); 
  app.use(cors());
  app.use(bodyParser.json())

  app.get('/', (req: Request, res: Response) => {
    res.send({ success: true, message: 'bookings-api' });
  });


  app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = db.data.users.find(user => user.username === username && user.password === password);
    if (user) {
      res.send({ success: true, user });
    } else {
      res.send({ success: false });
    }
  });

  app.post('/logout', (req: Request, res: Response) => {
    res.send({ success: true });
  });

  app.get('/booking', (req: Request, res: Response) => {
    const { from, to } = req.query;
    if (from && to) {
      const bookings = db.data.bookings.filter(booking => booking.from >= from && booking.to <= to);
      res.send({ success: true, bookings });
    } else {
      res.send({ success: true, bookings: db.data.bookings });
    }
  });

  app.post('/booking', (req: Request, res: Response) => {
    const { from, to, persons } = req.body;
    const id = db.data.bookings.reduce((max, booking) => Math.max(max, booking.id), 0) + 1;
    const booking = { id, from, to, persons };
    db.data.bookings.push(booking);
    db.write();
    res.send({ success: true, booking });
  });

  app.delete('/booking/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = db.data.bookings.findIndex(booking => booking.id === id);
    if (index > -1) {
      db.data.bookings.splice(index, 1);
      db.write();
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });

  app.listen(8000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:8000`);
  });
};

init();


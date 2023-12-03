import { JSONPreset } from 'lowdb/node'
import express, { Express, Request, Response } from 'express';

type Data = {
  posts: string[]
}

const runDB = async () => {
  // Read or create db.json
const defaultData = { posts: [] }
const db = await JSONPreset<Data>('db.json', defaultData)

// Create and query items using plain JavaScript
db.data.posts.push('hello world')
const firstPost = db.data.posts[0]

// If you don't want to type db.data everytime, you can use destructuring assignment
const { posts } = db.data
posts.push('hello world')

// Finally write db.data content to file
await db.write()
};

runDB();

const app: Express = express();


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const createArticle = async (
  title: string,
  content: string
): Promise<boolean> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.insertOne({ title, content });

    return !!res;
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

export default createArticle;

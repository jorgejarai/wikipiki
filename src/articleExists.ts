import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const articleExists = async (title: string): Promise<boolean | undefined> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.findOne({ title });

    return !!res;
  } catch (e) {
    return undefined;
  } finally {
    await client.close();
  }
};

export default articleExists;

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const deleteArticle = async (title: string): Promise<boolean> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.deleteOne({ title });

    return !!res;
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

export default deleteArticle;

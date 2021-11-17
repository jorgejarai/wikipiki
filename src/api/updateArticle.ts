import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const updateArticle = async (
  title: string,
  content: string
): Promise<boolean> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.updateOne({ title }, { $set: { content } });

    return res && res.modifiedCount === 1;
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

export default updateArticle;

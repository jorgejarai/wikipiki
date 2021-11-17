import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const fetchArticle = async (title: string): Promise<string | undefined> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.findOne({ title });

    if (!res) {
      return undefined;
    }

    return res['content'];
  } catch (e) {
    return '';
  } finally {
    await client.close();
  }
};

export default fetchArticle;

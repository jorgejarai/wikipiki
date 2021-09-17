import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const fetchArticleNames = async (): Promise<string[]> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles
      .find(
        {},
        {
          projection: {
            _id: 0,
            title: 1,
          },
        }
      )
      .toArray();

    const titles = res.map((doc) => doc.title);

    if (!res) {
      return [];
    }

    return titles;
  } catch (e) {
    return [];
  } finally {
    await client.close();
  }
};

export default fetchArticleNames;

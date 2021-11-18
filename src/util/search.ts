import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const searchDocuments = async (search: string): Promise<string[]> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const result = await articles
      .find(
        {
          title: { $regex: search, $options: '$i' },
        },
        { limit: 10, projection: { title: 1 } }
      )
      .toArray();

    return result.map(({ title }) => title);
  } catch (e) {
    return [];
  } finally {
    client.close();
  }
};

export { searchDocuments };

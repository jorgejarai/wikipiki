import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

const renameArticle = async (
  oldTitle: string,
  newTitle: string
): Promise<boolean> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.updateOne(
      { title: oldTitle },
      { $set: { title: newTitle } }
    );

    return !!res;
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

export default renameArticle;

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!!);

type ArticleResult = {
  error: string | null;
  content: string | null;
};

const fetchArticle = async (title: string): Promise<ArticleResult> => {
  try {
    await client.connect();

    const database = client.db('wikipiki');
    const articles = database.collection('articles');

    const res = await articles.findOne({ title });

    if (!res) {
      return {
        error: 'not_found',
        content: null,
      };
    }

    return {
      error: null,
      content: res['content'],
    };
  } catch (e) {
    return {
      error: 'general_error',
      content: null,
    };
  } finally {
    await client.close();
  }
};

export default fetchArticle;

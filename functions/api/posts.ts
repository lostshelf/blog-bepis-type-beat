export default async function handler(req, res) {
  const kv = process.env.BLOG_POSTS as KVNamespace;
  const allPosts = await kv.list();

  const posts = await Promise.all(
    allPosts.keys.map(async (key) => {
      const data = await kv.get(key);
      return { id: key, content: data };
    }),
  );

  res.status(200).json(posts);
}

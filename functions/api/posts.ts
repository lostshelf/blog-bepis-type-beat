/// <reference types="@cloudflare/workers-types" />

export const onRequestGet async (context) => {
  const kv = (context.env as any).BLOG_POSTS as KVNamespace;
  const allPosts = await kv.list();
  const posts = await Promise.all(
    allPosts.keys.map(async (key) => {
      const content = await kv.get(key.name);
      return { id: key, content };
    }),
  );

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
};

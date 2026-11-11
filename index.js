const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BlogPosts = [
  {
    slug: 'first-blog-post',
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    slug: 'second-blog-post',
    title: 'Second Blog Post',
    description: 'Hello React Router v6',
  },
];
app.get('/api/posts', (req, res) => res.json(BlogPosts));

app.get('/api/posts/:slug', (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts.find((p) => p.slug === slug);
  if (!post) {
    return res.status(404).json({ error: 'Not found!' });
  }
  res.json(post);
});
app.post('/api/post', (req, res) => {
  const { slug, title, description } = req.body;
  if (!slug || !title || !description) {
    return res.status(400).json({ error: 'Thieu du lieu' });
  }
  BlogPosts.push({ slug, title, description });
  res.status(201).json({ message: 'Them thanh cong' });
});
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    return res.json({ username: 'admin' });
  }
  return res.status(401).json({ message: 'Login failed!' });
});
app.listen(8080, () => console.log('Listening on port 8080...'));

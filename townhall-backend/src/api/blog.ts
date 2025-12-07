import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';

const router = Router();

// GET /api/blog - List all blog posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await sanityService.getBlogPosts();

    const blogPosts = posts.map((post) => ({
      slug: post.slug.current,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: post.author && typeof post.author !== 'string'
        ? {
            name: post.author.name,
            image: post.author.image?.asset?.url,
          }
        : null,
      mainImage: post.mainImage?.asset?.url,
      categories: post.categories || [],
      tags: post.tags || [],
      readTime: post.readTime,
    }));

    res.json({ posts: blogPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET /api/blog/:slug - Get single blog post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await sanityService.getBlogPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const blogPost = {
      slug: post.slug.current,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: post.author && typeof post.author !== 'string'
        ? {
            name: post.author.name,
            bio: post.author.bio,
            image: post.author.image?.asset?.url,
          }
        : null,
      mainImage: post.mainImage?.asset?.url,
      body: post.body ? sanityService.portableTextToHtml(post.body) : null,
      categories: post.categories || [],
      tags: post.tags || [],
      readTime: post.readTime,
      seo: post.seo || {},
    };

    res.json({ post: blogPost });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

export default router;

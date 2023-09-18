import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type End = 'frontend' | 'backend'

/**
 * # Get Blogs
 *
 * @description Gets all blogs from the database
 * @returns {object} JSON stringified object with all blogs
 *
 * @example
 * ```ts
 * // Get the number of blogs across the platform
 * const blogs = await getBlogs();
 * ```
 */
async function getTotalBlogs({ end }: { end: End }) {
  if (end === "frontend") {
    const blogs = await fetch(process.env.URL + "/api/blogs/total");

    return JSON.stringify({ totalBlogs: await blogs.json() });
  }
  if (end === "backend") {
    const blogs = await prisma.blog.count({});
    return JSON.stringify({ totalBlogs: blogs });
  }
}

/**
 *  # Get Blogs for Email
 * @param {string} email - The email of the author
 * @returns {object} JSON stringified object with all blogs for the author
 * @example
 * ```ts
 * // Get all blogs for the author with the email
 * const blogs = await getBlogsForEmail({ email: "jhondoe@gmail.com" });
 * ```
 */
async function getBlogsForEmail({
  email,
  end,
}: {
  email: string;
  end: End;
}) {
  // TODO: Logging
  if (end === "frontend") {
    try {
      const blogs = await fetch(process.env.URL + "/api/blogs/totalEmail", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      return JSON.stringify({ blogs: await blogs.json() });
    } catch (err: any) {
      return JSON.stringify({ err: { err } });
    }
  }
  if (end === "backend") {
    try {
      const authorBlogs = await prisma.blog.findMany({
        where: {
          email: email,
        },
      });

      return authorBlogs;
    } catch (err: any) {
      return JSON.stringify({ err: { err } });
    } finally {
      await prisma.$disconnect();
    }
  }
}

async function checkForBlog({blogName, end}: {blogName: string, end: End}) {
  const findBlog = await prisma.blog.findUnique({
    where: {
      title: blogName,
    },
  });
  if (!findBlog) return false;
  return true;
}

export { getTotalBlogs, getBlogsForEmail, checkForBlog };

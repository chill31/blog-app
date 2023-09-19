import { log } from "@logtail/next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

type End = "frontend" | "backend";

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
  log.info("Getting total blogs", { end });
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
async function getBlogsForEmail({ email, end }: { email: string; end: End }) {
  // TODO: Logging
  if (end === "frontend") {
    try {
      const blogs = await fetch(process.env.URL + "/api/blogs/totalEmail", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      return JSON.stringify({ blogs: await blogs.json() });
    } catch (err: any) {
      const randomCode = crypto.randomBytes(4).toString("hex");
      log.error("Error getting blogs for email", { err, erroCode: randomCode });
      return JSON.stringify({ err: { err }, randomCode });
    }
    finally {
      log.flush()
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
      const randomCode = crypto.randomBytes(4).toString("hex");
      return JSON.stringify({ err: { err }, randomCode });
    } finally {
      log.flush()
      await prisma.$disconnect();
    }
  }
}

async function checkForBlog({ blogName, end }: { blogName: string; end: End }) {
  try {
    const findBlog = await prisma.blog.findUnique({
      where: {
        title: blogName,
      },
    });
    if (!findBlog) return false;
    return true;
  }
  catch(err: any) {
    const randomCode = crypto.randomBytes(4).toString("hex");
    log.error("Error checking for blog", { err, erroCode: randomCode });
    return JSON.stringify({ err: { err }, randomCode });
  }
  finally {
    log.flush()
  }
}

export { getTotalBlogs, getBlogsForEmail, checkForBlog };

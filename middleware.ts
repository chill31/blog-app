import { authMiddleware } from "@clerk/nextjs";
import { pathToRegexp } from "path-to-regexp"
 
export default authMiddleware({
  publicRoutes: ["/", "/dashboard", "/api/metadata", "/auth/signUp", "/auth/signIn", '/api/blogs/create', '/api/blogs/total', '/api/blogs/totalEmail', '/api/blogs/checkBlogOwnership', '/api/blogs/delete', '/api/blogs/edit/getBlogData', '/api/blogs/edit', '/api/blogs/getBlogByTitle', '/blogs/(.*)', '/api/uploadthing'],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

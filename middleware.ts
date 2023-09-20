import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/dashboard", "/api/metadata", "/auth/signUp", "/auth/signIn", '/api/blogs/create', '/api/blogs/total', '/api/blogs/totalEmail'],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export async function POST(request: Request) {
  const { ADMIN_PASS } = process.env;
  const { givenPass } = await request.json();

  if(ADMIN_PASS === givenPass) {
    return new Response(JSON.stringify({ success: true }), {status: 200})
  }

  return new Response(JSON.stringify({ success: false }), {status: 403});
}
import Button from "../elements/Button";

export default function NoBlogs() {
  return (
    <>
      <h1 className="text-7xl font-bold">You don&apos;t have any blogs.</h1>
      <Button>Write a blog.</Button> { /* TODO */ }
      <Button variant="bordered">Read some articles</Button> {/* TODO */ }
    </>
  );
}

import Link from "next/link";
import Button from "../elements/Button";

export default function HomeButton() {
  return (
    <div className="absolute top-5 left-5 flex items-center justify-start gap-2">
    <Link href="/">
      <Button>Home</Button>
    </Link>
    </div>
  )
}
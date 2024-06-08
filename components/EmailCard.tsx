import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClass } from "@/lib/helpers/get-tag";
import Link from "next/link";

export default function EmailCard({
  id,
  sender,
  snippet,
  tag,
}: {
  id: string;
  sender: string;
  snippet: string;
  tag: string | null;
}) {
  return (
    <Card>
      <Link href={`/email/${id}`}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {sender}
            {getClass(tag)}
          </CardTitle>
          <CardDescription className="pt-2">{snippet}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}

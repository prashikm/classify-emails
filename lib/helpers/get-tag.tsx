export function getClass(tag: string | null) {
  if (tag === "important") {
    return <span className="text-red-500">Important</span>;
  }

  if (tag === "promotion") {
    return <span className="text-green-500">Promotion</span>;
  }

  if (tag === "social") {
    return <span className="text-blue-500">Social</span>;
  }

  if (tag === "marketing") {
    return <span className="text-purple-500">Marketing</span>;
  }

  if (tag === "spam") {
    return <span className="text-yellow-500">Spam</span>;
  }

  if (tag === "general") {
    return <span className="text-gray-500">General</span>;
  }

  return null;
}

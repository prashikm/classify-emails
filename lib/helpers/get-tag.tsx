export function getClass(tag: string | null) {
  if (tag === "important") {
    return <span style={{ color: "#dc2626" }}>Important</span>;
  }

  if (tag === "promotion") {
    return <span style={{ color: "#16a34a" }}>Promotion</span>;
  }

  if (tag === "social") {
    return <span style={{ color: "#2563eb" }}>Social</span>;
  }

  if (tag === "marketing") {
    return <span style={{ color: "#9333ea" }}>Marketing</span>;
  }

  if (tag === "spam") {
    return <span style={{ color: "#ca8a04" }}>Spam</span>;
  }

  if (tag === "general") {
    return <span style={{ color: "#4b5563" }}>General</span>;
  }

  return null;
}

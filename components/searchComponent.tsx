"use client";

export default function HighlightText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query) {
    return <span>{text}</span>;
  }

  // Escape special characters in the query to avoid regex injection
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regular expression to match the query
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  // Split the text into parts based on the query
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        return part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
}

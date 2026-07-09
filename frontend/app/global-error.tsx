"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
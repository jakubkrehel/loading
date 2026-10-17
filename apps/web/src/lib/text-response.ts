export function textResponse(
  body: string,
  type: "markdown" | "plain"
): Response {
  return new Response(body, {
    headers: { "Content-Type": `text/${type}; charset=utf-8` },
  });
}

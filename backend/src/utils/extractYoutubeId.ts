export function extractYoutubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // youtu.be short link
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    // youtube.com link
    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}
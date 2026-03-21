// src/utils/detectLinkType.ts

export const detectLinkType = (link: string): "youtube" | "tweet" | "unknown" => {
  
  if (
    link.includes("youtube.com/watch") ||
    link.includes("youtu.be/")
  ) {
    return "youtube";
  }

  if (
    link.includes("twitter.com") ||
    link.includes("x.com")
  ) {
    return "tweet";
  }

  return "unknown";
};
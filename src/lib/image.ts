export const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop";

export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const t = e.currentTarget;
  if (t.src !== PLACEHOLDER_IMG) t.src = PLACEHOLDER_IMG;
}

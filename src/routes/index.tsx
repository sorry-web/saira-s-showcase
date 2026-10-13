import { createFileRoute } from "@tanstack/react-router";
import { Presentation } from "@/components/presentation/presentation";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "St Anthony’s Reimagined | Ms Saira Imtiaz" },
    { name: "description", content: "An interactive educational leadership presentation by Ms Saira Imtiaz: transforming St Anthony’s School through the McKinsey 7-S Framework." },
    { property: "og:title", content: "St Anthony’s Reimagined — Seven Elements, One Transformation" },
    { property: "og:description", content: "Explore a coherent and sustainable school improvement strategy, created and presented by Ms Saira Imtiaz." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Presentation,
});

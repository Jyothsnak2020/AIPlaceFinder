import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo1() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={budget} />
    </div>
  );
}
export const budget = [
  {
    title: "Just Me",
    description:"A sole traveles in exploration.",
    icon: "✈️",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    icon: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    icon: "https://microsoft.com",
  },
];

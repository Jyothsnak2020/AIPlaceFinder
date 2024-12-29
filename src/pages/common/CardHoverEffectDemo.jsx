import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className=" mx-auto"> {/* Adjusted z-index */}
      <HoverEffect items={personOptions} />
    </div>
  );
}

const personOptions = {
  places:[  { title: "Solo Explorer", description: "Embark on a solo adventure, discovering new places and embracing the freedom of traveling alone.", icon: "🌍" },
  { title: "Couple Getaway", description: "Enjoy romantic getaways with your partner, creating unforgettable memories together in beautiful destinations.", icon: "❤️" },
  { title: "Family Vacation", description: "Plan fun-filled vacations with your family, exploring exciting destinations and making cherished memories together.", icon: "👨‍👩‍👧‍👦" },
  { title: "Friends' Adventure", description: "Join forces with friends for thrilling adventures and exciting trips, creating moments of joy and camaraderie.", icon: "🎉" },
  { title: "Business Trip", description: "Combine work with exploration during your business trips, balancing professional commitments with opportunities for discovery.", icon: "💼" },
  { title: "Group Tour", description: "Explore new destinations with a guided group tour, benefiting from expert guidance and shared experiences with fellow travelers.", icon: "🗺️" }
]};

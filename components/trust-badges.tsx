const badges = [
  "Female Instructor",
  "Automatic Specialists",
  "5-Star Local Reputation",
  "Beginner & Nervous Driver Friendly"
];

export default function TrustBadges() {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {badges.map((badge) => (
        <li
          key={badge}
          className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-glow backdrop-blur"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}

export type CourseCategory =
  | "beginner"
  | "package"
  | "intensive"
  | "advanced"
  | "specialist";

export interface CourseFeature {
  text: string;
  included: boolean;
}

export interface Course {
  id: string;
  name: string;
  tagline: string;
  category: CourseCategory;
  hours: number;
  priceGbp: number;
  originalPriceGbp?: number; // for showing savings
  savingGbp?: number;
  pricePerHour?: number;
  popular?: boolean;
  badge?: string;
  badgeColor?: "blue" | "violet" | "emerald" | "amber" | "cyan" | "rose";
  description: string;
  whoIsItFor: string;
  features: CourseFeature[];
  includes: string[];
  colour: "blue" | "violet" | "emerald" | "amber" | "cyan" | "rose";
  icon: string; // emoji icon
}

export const COURSES: Course[] = [
  {
    id: "taster",
    name: "Taster Lesson",
    tagline: "Try before you commit",
    category: "beginner",
    hours: 2,
    priceGbp: 75,
    pricePerHour: 37.5,
    description:
      "A relaxed, no-pressure introduction to driving. Perfect if you've never sat behind the wheel and want to find out what it's like before booking a full course.",
    whoIsItFor: "Complete beginners with zero experience",
    badge: "No commitment",
    badgeColor: "cyan",
    colour: "cyan",
    icon: "🚗",
    features: [
      { text: "2-hour hands-on session", included: true },
      { text: "DVSA-approved instructor", included: true },
      { text: "Car controls & cockpit drill", included: true },
      { text: "Basic manoeuvres", included: true },
      { text: "Post-lesson written feedback", included: true },
      { text: "Dual-controlled vehicle", included: true },
    ],
    includes: [
      "2-hour lesson",
      "Personalised learning plan",
      "Lesson feedback report",
    ],
  },
  {
    id: "starter-pack",
    name: "Starter Pack",
    tagline: "Build your foundations",
    category: "package",
    hours: 10,
    priceGbp: 390,
    originalPriceGbp: 450,
    savingGbp: 60,
    pricePerHour: 39,
    description:
      "Ten hours of structured tuition that takes you from the very basics to confidently navigating roads and junctions. Great for getting road-ready before you commit to a bigger package.",
    whoIsItFor: "New learners — 0 to basic road confidence",
    colour: "blue",
    icon: "📚",
    features: [
      { text: "10 hours of structured lessons", included: true },
      { text: "Theory test guidance", included: true },
      { text: "City and residential driving", included: true },
      { text: "Junctions, roundabouts & mini-roundabouts", included: true },
      { text: "Progress tracker in student dashboard", included: true },
      { text: "Motorway included", included: false },
    ],
    includes: [
      "10 lesson hours",
      "Lesson-by-lesson plan",
      "Theory test study guide",
    ],
  },
  {
    id: "standard-pack",
    name: "Standard Pack",
    tagline: "Our most popular course",
    category: "package",
    hours: 20,
    priceGbp: 740,
    originalPriceGbp: 900,
    savingGbp: 160,
    pricePerHour: 37,
    popular: true,
    badge: "Most popular",
    badgeColor: "blue",
    description:
      "Twenty hours designed to take you from beginner to test-ready. Covers everything on the DVSA syllabus including bay parking, parallel parking, and independent driving.",
    whoIsItFor: "Learners aiming to reach test standard",
    colour: "blue",
    icon: "⭐",
    features: [
      { text: "20 hours of structured lessons", included: true },
      { text: "Full DVSA syllabus coverage", included: true },
      { text: "Mock driving test included", included: true },
      { text: "All parking manoeuvres", included: true },
      { text: "Independent driving practice", included: true },
      { text: "Emergency stop practice", included: true },
    ],
    includes: [
      "20 lesson hours",
      "Mock test session",
      "Full DVSA syllabus",
      "Theory test study guide",
    ],
  },
  {
    id: "complete-pack",
    name: "Complete Pack",
    tagline: "Best value — start to pass",
    category: "package",
    hours: 30,
    priceGbp: 1050,
    originalPriceGbp: 1350,
    savingGbp: 300,
    pricePerHour: 35,
    badge: "Best value",
    badgeColor: "emerald",
    description:
      "Our comprehensive 30-hour package covers every aspect of the DVSA driving test syllabus. Ideal if you're starting from scratch and want a single package that takes you all the way to passing.",
    whoIsItFor: "Beginners wanting the full journey to test pass",
    colour: "emerald",
    icon: "🏆",
    features: [
      { text: "30 hours of structured lessons", included: true },
      { text: "Full DVSA syllabus coverage", included: true },
      { text: "2× mock driving tests", included: true },
      { text: "All parking manoeuvres", included: true },
      { text: "Dual carriageway & faster roads", included: true },
      { text: "Test-day tips & debrief", included: true },
    ],
    includes: [
      "30 lesson hours",
      "2× mock tests",
      "Full DVSA syllabus",
      "Theory test guide",
      "Test-day brief",
    ],
  },
  {
    id: "intensive",
    name: "Intensive Course",
    tagline: "Pass in weeks, not months",
    category: "intensive",
    hours: 16,
    priceGbp: 680,
    pricePerHour: 42.5,
    badge: "Fast-track",
    badgeColor: "violet",
    description:
      "A concentrated 16-hour course delivered over 1–2 weeks, ideal for learners who need to get on the road quickly. Includes a mock test and practical test booking support.",
    whoIsItFor: "Learners with some experience who need to pass fast",
    colour: "violet",
    icon: "⚡",
    features: [
      { text: "16 hours over 1–2 weeks", included: true },
      { text: "Dedicated instructor (same person throughout)", included: true },
      { text: "Mock practical test included", included: true },
      { text: "Test booking support", included: true },
      { text: "Theory test resources", included: true },
      { text: "Includes DVSA test fee", included: false },
    ],
    includes: [
      "16 lesson hours",
      "Dedicated instructor",
      "Mock test",
      "Test booking support",
    ],
  },
  {
    id: "pass-plus",
    name: "Pass Plus",
    tagline: "Drive smarter, pay less insurance",
    category: "advanced",
    hours: 6,
    priceGbp: 250,
    pricePerHour: 41.67,
    badge: "Post-test",
    badgeColor: "amber",
    description:
      "The DVSA-recognised Pass Plus course for newly qualified drivers. Six hours covering motorway driving, all-weather conditions, and night driving. Many insurers offer discounts of up to 35%.",
    whoIsItFor: "Newly qualified drivers seeking insurance discounts",
    colour: "amber",
    icon: "🛡️",
    features: [
      { text: "6-hour DVSA-accredited course", included: true },
      { text: "Motorway driving module", included: true },
      { text: "All-weather & night driving", included: true },
      { text: "Rural & dual carriageway roads", included: true },
      { text: "Insurance discount eligibility", included: true },
      { text: "DVSA Pass Plus certificate", included: true },
    ],
    includes: [
      "6 lesson hours",
      "DVSA Pass Plus certificate",
      "Motorway module",
      "Night driving session",
    ],
  },
  {
    id: "motorway",
    name: "Motorway Lesson",
    tagline: "Conquer the fast lane",
    category: "specialist",
    hours: 2,
    priceGbp: 85,
    pricePerHour: 42.5,
    description:
      "A dedicated 2-hour session on the motorway for newly qualified drivers or nervous licence holders. Covers joining, lane discipline, overtaking safely, and leaving the motorway.",
    whoIsItFor: "Full licence holders nervous on motorways",
    colour: "rose",
    icon: "🛣️",
    features: [
      { text: "2-hour motorway session", included: true },
      { text: "Joining & exiting safely", included: true },
      { text: "Lane discipline", included: true },
      { text: "Overtaking & following distance", included: true },
      { text: "High-speed hazard awareness", included: true },
      { text: "Full driving licence required", included: true },
    ],
    includes: [
      "2-hour motorway lesson",
      "Post-lesson debrief",
      "Motorway driving tips guide",
    ],
  },
  {
    id: "theory-prep",
    name: "Theory Test Prep",
    tagline: "Ace your theory first time",
    category: "specialist",
    hours: 2,
    priceGbp: 80,
    pricePerHour: 40,
    description:
      "A focused 2-hour practical revision session tailored to the DVSA theory test. Your instructor covers the most commonly failed hazard perception clips and knowledge questions, plus a timed mock test.",
    whoIsItFor: "Learners preparing for the DVSA theory test",
    colour: "cyan",
    icon: "📋",
    features: [
      { text: "2-hour structured revision session", included: true },
      { text: "Hazard perception coaching", included: true },
      { text: "Mock theory test (50 questions)", included: true },
      { text: "Commonly failed topic review", included: true },
      { text: "DVSA revision resources", included: true },
      { text: "Available online or in-car", included: true },
    ],
    includes: [
      "2-hour session",
      "Mock theory test",
      "Hazard perception coaching",
      "DVSA study pack",
    ],
  },
];

export const COURSE_FAQS = [
  {
    q: "Are the prices per lesson or for the full package?",
    a: "Package prices shown are for the full block of hours. You pay upfront and book individual lessons from your credit — no per-lesson booking fees.",
  },
  {
    q: "What happens if I need more hours than my package?",
    a: "You can top up at any time at your instructor's standard hourly rate, or upgrade to a larger package for a better per-hour rate.",
  },
  {
    q: "Are the prices the same across the UK?",
    a: "Prices shown are London market rates (2025). Instructors in other cities may charge slightly less — the exact rate is always shown on each instructor's profile before you book.",
  },
  {
    q: "Do prices include the DVSA practical test fee?",
    a: "No. The DVSA practical test fee (currently £62 on a weekday, £75 on evenings/weekends) is paid separately when you book your test with the DVSA directly.",
  },
  {
    q: "Can I get a refund if I need to cancel?",
    a: "Yes. Any unused lesson hours are fully refundable, provided you cancel with at least 48 hours notice. Last-minute cancellations may be charged one lesson credit.",
  },
  {
    q: "How long is each lesson?",
    a: "Standard lessons are 1 or 2 hours — you choose when booking. We recommend 2-hour sessions as they give more productive learning time.",
  },
];

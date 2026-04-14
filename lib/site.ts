export const siteConfig = {
  name: "Mariyam DS",
  description:
    "Premium automatic driving lessons in Stoke Newington with a professional female instructor. Calm, confidence-building instruction for beginners to advanced learners.",
  url: "https://www.mariyamds.co.uk",
  location: "Stoke Newington, London, UK",
  phone: "+44 7812 157242",
  email: "hello@mariyamds.co.uk",
  whatsapp: "447812157242"
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/lessons-courses", label: "Lessons & Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" }
];

export const bookingLink = { href: "/book", label: "Book a Lesson" };

export const faqs = [
  {
    question: "Do you teach complete beginners?",
    answer:
      "Yes. Lessons are structured for first-time drivers with calm, step-by-step coaching and clear progress milestones."
  },
  {
    question: "Do you only teach automatic?",
    answer:
      "Yes, Mariyam DS specialises exclusively in automatic driving lessons for faster confidence and a simpler learning experience."
  },
  {
    question: "Can nervous learners book with you?",
    answer:
      "Absolutely. Lessons are paced around your confidence, with patient guidance and practical anxiety-reduction strategies."
  },
  {
    question: "Do you offer intensive courses?",
    answer:
      "Yes. Fast-track intensive plans are available for learners who want focused progress in a shorter timeframe."
  },
  {
    question: "How does your pricing work?",
    answer:
      "Lessons are £43 per hour as standard. The rate is £47 per hour after 5pm on weekdays and all day Saturday. Sundays are closed."
  }
];

export const testimonials = [
  {
    name: "Aisha K.",
    rating: 5,
    content:
      "I was a very nervous beginner and Mariyam made me feel safe from the first lesson. Calm teaching, clear instructions, and I passed first time.",
    experience: "Beginner to pass"
  },
  {
    name: "Sophie M.",
    rating: 5,
    content:
      "The automatic lessons were structured and professional. Every session had a clear focus and my confidence improved quickly.",
    experience: "Block booking"
  },
  {
    name: "Nadia R.",
    rating: 5,
    content:
      "I booked an intensive package and made huge progress in a short period. Highly recommended for anyone in Hackney or Stoke Newington.",
    experience: "Intensive course"
  }
];

export const pricingPlans = [
  {
    title: "Single Lesson",
    price: "£43",
    subtitle: "Per hour standard",
    description: "£47 per hour after 5pm weekdays and all day Saturday. Sundays closed.",
    features: [
      "1:1 automatic lesson",
      "Progress feedback after each session",
      "Ideal for refreshers and weekly learning"
    ]
  },
  {
    title: "5-Lesson Bundle",
    price: "£205",
    subtitle: "Save £10",
    description: "Built from weekday daytime rates for better value.",
    features: [
      "5 x 1-hour lessons",
      "Structured milestone plan",
      "Priority weekly slots"
    ],
    popular: true
  },
  {
    title: "10-Lesson Bundle",
    price: "£400",
    subtitle: "Save £30",
    description: "Best value for consistent exam-focused progress.",
    features: [
      "10 x 1-hour lessons",
      "Mock test preparation",
      "Personalised route planning"
    ]
  },
  {
    title: "Intensive Example",
    price: "From £860",
    subtitle: "20 hours",
    description: "Fast-track training for urgent timelines.",
    features: [
      "20 hours over 1-2 weeks",
      "Beginner-friendly structure",
      "Ideal before practical test"
    ]
  }
];

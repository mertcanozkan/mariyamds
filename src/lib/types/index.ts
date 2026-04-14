export type Transmission = "manual" | "automatic" | "both";
export type LessonType = "intro" | "standard" | "motorway" | "test-prep" | "pass-plus";
export type UserRole = "student" | "instructor" | "admin";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type TestStatus = "not-started" | "booked" | "passed" | "failed";
export type InstructorBadge = "top-rated" | "quick-responder" | "high-pass-rate" | "dvsa-approved" | "new-instructor";

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface WeeklyAvailability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface LessonPackage {
  id: string;
  name: string;
  hours: number;
  priceInPence: number;
  saving?: number;
  popular?: boolean;
}

export interface Instructor {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  location: {
    city: string;
    postcode: string;
    coverageRadius: number;
    coordinates: [number, number];
  };
  adiNumber: string;
  dvsaApproved: boolean;
  transmission: Transmission;
  pricePerHour: number;
  packages: LessonPackage[];
  rating: number;
  reviewCount: number;
  lessonsGiven: number;
  passRate: number;
  experience: number;
  bio: string;
  specialisms: string[];
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
  };
  languages: string[];
  availability: WeeklyAvailability;
  badges: InstructorBadge[];
  featured: boolean;
}

export interface Student {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  postcode: string;
  transmission: Transmission;
  theoryTestStatus: TestStatus;
  theoryTestScore?: number;
  practicalTestStatus: TestStatus;
  practicalTestDate?: string;
  lessonsCompleted: number;
  totalHours: number;
  currentInstructorId?: string;
  joinedAt: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  instructorId: string;
  studentId: string;
  lessonType: LessonType;
  transmission: Transmission;
  date: string;
  startTime: string;
  durationHours: number;
  priceInPence: number;
  status: BookingStatus;
  notes?: string;
  meetingPoint: string;
  createdAt: string;
}

export interface Review {
  id: string;
  instructorId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number;
  comment: string;
  lessonType: LessonType;
  createdAt: string;
  passed?: boolean;
}

export interface FilterState {
  location: string;
  /** Resolved lat/lng from postcodes.io — enables distance-based filtering */
  locationCoords?: [number, number];
  /** Search radius in miles when locationCoords is set (default 10) */
  locationRadiusMiles: number;
  transmission: Transmission | "all";
  minPrice: number;
  maxPrice: number;
  minRating: number;
  lessonTypes: LessonType[];
  dvsaOnly: boolean;
  sortBy: "rating" | "price-asc" | "price-desc" | "reviews";
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  avatar: string;
  quote: string;
  passed: boolean;
  rating: number;
  instructorName: string;
}

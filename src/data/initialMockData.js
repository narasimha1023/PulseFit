export const INITIAL_USER = {
  id: "PF-2400032664",
  name: "Narasimha Reddy",
  email: "narasimha@example.com",
  phone: "9876543210",
  memberId: "PF-2400032664",
  status: "ACTIVE",
  joinedDate: "15 Jan 2025",
  emergencyContact: "+91 98765 43211",
  fitnessGoals: "Hypertrophy & Functional Endurance",
  homeClub: "PulseFit Main Gym — Downtown",
  bloodGroup: "O+ Pos",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
};

export const PROJECT_METADATA = {
  code: "PS023",
  title: "Multi-Facility Fitness Membership & Attendance Tracking Platform",
  company: "PulseFit Health Clubs",
  tagline: "Smarter Membership. Seamless Access. Stronger You.",
  team: [
    { name: "T. Narasimha Reddy", roll: "2400032664", role: "Team Lead & Architecture" },
    { name: "V. Siddardha", roll: "2400030756", role: "Frontend & Microservices Design" },
    { name: "B. Mahesh Babu", roll: "2400031737", role: "State Management & UI Engineering" }
  ],
  version: "1.0.0-PROTOTYPE"
};

export const INITIAL_SUBSCRIPTION = {
  planId: "premium",
  planName: "PREMIUM PLAN",
  status: "ACTIVE",
  startDate: "15 Sep 2026",
  renewalDate: "15 Oct 2026",
  price: 2500,
  billingCycle: "monthly",
  currency: "₹",
  durationTotalDays: 30,
  daysElapsed: 6,
  paymentMethod: "UPI AutoPay (Axis Bank ****4821)",
  tier: "Premium"
};

export const INITIAL_RENEWAL_HISTORY = [
  { id: "RH-101", date: "15 Sep 2026", plan: "Premium", amount: "₹2,500", status: "Renewed", invoiceNo: "PF-INV-2026-09" },
  { id: "RH-102", date: "15 Aug 2026", plan: "Premium", amount: "₹2,500", status: "Renewed", invoiceNo: "PF-INV-2026-08" },
  { id: "RH-103", date: "15 Jul 2026", plan: "Premium", amount: "₹2,500", status: "Renewed", invoiceNo: "PF-INV-2026-07" },
  { id: "RH-104", date: "15 Jun 2026", plan: "Basic", amount: "₹1,500", status: "Renewed", invoiceNo: "PF-INV-2026-06" }
];

export const MEMBERSHIP_PLANS = [
  {
    id: "basic",
    name: "BASIC",
    price: "₹1,500",
    period: "/ month",
    numericPrice: 1500,
    cycle: "monthly",
    description: "Essential gym access for disciplined individual workouts.",
    popular: false,
    color: "from-slate-800 to-slate-900",
    accentColor: "border-slate-700",
    features: [
      "Gym Access (Main Floor)",
      "Cardio Zone Access",
      "Locker & Shower Access",
      "Basic Mobile App Support",
      "Standard Off-peak Hours"
    ],
    buttonText: "Choose Plan"
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "₹2,500",
    period: "/ month",
    numericPrice: 2500,
    cycle: "monthly",
    description: "Full multi-facility pass with studio classes and recovery amenities.",
    popular: true,
    color: "from-pulse-card to-slate-900",
    accentColor: "border-pulse-lime shadow-glow-lime",
    features: [
      "All Basic Features Included",
      "Heated Swimming Pool",
      "Yoga & Meditation Studio",
      "Unlimited Group Fitness Classes",
      "Priority Concierge Support",
      "Multi-Club Guest Pass (2x/mo)"
    ],
    buttonText: "Choose Plan"
  },
  {
    id: "annual",
    name: "ANNUAL",
    price: "₹12,000",
    period: "/ year",
    numericPrice: 12000,
    cycle: "annual",
    description: "The ultimate fitness commitment with personal coaching perks.",
    popular: false,
    color: "from-slate-900 via-pulse-surface to-slate-900",
    accentColor: "border-pulse-cyan shadow-glow-cyan",
    features: [
      "Full Multi-Facility Access 24/7",
      "Dedicated Personal Training (4 Sessions)",
      "All Group Classes & Workshops",
      "Priority Support & Nutritionist Consult",
      "Annual Health Check & Biometric Scan",
      "Free PulseFit Athletic Merchandise Kit"
    ],
    buttonText: "Choose Plan"
  }
];

export const INITIAL_ATTENDANCE_STATS = {
  totalVisits: 24,
  thisMonth: 8,
  thisWeek: 3,
  favoriteFacility: "Main Gym"
};

export const INITIAL_ATTENDANCE_HISTORY = [
  {
    id: "att-1",
    date: "20 Sep 2026",
    facility: "Main Gym",
    checkIn: "07:30 AM",
    checkOut: "09:00 AM",
    duration: "1h 30m",
    status: "Completed",
    badgeColor: "emerald"
  },
  {
    id: "att-2",
    date: "18 Sep 2026",
    facility: "City Center",
    checkIn: "06:45 PM",
    checkOut: "08:15 PM",
    duration: "1h 30m",
    status: "Completed",
    badgeColor: "emerald"
  },
  {
    id: "att-3",
    date: "16 Sep 2026",
    facility: "Main Gym",
    checkIn: "07:15 AM",
    checkOut: "08:45 AM",
    duration: "1h 30m",
    status: "Completed",
    badgeColor: "emerald"
  },
  {
    id: "att-4",
    date: "14 Sep 2026",
    facility: "Swimming Pool",
    checkIn: "06:00 PM",
    checkOut: "07:00 PM",
    duration: "1h 00m",
    status: "Completed",
    badgeColor: "emerald"
  },
  {
    id: "att-5",
    date: "12 Sep 2026",
    facility: "Yoga Studio",
    checkIn: "07:00 AM",
    checkOut: "08:00 AM",
    duration: "1h 00m",
    status: "Completed",
    badgeColor: "emerald"
  },
  {
    id: "att-6",
    date: "10 Sep 2026",
    facility: "Cardio Zone",
    checkIn: "06:30 PM",
    checkOut: "07:30 PM",
    duration: "1h 00m",
    status: "Completed",
    badgeColor: "emerald"
  },
  {
    id: "att-7",
    date: "08 Sep 2026",
    facility: "Main Gym",
    checkIn: "07:45 AM",
    checkOut: "09:15 AM",
    duration: "1h 30m",
    status: "Completed",
    badgeColor: "emerald"
  }
];

export const WEEKLY_ATTENDANCE_DATA = [
  { day: "Mon", fullDay: "Monday", visits: 1, duration: 90 },
  { day: "Tue", fullDay: "Tuesday", visits: 0, duration: 0 },
  { day: "Wed", fullDay: "Wednesday", visits: 1, duration: 90 },
  { day: "Thu", fullDay: "Thursday", visits: 1, duration: 75 },
  { day: "Fri", fullDay: "Friday", visits: 0, duration: 0 },
  { day: "Sat", fullDay: "Saturday", visits: 1, duration: 90 },
  { day: "Sun", fullDay: "Sunday", visits: 0, duration: 0 }
];

export const MONTHLY_ATTENDANCE_DATA = [
  { week: "Week 1", visits: 3 },
  { week: "Week 2", visits: 2 },
  { week: "Week 3", visits: 3 },
  { week: "Week 4", visits: 0 }
];

export const FACILITIES = [
  {
    id: "fac-1",
    name: "Main Gym",
    tagline: "State-of-the-art strength floor",
    description: "Modern strength and workout equipment including Olympic barbells, power racks, dumbbell sets up to 50kg, and pin-loaded selectorized machines.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    status: "Open",
    hours: "05:30 AM — 11:00 PM",
    location: "Level 1 & 2, Club Central",
    capacityPct: 68,
    features: ["Hammer Strength Rigs", "Eleiko Olympic Plates", "Dumbbells up to 50kg", "Air Purification Filtered"],
    trainerInCharge: "Marcus Vance, CSCS"
  },
  {
    id: "fac-2",
    name: "Cardio Zone",
    tagline: "High-octane aerobic training",
    description: "Treadmills, cycles, assault bikes, stairmasters, and cross trainers equipped with interactive smart consoles and Bluetooth heart-rate sync.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80",
    status: "Open",
    hours: "05:30 AM — 11:00 PM",
    location: "Level 2, North Wing",
    capacityPct: 42,
    features: ["LifeFitness Discover SE3 HD", "Concept2 Rowers", "Technogym Skillmills", "Panoramic City Skyline View"],
    trainerInCharge: "Elena Gomez"
  },
  {
    id: "fac-3",
    name: "Swimming Pool",
    tagline: "Climate-controlled lap pool",
    description: "Indoor swimming facility featuring 25-meter heated competition lanes, advanced UV filtration water treatment, and poolside recovery loungers.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop&q=80",
    status: "Open",
    hours: "06:00 AM — 09:30 PM",
    location: "Aquatics Center, Ground Level",
    capacityPct: 35,
    features: ["6 Heated 25m Lap Lanes", "UV & Ozone Water Purified", "Anti-slip Decking", "Aqua Aerobics Classes"],
    trainerInCharge: "David Zhang (Ex-National Swimmer)"
  },
  {
    id: "fac-4",
    name: "Yoga Studio",
    tagline: "Mindfulness, flexibility & breathwork",
    description: "Dedicated yoga and wellness space with bamboo flooring, warm diffused lighting, acoustic sound damping, and aromatherapy ventilation.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80",
    status: "Open",
    hours: "06:00 AM — 08:30 PM",
    location: "Level 3, Zen Pavilion",
    capacityPct: 58,
    features: ["Manduka Pro Mats", "Bolsters & Cork Blocks", "Tibetan Singing Bowl Therapy", "Aerial Hammock Rigs"],
    trainerInCharge: "Priya Sharma (RYT-500)"
  },
  {
    id: "fac-5",
    name: "Functional Training",
    tagline: "Athletic performance & agility",
    description: "Modern functional fitness area equipped with 30m AstroTurf sled tracks, battle ropes, plyometric boxes, kettlebells, and TRX suspension systems.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    status: "Open",
    hours: "06:00 AM — 10:00 PM",
    location: "Level 1, South Arena",
    capacityPct: 76,
    features: ["30m Prowler Sprint Track", "Gymnastic Wooden Rings", "Rogue Echo Bikes", "Medicine Balls & Slam Balls"],
    trainerInCharge: "Vikram Malhotra"
  },
  {
    id: "fac-6",
    name: "Personal Training",
    tagline: "Bespoke 1-on-1 coaching & biomechanics",
    description: "Professional trainer support with custom exercise programming, 3D InBody body composition scanning, and dedicated private coaching suites.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80",
    status: "Open",
    hours: "06:00 AM — 10:00 PM",
    location: "Level 2, High Performance Lab",
    capacityPct: 82,
    features: ["InBody 770 Body Scanner", "Motion-Capture Biomechanics", "Bespoke Macro & Meal Plans", "Dedicated VIP Pods"],
    trainerInCharge: "Coach Robert Sterling"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Membership Notice",
    message: "Your membership expires in 24 days on 15 Oct 2026.",
    time: "2 hours ago",
    read: false,
    type: "warning"
  },
  {
    id: "notif-2",
    title: "Check-in Confirmed",
    message: "Check-in successful at Main Gym. Have a great workout!",
    time: "Yesterday, 07:30 AM",
    read: false,
    type: "success"
  },
  {
    id: "notif-3",
    title: "Payment Processed",
    message: "Premium plan renewed successfully for ₹2,500.",
    time: "15 Sep 2026",
    read: true,
    type: "info"
  },
  {
    id: "notif-4",
    title: "Club Announcement",
    message: "New facility available at City Center: Functional Turf area expanded.",
    time: "3 days ago",
    read: true,
    type: "facility"
  }
];

export const INITIAL_RECENT_ACTIVITY = [
  {
    id: "act-1",
    type: "checkin",
    title: "Gym Check-in",
    description: "Checked in at Main Gym Downtown",
    time: "Today, 07:30 AM",
    badge: "Check-in"
  },
  {
    id: "act-2",
    type: "renewal",
    title: "Membership renewed",
    description: "Premium plan auto-renewed for 30 days",
    time: "15 Sep 2026",
    badge: "Billing"
  },
  {
    id: "act-3",
    type: "visit",
    title: "Main Gym visit",
    description: "Completed 90m Upper Body Strength session",
    time: "18 Sep 2026",
    badge: "Workout"
  },
  {
    id: "act-4",
    type: "plan",
    title: "Premium plan activated",
    description: "Multi-facility access unlocked across all clubs",
    time: "15 Sep 2026",
    badge: "Membership"
  }
];

export const ADMIN_STATS = {
  totalMembers: 1248,
  activeMemberships: 1082,
  todayCheckins: 327,
  expiringThisWeek: 46
};

export const FACILITY_USAGE_ANALYTICS = [
  { name: "Main Gym", checkins: 410, capacity: 500, utilization: 82 },
  { name: "City Center", checkins: 285, capacity: 350, utilization: 81 },
  { name: "Downtown Club", checkins: 195, capacity: 250, utilization: 78 },
  { name: "Elite Fitness", checkins: 155, capacity: 200, utilization: 77 }
];

export const ADMIN_MEMBERS = [
  {
    id: "PF-2400032664",
    name: "Narasimha Reddy",
    plan: "Premium",
    status: "Active",
    statusType: "active",
    joinedDate: "15 Jan 2025",
    renewalDate: "15 Oct 2026",
    email: "narasimha@example.com"
  },
  {
    id: "PF-2400030756",
    name: "V. Siddardha",
    plan: "Annual",
    status: "Active",
    statusType: "active",
    joinedDate: "03 Feb 2025",
    renewalDate: "03 Feb 2027",
    email: "siddardha@example.com"
  },
  {
    id: "PF-2400031737",
    name: "B. Mahesh Babu",
    plan: "Premium",
    status: "Active",
    statusType: "active",
    joinedDate: "10 Mar 2025",
    renewalDate: "10 Oct 2026",
    email: "mahesh@example.com"
  },
  {
    id: "PF-2400018921",
    name: "Aanya Sen",
    plan: "Basic",
    status: "Expiring Soon",
    statusType: "expiring",
    joinedDate: "22 Aug 2025",
    renewalDate: "24 Sep 2026",
    email: "aanya.sen@example.com"
  },
  {
    id: "PF-2400019442",
    name: "Rohan Kapoor",
    plan: "Premium",
    status: "Expiring Soon",
    statusType: "expiring",
    joinedDate: "25 Jul 2025",
    renewalDate: "26 Sep 2026",
    email: "rohan.k@example.com"
  },
  {
    id: "PF-2400015523",
    name: "Sneha Nair",
    plan: "Basic",
    status: "Expired",
    statusType: "expired",
    joinedDate: "11 Jun 2025",
    renewalDate: "15 Sep 2026",
    email: "sneha.n@example.com"
  },
  {
    id: "PF-2400021990",
    name: "Kabir Mehta",
    plan: "Annual",
    status: "Active",
    statusType: "active",
    joinedDate: "01 May 2025",
    renewalDate: "01 May 2027",
    email: "kabir.mehta@example.com"
  }
];

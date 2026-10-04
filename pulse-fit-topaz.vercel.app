# PulseFit Health Clubs (PS023)
> **Multi-Facility Fitness Membership & Attendance Tracking Platform**

A commercial-grade, modern, and responsive frontend web application prototype engineered with **React 19**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and **Recharts**.

---

## 👥 Academic Project & Team Attribution
- **Project ID**: `PS023 — Multi-Facility Fitness Membership & Attendance Tracking Platform`
- **Organization**: PulseFit Health Clubs
- **Development Team**:
  1. **T. Narasimha Reddy** — Roll No: `2400032664` (Team Lead & Architecture)
  2. **V. Siddardha** — Roll No: `2400030756` (Frontend & Microservices Design)
  3. **B. Mahesh Babu** — Roll No: `2400031737` (State Management & UI Engineering)

---

## 🚀 Key Features & Highlights

### 1. 🔐 Authentication & Session
- Split-screen layout with high-resolution gym hero visual.
- Supports regular credentials login and **"Continue as Demo User"** (instant sign-in for Narasimha Reddy).
- Forgot Password dialog and session persistence via `localStorage`.

### 2. ⚡ Main Dashboard (`/dashboard`)
- Personalized welcome: *"Welcome back, Narasimha 👋"*.
- **4 Key Statistic Cards**:
  - Membership Status: `ACTIVE`
  - Current Plan: `Premium`
  - Attendance: `24 Visits` (+3 this week)
  - Next Renewal: `15 Oct 2026`
- **Quick Action Bar**: Check In, View Membership, Renew Plan, View Attendance.
- **Weekly Attendance Chart**: Recharts bar chart showing Mon–Sun workout distribution.
- **Live Activity Feed**: Turnstile check-ins, plan activations, and renewal events.

### 3. 💳 Membership Plans (`/membership`)
- Modern pricing tiers:
  - **BASIC**: ₹1,500 / month (Gym floor, cardio deck, locker)
  - **PREMIUM (POPULAR)**: ₹2,500 / month (Swimming pool, yoga studio, group classes, priority support)
  - **ANNUAL**: ₹12,000 / year (Personal training sessions, biometric health checks, full club access)
- Interactive **"Choose Plan"** modal with instant activation and reactive state updates across the entire app.

### 4. ⏱ Attendance Tracking (`/attendance`)
- Attendance KPI overview: Total Visits, This Month, This Week, Favorite Facility.
- **Prominent "CHECK IN" Button**:
  - Turnstile & NFC simulator with live timestamp generation.
  - Prepend new records to the attendance history table.
  - Updates counters and fires celebratory toast notifications.
- Searchable & filterable table by facility and date.

### 5. 🏋️ Facilities Explorer (`/facilities`)
- 6 High-resolution facility cards:
  - **Main Gym**: Strength rigs, Olympic barbells, free weights up to 50kg.
  - **Cardio Zone**: Treadmills, assault bikes, Technogym skillmills.
  - **Swimming Pool**: 25m heated Olympic-spec lap pool with UV filtration.
  - **Yoga Studio**: Bamboo flooring, sound damping, and aromatherapy.
  - **Functional Training**: 30m AstroTurf sled track, battle ropes, TRX.
  - **Personal Training**: 1-on-1 private coaching suite & InBody body scanner.
- Live Open/Closed badges, operating hours, and interactive details dialogs.

### 6. 💎 Subscription Management (`/subscription`)
- Holographic VIP card displaying tier, status, start date, and next renewal date.
- Dynamic membership duration progress bar.
- **Renew Membership** modal with simulated transaction processing.
- **Renewal History** log table with downloadable tax receipt simulators.

### 7. 👤 Profile & Digital Club Pass (`/profile`)
- Member credentials: Name, Email, Phone, Turnstile Member ID (`PF-2400032664`), Status (`ACTIVE`).
- **Edit Profile mode**: Edit and save changes with localStorage persistence.
- Turnstile QR code pass for turnstile access scanning.

### 8. 🛡 Executive Admin Dashboard (`/admin`)
- Administrative KPIs: Total Members (1,248), Active Memberships (1,082), Today's Check-ins (327), Expiring Subscriptions (46).
- **Facility Usage Analytics**: Recharts comparative chart for Main Gym, City Center, Downtown Club, and Elite Fitness.
- **Recent Members Table**: Member roster with plan and status badges.
- **Expiring Subscriptions Watchlist**: Color-coded badges (`Green = Active`, `Yellow = Expiring Soon`, `Red = Expired`) and reminder dispatcher.

---

## 🌐 Spring Boot Microservices Architecture (Completed)

The complete backend is implemented across **6 dedicated Spring Boot 3.x microservices** located in [`./backend/`](./backend/):

```
Client (React 19 + Vite SPA)
    ↓ REST API / JSON (JWT Bearer Auth)
Spring Cloud API Gateway (Port 8080)
    ↓ Spring Cloud Netflix Eureka Discovery (Port 8761)
├── pulsefit-auth-service         (Port 8084, MySQL: pulsefit_auth_db)
├── pulsefit-member-service       (Port 8081, MySQL: pulsefit_member_db)
├── pulsefit-subscription-service (Port 8082, MySQL: pulsefit_subscription_db)
└── pulsefit-attendance-service   (Port 8083, MySQL: pulsefit_attendance_db)
```

Detailed backend instructions, STS4 import guide, and database setup are documented in [`backend/README.md`](./backend/README.md).

---

## 🛠 Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS 3.4 + Custom Glassmorphism Theme
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context (`AuthContext`, `FitnessContext`, `ToastContext`) + LocalStorage

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
"# PulseFit" 

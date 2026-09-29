# PulseFit Health Clubs — Microservices Backend (PS023)

## 🏢 Project Information
- **Project ID**: `PS023`
- **Project Title**: Multi-Facility Fitness Membership & Attendance Tracking Platform
- **Organization**: PulseFit Health Clubs
- **Team**:
  1. **T. Narasimha Reddy** — `2400032664`
  2. **V. Siddardha** — `2400030756`
  3. **B. Mahesh Babu** — `2400031737`

---

## 🏗 Microservices Architecture

The backend consists of **6 independently runnable Maven Spring Boot 3.x microservices**:

```
                              ┌─────────────────────────┐
                              │  Frontend (React Vite)  │
                              │  http://localhost:5173  │
                              └────────────┬────────────┘
                                           │ HTTP / JSON (JWT)
                                           ▼
                              ┌─────────────────────────┐
                              │ pulsefit-api-gateway    │
                              │ Port: 8080              │
                              └──────┬─────┬─────┬──────┘
                                     │     │     │
         ┌───────────────────────────┼─────┼─────┼───────────────────────────┐
         │                           │     │     │                           │
         ▼                           ▼     ▼     ▼                           ▼
┌──────────────────┐        ┌──────────────┐  ┌────────────────┐   ┌────────────────┐
│ pulsefit-auth    │        │pulsefit-     │  │pulsefit-       │   │pulsefit-       │
│ -service         │        │member-service│  │subscription-   │   │attendance-     │
│ Port: 8084       │        │Port: 8081    │  │service         │   │service         │
│ (JWT Auth, RBAC) │        │(CRUD Members)│  │Port: 8082      │   │Port: 8083      │
└────────┬─────────┘        └──────┬───────┘  └──────┬─────────┘   └──────┬─────────┘
         │                         │                 │ (Feign)            │ (Feign)
         │                         └─────────────────┴────────────────────┘
         │                                  ▲
         │                                  │ Eureka Discovery
         │                        ┌─────────┴───────────────┐
         └───────────────────────►│ pulsefit-eureka-server  │
                                  │ Port: 8761              │
                                  └─────────────────────────┘
```

---

## 🗄 Databases (MySQL 8)

Each microservice maintains its own dedicated database:

| Service | Port | Database Name | Description |
| :--- | :---: | :--- | :--- |
| `pulsefit-auth-service` | `8084` | `pulsefit_auth_db` | User credentials, roles, passwords |
| `pulsefit-member-service` | `8081` | `pulsefit_member_db` | Member master profiles |
| `pulsefit-subscription-service` | `8082` | `pulsefit_subscription_db` | Plans, active subscriptions, renewals |
| `pulsefit-attendance-service` | `8083` | `pulsefit_attendance_db` | Turnstile check-ins, check-outs |
| `pulsefit-eureka-server` | `8761` | *None (In-Memory)* | Service discovery registry |
| `pulsefit-api-gateway` | `8080` | *None (Reactive)* | Routing, token validation, CORS |

MySQL credentials configured in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/<database_name>?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

---

## 🚀 Startup Order

Always start the services in this order:

1. **`pulsefit-eureka-server`** (Port: `8761`) — Discovery server must be available first.
2. **`pulsefit-auth-service`** (Port: `8084`) — Provides authentication & JWT validation.
3. **`pulsefit-member-service`** (Port: `8081`) — Member profile provider.
4. **`pulsefit-subscription-service`** (Port: `8082`) — Subscriptions and plan management.
5. **`pulsefit-attendance-service`** (Port: `8083`) — Turnstile attendance tracking.
6. **`pulsefit-api-gateway`** (Port: `8080`) — Central gateway route handler.

---

## 🖥 Spring Tool Suite 4 (STS4) Import Guide

1. Open **Spring Tool Suite 4 (STS4)**.
2. Select **File > Import... > Maven > Existing Maven Projects**.
3. Set **Root Directory** to:
   ```
   c:\Users\hp\OneDrive\Desktop\SOAPROJECT\backend
   ```
4. Check all 6 detected `pom.xml` files:
   - `pulsefit-eureka-server/pom.xml`
   - `pulsefit-api-gateway/pom.xml`
   - `pulsefit-auth-service/pom.xml`
   - `pulsefit-member-service/pom.xml`
   - `pulsefit-subscription-service/pom.xml`
   - `pulsefit-attendance-service/pom.xml`
5. Click **Finish**. STS4 will resolve all dependencies.
6. In **Boot Dashboard** or **Project Explorer**, right click each application in the startup order and choose **Run As > Spring Boot App**.

---

## 🧪 Running Automated Tests

Run unit and integration tests across each service via Maven:

```powershell
cd pulsefit-eureka-server; mvn test; cd ..
cd pulsefit-auth-service; mvn test; cd ..
cd pulsefit-member-service; mvn test; cd ..
cd pulsefit-subscription-service; mvn test; cd ..
cd pulsefit-attendance-service; mvn test; cd ..
cd pulsefit-api-gateway; mvn test; cd ..
```

---

## 📡 API Endpoints Matrix (via Gateway: `http://localhost:8080`)

### 1. Authentication Service (`/auth/**`)
- `POST /auth/register` — Register new user (Body: `{username, email, password, role}`)
- `POST /auth/login` — Login user (Body: `{username, password}`) -> returns `{token, type, username, role}`
- `GET /auth/validate` — Validate JWT token (Query param or Header)

### 2. Member Service (`/members/**`)
- `POST /members` — Create member profile
- `GET /members` — List all members
- `GET /members/{id}` — Get member by ID
- `GET /members/email/{email}` — Get member by email
- `PUT /members/{id}` — Update member profile
- `DELETE /members/{id}` — Deactivate/delete member

### 3. Subscription Service (`/subscriptions/**` & `/plans/**`)
- `POST /plans` — Create new membership plan
- `GET /plans` — List all available plans
- `GET /plans/{id}` — Get plan by ID
- `POST /subscriptions` — Purchase / subscribe to a plan (Validates member via OpenFeign)
- `GET /subscriptions` — List all subscriptions
- `GET /subscriptions/{id}` — Get subscription by ID
- `GET /subscriptions/member/{memberId}` — Get subscriptions for a specific member
- `PUT /subscriptions/{id}/renew` — Renew existing subscription

### 4. Attendance Service (`/attendance/**`)
- `POST /attendance/checkin` — Check in member to facility (Validates member via OpenFeign)
- `POST /attendance/checkout/{id}` — Check out of facility
- `GET /attendance/member/{memberId}` — Get member's visit history
- `GET /attendance/facility/{facilityId}` — Get facility visit history
- `GET /attendance/active` — View currently active check-ins in club

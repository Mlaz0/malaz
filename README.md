# Malaz | Mental Health Booking Platform

## Project Description

**Malaz** is a web-based platform for booking psychiatrists and mental health consultants **exclusively online**. It provides a seamless experience for both patients and doctors to connect, schedule appointments, and interact through educational and community features. The platform also includes intelligent AI analysis tools to assist doctors.

---

## Technologies Used

- **React** – Frontend library for building UI.
- **Tailwind CSS** – Utility-first CSS framework.
- **TanStack Query** – Data fetching and caching.
- **Axios** – HTTP client for API calls.
- **shadcn/ui** – Pre-built UI components based on Tailwind.
- **Stripe** – Payment gateway for online transactions.
- **OpenAI / AI Assistant** – AI-powered analysis to assist doctors.

---

## Features

- 🔐 **Authentication**:

  - Login/Register for both doctors and patients.

- 📄 **Blogs**:

  - Doctors can write and publish mental health articles.

- 🗣️ **Community Section**:

  - Patients can share their issues anonymously.
  - Doctors can comment and offer advice.

- 📅 **Appointment Booking**:

  - Patients can book sessions with doctors.
  - Online payment integration using **Stripe**.

- ⏰ **Doctor Availability Management**:

  - Doctors can set and manage available time slots.

- 🧑‍⚕️ **Doctor Dashboard**:

  - Manage appointments, view patient details, write blogs, and access AI-powered patient analysis.

- 🛠️ **Admin Dashboard**:

  - Manage doctor and patient accounts.
  - Approve/reject doctor registrations.
  - Monitor overall platform activity.

- 🤖 **AI Assistant**:
  - Doctors can upload patient data and receive intelligent analysis to support diagnosis.

---

## Getting Started

### Requirements:

- Node.js (v16 or higher)
- npm

### Installation & Running Locally:

1. Install dependencies:
   ```bash
   npm install
   ```

---

# Project Structure

```bash
src/
├── assets/
│   ├── images/        # All image files
│   ├── fonts/         # Font files
│   ├── styles/        # Global style files
│   └── icons/         # SVG icons
│
├── components/
│   ├── ui/            # Common UI components (buttons, inputs, etc.)
│   ├── shared/        # Shared components across multiple pages
│   ├── auth/          # Authentication-related components
│   ├── dashboard/     # Dashboard components
│   └── layout/        # Page layout components
│
├── config/
│   ├── app.config.js  # General app configurations
│   ├── api.config.js  # API endpoints
│   └── theme.config.js # Theme settings
│
├── context/
│   ├── AuthContext.js  # Authentication context
│   ├── UserContext.js  # User data context
│   └── AppContext.js   # General app context
│
├── hooks/
│   ├── useAuth.js      # Authentication hook
│   ├── useApi.js       # API calls hook
│   └── useForm.js      # Form management hook
│
├── layouts/
│   ├── MainLayout.js       # Main layout
│   ├── AuthLayout.js       # Authentication pages layout
│   └── DashboardLayout.js  # Dashboard layout
│
├── lib/
│   ├── auth.js        # Authentication functions
│   ├── helpers.js     # Helper functions
│   └── validators.js  # Validation functions
│
├── pages/
│   ├── public/        # Public pages
│   │   ├── Home/      # Home page
│   │   ├── Blog/      # Blog
│   │   └── Community/ # Community
│   │
│   ├── auth/          # Authentication pages
│   │   ├── Login/     # Login
│   │   ├── Register/  # Patient registration
│   │   └── DoctorRegister/ # Doctor registration
│   │
│   └── app/           # Main application pages
│       ├── Dashboard/ # Dashboard
│       ├── Booking/   # Booking
│       └── Reports/   # Reports
│
├── protected/
│   ├── PatientRoutes.js # Protected patient routes
│   ├── DoctorRoutes.js  # Protected doctor routes
│   └── AdminRoutes.js   # Protected admin routes
│
├── providers/
│   ├── AuthProvider.js  # Auth provider
│   ├── AppProvider.js   # App provider
│   └── ThemeProvider.js # Theme provider
│
├── routes/
│   ├── index.js        # Main application routes
│   ├── public.routes.js # Public routes
│   └── private.routes.js # Private routes
│
├── services/
│   ├── auth.service.js    # Authentication services
│   ├── user.service.js    # User services
│   ├── booking.service.js # Booking services
│   └── api.js             # Axios base configuration
│
└── utils/
    ├── constants.js      # General constants
    ├── storage.js        # Local storage functions
    └── notifications.js  # Notifications management
 ```
## Screenshots

### 🔐 Login Page

![Login Page](https://drive.google.com/uc?export=view&id=1iv_kScvrS7tQb3uyXzfJeVDvzXWIdWXe)

### 📝 Register patient Page
![Register Page](https://drive.google.com/uc?export=view&id=1yuCOnHXUTMdlUU6FwUykdFl1jlILKZnV)

### 📝 Register Doctor Page
![Register Page](https://drive.google.com/uc?export=view&id=1jw5DQLkzTIFv47_8RHAGN81NRErh-jux)

### 🏠 Home Page
![Home Page](https://drive.google.com/uc?export=view&id=1A3YUqF8WnrqyiAE_qdrPfypSstS6-6mG)

### 🏠 Blog Page
![Blog Page](https://drive.google.com/uc?export=view&id=1CqjNFRMqOR1UhbK1NmajZKT-J2wnwmmN)

### 🗣️ Community Page
![Community Page](https://drive.google.com/uc?export=view&id=1hr4Sc-VZ8mOTHzvjNZJVDRV7cKxxm0Ll)

### 👨‍⚕️ Doctor Dashboard
![Doctor Dashboard](https://drive.google.com/uc?export=view&id=1XG2wtS6kcQ_UinbHTLR8pyGNVUbZpQWB)

### 🛠️ Admin Dashboard
![Admin Dashboard](https://drive.google.com/uc?export=view&id=1_c-jwAHTh0qCIgLLcMuwskheZUjmC5Wq)

### 📅 Booking Page
![Booking Page](https://drive.google.com/uc?export=view&id=1tTEY2H2LbCiD0HMtNaaCAS56mwfeb0Tn)

### 📅 Reports Page
![Reports Page](https://drive.google.com/uc?export=view&id=1Sh-C8M7e69azRVAvGRKVRns-LvQjdLeA)
---

## Live Demo

Check out the live version of the project here:  
👉 [Visit Malaz Live](https://malaz-iti.vercel.app/)

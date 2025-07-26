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

---
## Project Structure
  src/
├── assets/           # Images and static files
├── components/       # Reusable UI components
├── config/           # Global configuration (e.g., API URLs)
├── context/          # React Context for app state (e.g., auth)
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts and wrappers
├── lib/              # Utility functions and helpers
├── pages/            # Main page components and routes
├── protected/        # Protected pages (login required)
├── providers/        # Context providers and wrappers
├── routes/           # Route configuration and helpers
├── services/         # API interaction logic (Axios)
└── utils/            # General utility functions


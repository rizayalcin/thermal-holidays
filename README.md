# Thermal Holidays - Luxury Thermal Spa Resort Platform

A full-stack luxury thermal spa resort booking platform built with Next.js and .NET Core.

## 🌟 Features

- **Modern Next.js Frontend**: Server-side rendering, App Router, Tailwind CSS v4
- **Luxury Design**: Premium UI/UX inspired by high-end wellness resorts
- **Hotel Booking System**: Browse destinations, view hotels, book stays
- **Experience Catalog**: Curated wellness experiences and spa treatments
- **Shop Integration**: Wellness products and retreat packages
- **Admin Panel**: Comprehensive management dashboard
- **.NET Core Backend**: RESTful API with PostgreSQL database

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Framer Motion
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query

### Backend
- **Framework**: .NET 8.0
- **Database**: PostgreSQL
- **ORM**: Dapper
- **API**: RESTful with Swagger/OpenAPI

## 📦 Project Structure

```
THERMALHOLIDAYS/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/      # Next.js App Router pages
│   │   ├── components/
│   │   ├── data/     # Static data and types
│   │   └── lib/      # Utilities
│   └── public/       # Static assets
├── backend/          # .NET Core API
│   ├── ThermalHolidays.Api/
│   ├── ThermalHolidays.Core/
│   └── sql/          # Database scripts
└── docs/             # Documentation
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- .NET 8.0 SDK
- PostgreSQL 14+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

### Backend Setup
```bash
cd backend/ThermalHolidays.Api
dotnet restore
dotnet run
```

Backend API runs on: http://localhost:5000

### Database Setup
1. Create PostgreSQL database
2. Update connection string in `appsettings.json`
3. Run migration scripts from `backend/sql/`

## 🌐 Deployment

### Vercel (Frontend)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Deploy automatically on push to main

See [Vercel Deployment Guide](docs/vercel_deployment_guide.md) for details.

### Backend Hosting
Recommended platforms:
- Railway
- Render
- Azure App Service

## 📄 License

Private project - All rights reserved

## 👥 Author

Thermal Holidays Development Team

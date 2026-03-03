# APS Security Dashboard

This is a frontend version of a B2B SaaS security scanning platform created for a technical screening task.

## Live Demo
https://aps-dashboard-seven.vercel.app/

## Tech Stack
- React 18
- Vite
- Tailwind CSS v3
- React Router DOM v6
- Lucide React

## Screens
- **Login** - Split layout sign-up page with social login options
- **Dashboard** - Scan list with severity counters and search
- **Scan Detail** - Live console with activity log and finding log

## Features
- Dark and light mode toggle
- Search and filter scans
- Navigate between all three screens
- Mock data for all screens
- Responsive layout
- Toast notifications for button actions

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
git clone https://github.com/HEY-Iam-SIBASANKAR/aps-dashboard
cd aps-dashboard  
npm install  
npm run dev  

Open http://localhost:5173 in your browser.

## Project Structure
src/  
├── components/   # Sidebar, SeverityBadge, StatusChip  
├── context/      # ThemeContext (dark/light mode)  
├── data/         # mockData.js  
├── pages/        # Login, Dashboard, ScanDetail  

## Known Limitations
- No real backend connection
- All data is hardcoded mock data
- Authentication is not real
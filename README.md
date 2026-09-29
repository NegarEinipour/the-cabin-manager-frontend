#The Cabin Manager
A full-stack cabin booking management system with role-based access, real-time updates and a responsive UI.

Live demo: https://the-cabin-manager-frontend.pages.dev

Demo credentials: 
 -Email: `receptionist@example.com`
 -Password: `respass123`

Note: The backend runs on Render's free tier and may take 30-60 seconds to wake after inactivity. Use a VPN if the login fails.

## Features 
1. JWT authentication with three roles (admin, manager, receptionist) 
2. Bookings: filter, sort, pagination, check-in, check-out, delete
3. Cabins: full CRUD with image uploads and cascade delete
4. Dashboard: live stats, stay duration on chart, sales chart
5. Real time updates across tabs via Socket.IO
6. Dark mode
7. Responsive design for mobile and desktop

## Teck Stack
Frontend: React, React Router, TanStack Query, Styled-components, react-hook-form, Recharts, Socket.IO Client
Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Supabase Storage, Socket.IO
Deployment: Cloudflare Pages for the frontend, Render for the backend, MongoDB Atlas for the database 

the backend repository: https://github.com/NegareEinipour/the-cabin-manager-backend

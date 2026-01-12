# How to Start the Admin System

## Quick Start Guide

### 1. Start the Backend API Server

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API will run on `http://localhost:5000`

### 2. Start the Frontend Server

In a new terminal:

```bash
# Option 1: Use Python server
python server.py

# Option 2: Use Node.js server
npm start

# Option 3: Use any static file server
# The frontend will be available at http://localhost:8000
```

### 3. Access the Admin Panel

1. **Admin Login**: `http://localhost:5000/admin/login.html`
   - Username: `admin`
   - Password: `admin123`

2. **Main Portfolio**: `http://localhost:8000/index.html`
   - Will automatically load data from API

## Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Change the default password after first login!**

## Features

### Admin Panel
- ✅ Login system with JWT authentication
- ✅ Dashboard with statistics
- ✅ CRUD operations for Projects
- ✅ CRUD operations for Websites
- ✅ CRUD operations for Snippets
- ✅ Real-time data updates

### Frontend
- ✅ Dynamically loads cards from API
- ✅ Falls back to static content if API unavailable
- ✅ Maintains all existing functionality

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

Same for `/api/websites` and `/api/snippets`

## Troubleshooting

### API not connecting?
- Make sure backend server is running on port 5000
- Check CORS settings in `backend/config.py`
- Frontend will fallback to static content if API unavailable

### Can't login?
- Default credentials: admin / admin123
- Check browser console for errors
- Verify backend server is running

### Cards not loading?
- Check browser console for API errors
- Verify API server is running
- Check network tab for failed requests

## Next Steps

1. Change default admin password
2. Add more admin users if needed
3. Customize admin panel styling
4. Add file upload for thumbnails
5. Deploy to production server

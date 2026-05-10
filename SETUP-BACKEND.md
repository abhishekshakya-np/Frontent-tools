# Backend Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server
```bash
python app.py
```

The API will start on `http://localhost:5000`

### 3. Test the API
```bash
# Health check
curl http://localhost:5000/api/health

# Login (get token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Default Credentials
- Username: `admin`
- Password: `admin123`

## Next Steps

1. ✅ Backend API is ready
2. ⏳ Create admin panel (login, dashboard, CRUD forms)
3. ⏳ Extract current data from index.html to JSON
4. ⏳ Modify frontend to fetch from API

## File Structure Created

```
backend/
├── app.py              # Main Flask application
├── config.py           # Configuration
├── auth.py             # Authentication utilities
├── requirements.txt    # Python dependencies
├── routes/
│   ├── projects.py     # Projects CRUD
│   ├── websites.py     # Websites CRUD
│   └── snippets.py     # Snippets CRUD
└── database/
    ├── projects.json   # Projects data (empty initially)
    ├── websites.json   # Websites data (empty initially)
    ├── snippets.json   # Snippets data (empty initially)
    └── users.json      # Users (created on first run)
```

## API Usage Examples

### Get All Projects (Public)
```javascript
fetch('http://localhost:5000/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Create Project (Requires Auth)
```javascript
const token = 'your-jwt-token';

fetch('http://localhost:5000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Project',
    description: 'Project description',
    url: 'showcase/projects/my-project/index.html',
    category: 'web-development',
    badge: 'Featured',
    icon: 'fas fa-code',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tags: ['React', 'CSS']
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

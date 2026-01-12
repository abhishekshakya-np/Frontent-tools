# Backend API - Setup Guide

## Installation

1. **Install Python dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

## Running the Server

```bash
python app.py
```

The API will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login (returns JWT token)
- `GET /api/auth/verify` - Verify token (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/<id>` - Get single project
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/<id>` - Update project (requires auth)
- `DELETE /api/projects/<id>` - Delete project (requires auth)

### Websites
- `GET /api/websites` - Get all websites
- `GET /api/websites/<id>` - Get single website
- `POST /api/websites` - Create website (requires auth)
- `PUT /api/websites/<id>` - Update website (requires auth)
- `DELETE /api/websites/<id>` - Delete website (requires auth)

### Snippets
- `GET /api/snippets` - Get all snippets
- `GET /api/snippets/<id>` - Get single snippet
- `POST /api/snippets` - Create snippet (requires auth)
- `PUT /api/snippets/<id>` - Update snippet (requires auth)
- `DELETE /api/snippets/<id>` - Delete snippet (requires auth)

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Change the default password after first login!**

## Database Files

Data is stored in JSON files in `backend/database/`:
- `projects.json` - Projects data
- `websites.json` - Websites data
- `snippets.json` - Snippets data
- `users.json` - User credentials

## Security Notes

1. Change `SECRET_KEY` in `config.py` for production
2. Use environment variables for sensitive data
3. Enable JWT token expiration in production
4. Use HTTPS in production

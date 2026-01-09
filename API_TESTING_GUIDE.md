# OctoFit Tracker API - Quick Test Commands

## Setup Completed ✅

All configuration files have been updated to support GitHub Codespaces with proper HTTPS handling.

## Quick Start

### 1. Start the Django Server
Press `F5` in VS Code or run:
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

### 2. Test the API Endpoints

#### For Localhost Development:
```bash
# Test API root
curl http://localhost:8000/api/

# List users
curl http://localhost:8000/api/users/

# List teams
curl http://localhost:8000/api/teams/

# List activities
curl http://localhost:8000/api/activities/

# List workouts
curl http://localhost:8000/api/workouts/

# View leaderboard
curl http://localhost:8000/api/leaderboard/
```

#### For GitHub Codespace:
```bash
# Set the CODESPACE_NAME variable (already set in your environment)
export CODESPACE_NAME=your-codespace-name

# Test API root
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/

# List users
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/users/

# List teams
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/

# List activities
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/

# List workouts
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts/

# View leaderboard
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
```

**Note:** The `-k` flag is used to skip SSL certificate verification for self-signed certificates in the development environment.

## Files Modified

### 1. `octofit-tracker/backend/octofit_tracker/settings.py`
- Added `import os`
- Updated `ALLOWED_HOSTS` to include codespace URL from `CODESPACE_NAME` environment variable
- Supports both localhost and GitHub Codespaces

### 2. `octofit-tracker/backend/octofit_tracker/urls.py`
- Added `import os`
- Updated `api_root()` function to generate correct URLs based on environment
- Returns HTTPS URLs for Codespaces and HTTP URLs for localhost
- All endpoints now under `/api/` prefix

### 3. `.vscode/launch.json`
- Added `CODESPACE_NAME` environment variable to Django launch configuration
- Allows VS Code debugger to pass the codespace name to the Django app

## API Endpoint Format

**Localhost:**
```
http://localhost:8000/api/[component]/
```

**GitHub Codespace:**
```
https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

### Available Components:
- `users/` - User management endpoints
- `teams/` - Team management endpoints
- `activities/` - Activity logging endpoints
- `workouts/` - Workout suggestions endpoints
- `leaderboard/` - Leaderboard endpoints

## Troubleshooting

### Issue: Connection refused
- Make sure Django server is running
- Check if port 8000 is available
- Verify MongoDB is running on port 27017

### Issue: Certificate errors with Codespaces
- Use `-k` flag with curl to skip certificate verification
- In your code, you may need to configure SSL settings

### Issue: ALLOWED_HOSTS error
- Check that `CODESPACE_NAME` environment variable is set correctly
- Verify the URL format matches your actual codespace domain

## Next Steps

1. ✅ Configure Django settings for Codespaces
2. ✅ Update URL routing for API endpoints
3. ✅ Add CODESPACE_NAME to launch configuration
4. 🔄 Start the server and test API endpoints
5. 📱 Build React frontend


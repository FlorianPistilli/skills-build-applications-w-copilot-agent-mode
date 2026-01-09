# OctoFit Tracker - Codespace Setup Guide

## Configuration Complete ✅

### Changes Made:

1. **settings.py** - Updated `ALLOWED_HOSTS` to support:
   - `localhost`
   - `127.0.0.1`
   - `${CODESPACE_NAME}-8000.app.github.dev` (when running in GitHub Codespace)

2. **urls.py** - Updated API endpoints to:
   - Use environment variable `CODESPACE_NAME` for generating correct URLs
   - Format: `https://${CODESPACE_NAME}-8000.app.github.dev/api/[component]/`
   - Example: `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`

3. **launch.json** - Added `CODESPACE_NAME` environment variable to Django launch configuration

## How to Start the Server

### Option 1: Using VS Code Debug Launcher (Recommended)
1. Press `F5` or click "Run and Debug" in the sidebar
2. Select "Launch Django Backend" from the dropdown
3. The server will start on `http://localhost:8000` (or your Codespace URL on GitHub)

### Option 2: Using Terminal
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## Testing the API

### Using curl (Basic Tests)

Test the API root endpoint:
```bash
# For localhost
curl http://localhost:8000/api/

# For Codespace (adjust CODESPACE_NAME variable)
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/
```

### Test Specific Endpoints

**Users:**
```bash
curl http://localhost:8000/api/users/
```

**Teams:**
```bash
curl http://localhost:8000/api/teams/
```

**Activities:**
```bash
curl http://localhost:8000/api/activities/
```

**Workouts:**
```bash
curl http://localhost:8000/api/workouts/
```

**Leaderboard:**
```bash
curl http://localhost:8000/api/leaderboard/
```

### Using the Test Script

Run the provided test script:
```bash
chmod +x test_api.sh
./test_api.sh
```

## Environment Variables

- `CODESPACE_NAME` - Automatically set by GitHub when using Codespaces
- Set automatically in `launch.json` for debug sessions

## API Endpoints Format

The API follows the format:
```
https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

Where `[component]` can be:
- `users/` - User management
- `teams/` - Team management
- `activities/` - Activity logging
- `workouts/` - Workout suggestions
- `leaderboard/` - Competitive leaderboard

## Notes

- HTTPS is used for Codespace URLs (the `-k` flag in curl bypasses certificate validation for testing)
- HTTP is used for localhost development
- All endpoints are accessible via REST API
- Admin panel available at `/admin/`

## Database

MongoDB is configured and available at `mongodb://localhost:27017`

## Next Steps

1. Start the server using one of the methods above
2. Test endpoints using curl
3. Access the admin panel at `http://localhost:8000/admin/`
4. Start the React frontend when ready

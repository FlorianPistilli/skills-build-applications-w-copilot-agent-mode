# OctoFit Tracker - Codespace Setup Summary

## ✅ Configuration Complete

All necessary changes have been made to support OctoFit Tracker running in GitHub Codespaces with proper HTTPS handling.

---

## 📝 Changes Made

### 1. **settings.py** - ALLOWED_HOSTS Configuration
**File:** `octofit-tracker/backend/octofit_tracker/settings.py`

**Changes:**
- Added `import os` at the top
- Updated `ALLOWED_HOSTS` to support both localhost and Codespaces:
  ```python
  ALLOWED_HOSTS = ['localhost', '127.0.0.1']
  if os.environ.get('CODESPACE_NAME'):
      ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
  ```

**Why:** Allows Django to accept requests from the Codespace domain without SSL certificate errors.

---

### 2. **urls.py** - API Endpoints with Environment Variables
**File:** `octofit-tracker/backend/octofit_tracker/urls.py`

**Changes:**
- Added `import os` at the top
- Updated `api_root()` function to generate correct URLs based on environment:
  ```python
  codespace_name = os.environ.get('CODESPACE_NAME')
  if codespace_name:
      base_url = f"https://{codespace_name}-8000.app.github.dev/api"
  else:
      base_url = "http://localhost:8000/api"
  ```
- Changed URL patterns to use `/api/` prefix:
  ```python
  urlpatterns = [
      path('admin/', admin.site.urls),
      path('api/', api_root, name='api-root'),
      path('api/', include(router.urls)),
  ]
  ```

**Why:** Ensures API endpoints are accessible at the correct URLs in both local and Codespace environments.

---

### 3. **launch.json** - VS Code Debug Configuration
**File:** `.vscode/launch.json`

**Changes:**
- Added `CODESPACE_NAME` to the Django backend launch environment:
  ```json
  "env": {
    "CODESPACE_NAME": "${env:CODESPACE_NAME}"
  }
  ```

**Why:** Passes the Codespace name to the Django app when running through VS Code debugger.

---

### 4. **models.py** - User Model Configuration
**File:** `octofit-tracker/backend/octofit_tracker/models.py`

**Changes:**
- Added `Meta` class to User model with custom table name:
  ```python
  class Meta:
      db_table = 'octofit_tracker_user'
  ```

**Why:** Prevents model conflicts between Django's built-in User model and our custom User model.

---

## 🚀 How to Start

### Step 1: Activate Virtual Environment (if not already active)
```bash
cd octofit-tracker/backend
source venv/bin/activate
```

### Step 2: Start Django Server via VS Code
1. Press `F5` or go to "Run and Debug" sidebar
2. Select "Launch Django Backend"
3. Server starts on `http://localhost:8000` (or your Codespace URL)

### Alternative: Start via Terminal
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

---

## 🧪 Testing the API

### For Localhost (Development)
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

### For GitHub Codespace
```bash
# Note: CODESPACE_NAME is automatically set in your environment

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

**Note:** The `-k` flag skips SSL certificate verification for development purposes.

---

## 📊 API Endpoint Format

| Environment | Format |
|---|---|
| Localhost | `http://localhost:8000/api/[component]/` |
| Codespace | `https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/` |

### Available Components
- `users/` - User management
- `teams/` - Team management  
- `activities/` - Activity logging
- `workouts/` - Workout suggestions
- `leaderboard/` - Competitive leaderboard

---

## 📁 Project Structure

```
octofit-tracker/
├── backend/
│   ├── venv/                          (Virtual environment)
│   ├── octofit_tracker/
│   │   ├── __init__.py
│   │   ├── settings.py               ✅ MODIFIED - ALLOWED_HOSTS
│   │   ├── urls.py                   ✅ MODIFIED - API endpoints
│   │   ├── models.py                 ✅ MODIFIED - User model Meta
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── asgi.py
│   │   ├── wsgi.py
│   │   └── management/
│   │       └── commands/
│   │           └── populate_db.py
│   ├── manage.py
│   └── requirements.txt
└── frontend/
```

---

## 🔧 Environment Variables

| Variable | Value | Usage |
|---|---|---|
| `CODESPACE_NAME` | Auto-set by GitHub | Used to generate correct API URLs |
| `PYTHONPATH` | Virtual env path | Set in launch.json |
| `VIRTUAL_ENV` | Virtual env path | Set in launch.json |
| `PATH` | Virtual env bin | Set in launch.json |

---

## 🐛 Troubleshooting

### Problem: "Connection refused"
**Solution:**
1. Make sure Django server is running (press F5 or run `python manage.py runserver`)
2. Check port 8000 is available
3. Verify MongoDB is running on port 27017

### Problem: "ALLOWED_HOSTS error"
**Solution:**
1. Verify `CODESPACE_NAME` is set correctly
2. Check URL format matches your actual Codespace domain
3. Restart the server

### Problem: "Certificate verification failed"
**Solution:**
1. Use `-k` flag with curl: `curl -k https://...`
2. This is normal for development with self-signed certificates

### Problem: Django migrations not applied
**Solution:**
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py migrate
```

---

## ✨ Features

- ✅ Works on localhost (http://localhost:8000)
- ✅ Works on GitHub Codespaces (https://$CODESPACE_NAME-8000.app.github.dev)
- ✅ Auto-detects environment and generates correct URLs
- ✅ Supports HTTPS on Codespaces
- ✅ Handles SSL certificate validation gracefully
- ✅ REST API with proper routing
- ✅ Admin panel available at `/admin/`

---

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [GitHub Codespaces](https://github.com/features/codespaces)
- [MongoDB with Django (Djongo)](https://nesdis.github.io/djongo/)

---

## 🎯 Next Steps

1. ✅ Start the Django server
2. ✅ Test API endpoints with curl
3. Access the admin panel at `/admin/`
4. Create sample data using the API
5. Start building the React frontend
6. Deploy to production

---

**All configurations are complete and ready to use!** 🎉

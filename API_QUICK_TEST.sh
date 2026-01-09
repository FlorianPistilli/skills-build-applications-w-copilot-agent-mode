#!/bin/bash

# OctoFit Tracker - API Endpoints Quick Reference
# Copy and paste these commands to test your API

echo "═══════════════════════════════════════════════════════════"
echo "OctoFit Tracker API - Quick Test Commands"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📌 NOTE: Make sure the Django server is running!"
echo "   Start it with F5 or: python manage.py runserver 0.0.0.0:8000"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check environment
if [ -n "$CODESPACE_NAME" ]; then
    echo "🚀 CODESPACE DETECTED: $CODESPACE_NAME"
    echo "Using HTTPS URLs with -k flag for self-signed certificates"
    echo ""
    cat << 'EOF'
# Test API Root
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/

# Test Users Endpoint
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/users/

# Test Teams Endpoint
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/teams/

# Test Activities Endpoint
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/activities/

# Test Workouts Endpoint
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/workouts/

# Test Leaderboard Endpoint
curl -k https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard/
EOF
else
    echo "💻 LOCALHOST DETECTED"
    echo "Using HTTP URLs"
    echo ""
    cat << 'EOF'
# Test API Root
curl http://localhost:8000/api/

# Test Users Endpoint
curl http://localhost:8000/api/users/

# Test Teams Endpoint
curl http://localhost:8000/api/teams/

# Test Activities Endpoint
curl http://localhost:8000/api/activities/

# Test Workouts Endpoint
curl http://localhost:8000/api/workouts/

# Test Leaderboard Endpoint
curl http://localhost:8000/api/leaderboard/
EOF
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "💡 Additional Tips:"
echo "   • Use 'jq' to format JSON: curl ... | jq '.'"
echo "   • Use -v for verbose output: curl -v ..."
echo "   • Use -i to include response headers: curl -i ..."
echo ""
echo "═══════════════════════════════════════════════════════════"

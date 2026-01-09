#!/bin/bash

# OctoFit Tracker API Testing Guide
# This script provides curl commands for testing all API endpoints

echo "========================================================"
echo "OctoFit Tracker API - Testing Guide"
echo "========================================================"
echo ""
echo "IMPORTANT: Make sure the Django server is running first!"
echo "Start the server using: F5 or 'python manage.py runserver'"
echo ""

# Determine the base URL
if [ -z "$CODESPACE_NAME" ]; then
    BASE_URL="http://localhost:8000/api"
    echo "Using localhost: $BASE_URL"
else
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev/api"
    echo "Using Codespace: $BASE_URL"
    echo "Note: Adding -k flag for self-signed certificate"
fi
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print test headers
print_test_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${YELLOW}Test: $1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

# Determine curl options based on environment
if [ -n "$CODESPACE_NAME" ]; then
    CURL_OPTS="-s -k"
else
    CURL_OPTS="-s"
fi

# Test 1: API Root
print_test_header "1. API Root Endpoint"
echo -e "${GREEN}Command:${NC}"
echo "curl $CURL_OPTS $BASE_URL/"
echo ""
echo -e "${GREEN}Response:${NC}"
curl $CURL_OPTS "$BASE_URL/" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL/"
echo ""
echo ""

# Test 2: Users List
print_test_header "2. List All Users"
echo -e "${GREEN}Command:${NC}"
echo "curl $CURL_OPTS $BASE_URL/users/"
echo ""
echo -e "${GREEN}Response:${NC}"
curl $CURL_OPTS "$BASE_URL/users/" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL/users/"
echo ""
echo ""

# Test 3: Teams List
print_test_header "3. List All Teams"
echo -e "${GREEN}Command:${NC}"
echo "curl $CURL_OPTS $BASE_URL/teams/"
echo ""
echo -e "${GREEN}Response:${NC}"
curl $CURL_OPTS "$BASE_URL/teams/" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL/teams/"
echo ""
echo ""

# Test 4: Activities List
print_test_header "4. List All Activities"
echo -e "${GREEN}Command:${NC}"
echo "curl $CURL_OPTS $BASE_URL/activities/"
echo ""
echo -e "${GREEN}Response:${NC}"
curl $CURL_OPTS "$BASE_URL/activities/" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL/activities/"
echo ""
echo ""

# Test 5: Workouts List
print_test_header "5. List All Workouts"
echo -e "${GREEN}Command:${NC}"
echo "curl $CURL_OPTS $BASE_URL/workouts/"
echo ""
echo -e "${GREEN}Response:${NC}"
curl $CURL_OPTS "$BASE_URL/workouts/" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL/workouts/"
echo ""
echo ""

# Test 6: Leaderboard
print_test_header "6. Get Leaderboard"
echo -e "${GREEN}Command:${NC}"
echo "curl $CURL_OPTS $BASE_URL/leaderboard/"
echo ""
echo -e "${GREEN}Response:${NC}"
curl $CURL_OPTS "$BASE_URL/leaderboard/" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL/leaderboard/"
echo ""
echo ""

# Additional curl examples
print_test_header "Additional cURL Examples"
echo ""
echo -e "${YELLOW}1. Create a new user (POST):${NC}"
echo 'curl '"$CURL_OPTS"' -X POST '"$BASE_URL"'/users/ \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
  }'"'"''
echo ""

echo -e "${YELLOW}2. Get a specific user by ID (assuming ID is 1):${NC}"
echo "curl $CURL_OPTS $BASE_URL/users/1/"
echo ""

echo -e "${YELLOW}3. Create a new team (POST):${NC}"
echo 'curl '"$CURL_OPTS"' -X POST '"$BASE_URL"'/teams/ \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{
    "name": "Team Alpha",
    "description": "Our awesome fitness team"
  }'"'"''
echo ""

echo -e "${YELLOW}4. Create a new activity (POST):${NC}"
echo 'curl '"$CURL_OPTS"' -X POST '"$BASE_URL"'/activities/ \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{
    "user": 1,
    "activity_type": "Running",
    "duration": 30,
    "calories_burned": 250
  }'"'"''
echo ""

echo "========================================================"
echo "Test Complete!"
echo "========================================================"

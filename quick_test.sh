#!/bin/bash

# Quick Test Script for OctoFit Tracker API
# This script provides quick curl commands to test the API

# Detect environment
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev/api"
    CURL_OPTS="-s -k"
    echo "🚀 Testing Codespace Environment"
    echo "URL: $BASE_URL"
else
    BASE_URL="http://localhost:8000/api"
    CURL_OPTS="-s"
    echo "💻 Testing Localhost Environment"
    echo "URL: $BASE_URL"
fi

echo ""
echo "=========================================="
echo "OctoFit Tracker API Quick Test"
echo "=========================================="
echo ""

# Function to test endpoint
test_endpoint() {
    echo "Testing: $1"
    echo "GET $BASE_URL$2"
    curl $CURL_OPTS "$BASE_URL$2" | jq '.' 2>/dev/null || curl $CURL_OPTS "$BASE_URL$2"
    echo ""
    echo "---"
    echo ""
}

# Run tests
test_endpoint "API Root" "/"
test_endpoint "Users" "/users/"
test_endpoint "Teams" "/teams/"
test_endpoint "Activities" "/activities/"
test_endpoint "Workouts" "/workouts/"
test_endpoint "Leaderboard" "/leaderboard/"

echo "=========================================="
echo "✅ Tests Complete!"
echo "=========================================="

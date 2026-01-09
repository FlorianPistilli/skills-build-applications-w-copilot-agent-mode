#!/bin/bash

# Script de test des endpoints API OctoFit Tracker
# Ce script teste l'accès aux endpoints API de l'application

# Configuration
CODESPACE_NAME=${CODESPACE_NAME:-localhost}
API_BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev/api"
# Alternative pour local/localhost
if [ "$CODESPACE_NAME" = "localhost" ]; then
    API_BASE_URL="http://localhost:8000/api"
fi

echo "=========================================="
echo "OctoFit Tracker API Test"
echo "=========================================="
echo "API Base URL: $API_BASE_URL"
echo ""

# Test 1: API Root
echo "Test 1: Getting API Root endpoint"
curl -s -X GET "${API_BASE_URL}/" | jq '.' || echo "Error: Could not access API root"
echo ""

# Test 2: Users Endpoint
echo "Test 2: Getting Users endpoint"
curl -s -X GET "${API_BASE_URL}/users/" | jq '.' || echo "Error: Could not access users endpoint"
echo ""

# Test 3: Teams Endpoint
echo "Test 3: Getting Teams endpoint"
curl -s -X GET "${API_BASE_URL}/teams/" | jq '.' || echo "Error: Could not access teams endpoint"
echo ""

# Test 4: Activities Endpoint
echo "Test 4: Getting Activities endpoint"
curl -s -X GET "${API_BASE_URL}/activities/" | jq '.' || echo "Error: Could not access activities endpoint"
echo ""

# Test 5: Workouts Endpoint
echo "Test 5: Getting Workouts endpoint"
curl -s -X GET "${API_BASE_URL}/workouts/" | jq '.' || echo "Error: Could not access workouts endpoint"
echo ""

# Test 6: Leaderboard Endpoint
echo "Test 6: Getting Leaderboard endpoint"
curl -s -X GET "${API_BASE_URL}/leaderboard/" | jq '.' || echo "Error: Could not access leaderboard endpoint"
echo ""

echo "=========================================="
echo "API Tests Complete"
echo "=========================================="

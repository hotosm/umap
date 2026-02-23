#!/bin/bash
# uMap User Mapping Test Script
# Tests authentication status and user mapping in uMap
#
# Requirements: Requires both umap.hotosm.test and login.hotosm.test running locally
# (hot-dev-env). A valid JWT token from login.hotosm.test is needed for authenticated tests.

set -e

UMAP_URL="https://umap.hotosm.test"
LOGIN_URL="https://login.hotosm.test/app"

echo "uMap User Mapping Test Script"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Check if uMap is responding
echo -e "${BLUE}1. Checking if uMap is responding...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL")
if [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}OK uMap responding (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}FAIL uMap not responding (HTTP $HTTP_CODE)${NC}"
    exit 1
fi
echo ""

# 2. Check auth status endpoint without JWT
echo -e "${BLUE}2. Checking /api/auth/status/ WITHOUT JWT...${NC}"
RESPONSE=$(curl -s -k "$UMAP_URL/api/auth/status/")
echo "$RESPONSE" | python -m json.tool 2>/dev/null || echo "$RESPONSE"
AUTH_PROVIDER=$(echo "$RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin).get('auth_provider', 'unknown'))" 2>/dev/null)
if [ "$AUTH_PROVIDER" = "hanko" ]; then
    echo -e "${GREEN}OK AUTH_PROVIDER=hanko configured${NC}"
else
    echo -e "${RED}FAIL AUTH_PROVIDER is not 'hanko'${NC}"
fi
echo ""

# 3. Check onboarding routes
echo -e "${BLUE}3. Checking onboarding routes...${NC}"
ONBOARDING_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL/api/auth/onboarding/")
echo "GET /api/auth/onboarding/ -> HTTP $ONBOARDING_STATUS"
ONBOARDING_NEW=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL/api/auth/onboarding/?new_user=true")
echo "GET /api/auth/onboarding/?new_user=true -> HTTP $ONBOARDING_NEW"
if [ "$ONBOARDING_STATUS" != "404" ] && [ "$ONBOARDING_NEW" != "404" ]; then
    echo -e "${GREEN}OK Onboarding routes available${NC}"
else
    echo -e "${RED}FAIL Onboarding routes not found${NC}"
fi
echo ""

# 4. Check admin mappings route
echo -e "${BLUE}4. Checking admin route...${NC}"
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL/api/admin/mappings")
echo "GET /api/admin/mappings -> HTTP $ADMIN_STATUS"
if [ "$ADMIN_STATUS" != "404" ]; then
    echo -e "${GREEN}OK Admin routes available${NC}"
else
    echo -e "${RED}FAIL Admin routes not found${NC}"
fi
echo ""

# 5. Ask for JWT token (requires login.hotosm.test running)
echo -e "${YELLOW}To complete the test you need a JWT token from login.hotosm.test:${NC}"
echo ""
echo "  1. Open: $LOGIN_URL"
echo "  2. Create an account or log in"
echo "  3. Open DevTools (F12)"
echo "  4. Go to Application -> Cookies -> login.hotosm.test"
echo "  5. Copy the value of the 'hanko' cookie"
echo ""
read -p "Paste the JWT token (or press Enter to skip): " JWT_TOKEN
echo ""

# 6. Test with JWT if provided
if [ -n "$JWT_TOKEN" ]; then
    echo -e "${BLUE}5. Checking /api/auth/status/ WITH JWT...${NC}"
    RESPONSE_WITH_JWT=$(curl -s -k "$UMAP_URL/api/auth/status/" \
        -H "Cookie: hanko=$JWT_TOKEN" \
        -H "Accept: application/json")
    echo "$RESPONSE_WITH_JWT" | python -m json.tool 2>/dev/null || echo "$RESPONSE_WITH_JWT"

    # Check if authenticated
    IS_AUTHENTICATED=$(echo "$RESPONSE_WITH_JWT" | python -c "import sys, json; print(json.load(sys.stdin).get('authenticated', False))" 2>/dev/null)
    if [ "$IS_AUTHENTICATED" = "True" ]; then
        echo -e "${GREEN}OK User authenticated in uMap${NC}"
    else
        NEEDS_ONBOARDING=$(echo "$RESPONSE_WITH_JWT" | python -c "import sys, json; print(json.load(sys.stdin).get('needs_onboarding', False))" 2>/dev/null)
        if [ "$NEEDS_ONBOARDING" = "True" ]; then
            echo -e "${YELLOW}User needs to complete onboarding${NC}"
            echo ""
            echo -e "${BLUE}6. Attempting onboarding for new user...${NC}"
            ONBOARDING_RESPONSE=$(curl -sL -k "$UMAP_URL/api/auth/onboarding/?new_user=true" \
                -H "Cookie: hanko=$JWT_TOKEN" \
                -w "\nHTTP_CODE:%{http_code}")
            HTTP_CODE=$(echo "$ONBOARDING_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
            echo "Onboarding response: HTTP $HTTP_CODE"

            if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ]; then
                echo -e "${GREEN}OK Onboarding complete${NC}"
                echo ""
                echo -e "${BLUE}7. Checking new status...${NC}"
                RESPONSE_AFTER=$(curl -s -k "$UMAP_URL/api/auth/status/" \
                    -H "Cookie: hanko=$JWT_TOKEN" \
                    -H "Accept: application/json")
                echo "$RESPONSE_AFTER" | python -m json.tool 2>/dev/null || echo "$RESPONSE_AFTER"
            else
                echo -e "${RED}FAIL Error in onboarding (HTTP $HTTP_CODE)${NC}"
            fi
        else
            echo -e "${RED}FAIL User not authenticated and does not need onboarding${NC}"
        fi
    fi
    echo ""
else
    echo -e "${YELLOW}JWT token not provided, skipping authenticated test${NC}"
fi

echo ""
echo -e "${BLUE}=================================="
echo "Available Endpoints Summary:"
echo -e "==================================${NC}"
echo ""
echo "STATUS: GET /api/auth/status/"
echo "  -> Without JWT: Shows auth_provider and status"
echo "  -> With JWT: Shows user and mapping"
echo ""
echo "ONBOARDING: GET /api/auth/onboarding/?new_user=true"
echo "  -> Creates user mapping for new user"
echo "  -> Requires JWT with new user without mapping"
echo ""
echo "ONBOARDING LEGACY: GET /api/auth/onboarding/"
echo "  -> Creates user mapping for user with existing OSM account"
echo "  -> Requires JWT + OSM connection"
echo ""
echo "ADMIN: GET /api/admin/mappings"
echo "  -> Lists all user mappings (requires admin)"
echo ""
echo -e "${GREEN}Test complete${NC}"

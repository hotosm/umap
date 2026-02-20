#!/bin/bash
# uMap User Mapping Test Script
# Verifica el estado de autenticación y user mapping en uMap

set -e

UMAP_URL="https://umap.hotosm.test"
LOGIN_URL="https://login.hotosm.test/app"

echo "🔧 uMap User Mapping Test Script"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Check if uMap is responding
echo -e "${BLUE}1. Verificando si uMap está respondiendo...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL")
if [ "$HTTP_CODE" = "302" ] || [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ uMap respondiendo (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ uMap no respondiendo (HTTP $HTTP_CODE)${NC}"
    exit 1
fi
echo ""

# 2. Check auth status endpoint without JWT
echo -e "${BLUE}2. Verificando /api/auth/status/ SIN JWT...${NC}"
RESPONSE=$(curl -s -k "$UMAP_URL/api/auth/status/")
echo "$RESPONSE" | python -m json.tool 2>/dev/null || echo "$RESPONSE"
AUTH_PROVIDER=$(echo "$RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin).get('auth_provider', 'unknown'))" 2>/dev/null)
if [ "$AUTH_PROVIDER" = "hanko" ]; then
    echo -e "${GREEN}✅ AUTH_PROVIDER=hanko configurado${NC}"
else
    echo -e "${RED}❌ AUTH_PROVIDER no es 'hanko'${NC}"
fi
echo ""

# 3. Check onboarding routes
echo -e "${BLUE}3. Verificando rutas de onboarding...${NC}"
ONBOARDING_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL/api/auth/onboarding/")
echo "GET /api/auth/onboarding/ → HTTP $ONBOARDING_STATUS"
ONBOARDING_NEW=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL/api/auth/onboarding/?new_user=true")
echo "GET /api/auth/onboarding/?new_user=true → HTTP $ONBOARDING_NEW"
if [ "$ONBOARDING_STATUS" != "404" ] && [ "$ONBOARDING_NEW" != "404" ]; then
    echo -e "${GREEN}✅ Rutas de onboarding disponibles${NC}"
else
    echo -e "${RED}❌ Rutas de onboarding no encontradas${NC}"
fi
echo ""

# 4. Check admin mappings route
echo -e "${BLUE}4. Verificando ruta admin...${NC}"
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -k "$UMAP_URL/api/admin/mappings")
echo "GET /api/admin/mappings → HTTP $ADMIN_STATUS"
if [ "$ADMIN_STATUS" != "404" ]; then
    echo -e "${GREEN}✅ Admin routes disponibles${NC}"
else
    echo -e "${RED}❌ Admin routes no encontradas${NC}"
fi
echo ""

# 5. Ask for JWT token
echo -e "${YELLOW}📋 Para completar la prueba necesitas un JWT token:${NC}"
echo ""
echo "   1. Abre: $LOGIN_URL"
echo "   2. Crea una cuenta o inicia sesión"
echo "   3. Abre DevTools (F12)"
echo "   4. Ve a Aplicación → Cookies → login.hotosm.test"
echo "   5. Copia el valor de la cookie 'hanko'"
echo ""
read -p "Pega el JWT token (o presiona Enter para saltar): " JWT_TOKEN
echo ""

# 6. Test with JWT if provided
if [ -n "$JWT_TOKEN" ]; then
    echo -e "${BLUE}5. Verificando /api/auth/status/ CON JWT...${NC}"
    RESPONSE_WITH_JWT=$(curl -s -k "$UMAP_URL/api/auth/status/" \
        -H "Cookie: hanko=$JWT_TOKEN" \
        -H "Accept: application/json")
    echo "$RESPONSE_WITH_JWT" | python -m json.tool 2>/dev/null || echo "$RESPONSE_WITH_JWT"
    
    # Check if authenticated
    IS_AUTHENTICATED=$(echo "$RESPONSE_WITH_JWT" | python -c "import sys, json; print(json.load(sys.stdin).get('authenticated', False))" 2>/dev/null)
    if [ "$IS_AUTHENTICATED" = "True" ]; then
        echo -e "${GREEN}✅ Usuario autenticado en uMap${NC}"
    else
        NEEDS_ONBOARDING=$(echo "$RESPONSE_WITH_JWT" | python -c "import sys, json; print(json.load(sys.stdin).get('needs_onboarding', False))" 2>/dev/null)
        if [ "$NEEDS_ONBOARDING" = "True" ]; then
            echo -e "${YELLOW}⚠️  Usuario necesita completar onboarding${NC}"
            echo ""
            echo -e "${BLUE}6. Intentando completar onboarding para nuevo usuario...${NC}"
            ONBOARDING_RESPONSE=$(curl -sL -k "$UMAP_URL/api/auth/onboarding/?new_user=true" \
                -H "Cookie: hanko=$JWT_TOKEN" \
                -w "\nHTTP_CODE:%{http_code}")
            HTTP_CODE=$(echo "$ONBOARDING_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
            echo "Onboarding response: HTTP $HTTP_CODE"
            
            if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "302" ]; then
                echo -e "${GREEN}✅ Onboarding completado${NC}"
                echo ""
                echo -e "${BLUE}7. Verificando nuevo estado...${NC}"
                RESPONSE_AFTER=$(curl -s -k "$UMAP_URL/api/auth/status/" \
                    -H "Cookie: hanko=$JWT_TOKEN" \
                    -H "Accept: application/json")
                echo "$RESPONSE_AFTER" | python -m json.tool 2>/dev/null || echo "$RESPONSE_AFTER"
            else
                echo -e "${RED}❌ Error en onboarding (HTTP $HTTP_CODE)${NC}"
            fi
        else
            echo -e "${RED}❌ Usuario no autenticado pero no necesita onboarding${NC}"
        fi
    fi
    echo ""
else
    echo -e "${YELLOW}⚠️  JWT token no proporcionado, saltando prueba autenticada${NC}"
fi

echo ""
echo -e "${BLUE}=================================="
echo "Resumen de Endpoints Disponibles:"
echo -e "==================================${NC}"
echo ""
echo "📌 STATUS: GET /api/auth/status/"
echo "   → Sin JWT: Muestra auth_provider y estado"
echo "   → Con JWT: Muestra usuario y mapping"
echo ""
echo "📌 ONBOARDING: GET /api/auth/onboarding/?new_user=true"
echo "   → Crea user mapping para nuevo usuario"
echo "   → Requiere JWT con nuevo usuario sin mapping"
echo ""
echo "📌 ONBOARDING LEGACY: GET /api/auth/onboarding/"
echo "   → Crea user mapping para usuario con OSM anterior"
echo "   → Requiere JWT + OSM connection"
echo ""
echo "📌 ADMIN: GET /api/admin/mappings"
echo "   → Lista todos los user mappings (requiere admin)"
echo ""
echo -e "${GREEN}✅ Test completado${NC}"

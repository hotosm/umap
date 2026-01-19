# Hanko Authentication Implementation for uMap

## Overview

This document describes the Hanko SSO authentication implementation for the HOT OSM uMap instance.

**Stack**: Django | **Type**: With User Mapping | **OSM Required**: Yes (legacy)

## Backend Implementation

### 1. Dependencies

Added to `app/pyproject.toml`:
```python
"hotosm-auth[django] @ git+https://github.com/hotosm/login.git@auth-libs-v0.2.2#subdirectory=auth-libs/python"
```

### 2. Configuration

**settings.py** changes:
- Added `AUTH_PROVIDER` environment variable (default: `legacy`)
- When `AUTH_PROVIDER=hanko`:
  - Loads `HANKO_API_URL`, `COOKIE_SECRET`, `COOKIE_DOMAIN`, `COOKIE_SECURE`
  - Adds `hotosm_auth_django` to `INSTALLED_APPS`
  - Inserts `HankoAuthMiddleware` before `AuthenticationMiddleware`

### 3. Middleware

The `HankoAuthMiddleware` injects `request.hotosm` into every request:

```python
request.hotosm.user  # HankoUser (or None if not authenticated)
request.hotosm.osm   # OSMConnection (or None if not connected)
```

### 4. Protected Routes

Example endpoint with authentication check:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProtectedView(APIView):
    def get(self, request):
        if not hasattr(request, 'hotosm') or not request.hotosm.user:
            return Response(
                {"error": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        hanko_user = request.hotosm.user
        return Response({
            "user_id": hanko_user.id,
            "email": hanko_user.email,
        })
```

### 5. User Mapping

Use `HankoUserFilterMixin` to filter querysets by authenticated user:

```python
from custom.hanko_helpers import HankoUserFilterMixin

class MapViewSet(HankoUserFilterMixin, viewsets.ModelViewSet):
    queryset = Map.objects.all()
    serializer_class = MapSerializer
```

The mixin filters by the mapped user ID for the "umap" app.

### 6. Admin Routes

Admin mapping endpoints are automatically included when `AUTH_PROVIDER=hanko`:

- `GET /api/admin/mappings` - List user mappings
- `POST /api/admin/mappings` - Create mapping
- `GET /api/admin/mappings/{id}` - Get mapping
- `PUT /api/admin/mappings/{id}` - Update mapping
- `DELETE /api/admin/mappings/{id}` - Delete mapping

### 7. Environment Variables

Update your `.env` file:

```bash
# Auth provider
AUTH_PROVIDER=hanko

# Hanko SSO
HANKO_API_URL=https://login.hotosm.org
COOKIE_SECRET=your-32-byte-secret-key
COOKIE_DOMAIN=.hotosm.org
COOKIE_SECURE=true

# Admin
ADMIN_EMAILS=admin@hotosm.org
```

## Frontend Integration

Add the Hanko web component to your frontend:

```html
<head>
    <meta name="hanko-url" content="https://login.hotosm.org">
    <script src="/auth-libs/web-component/dist/hanko-auth.iife.js"></script>
</head>
<body>
    <hotosm-auth show-profile></hotosm-auth>
</body>
```

## Files Changed

- `app/pyproject.toml` - Added hotosm-auth dependency
- `app/settings.py` - Hanko configuration and middleware
- `app/urls.py` - Admin mapping routes
- `app/custom/hanko_helpers.py` - User filtering utilities (new)
- `env.docker.sample` - Hanko environment variables

## Switching Between Auth Providers

**To use Hanko (new):**
```bash
export AUTH_PROVIDER=hanko
export HANKO_API_URL=https://login.hotosm.org
export COOKIE_SECRET=your-secret
```

**To use legacy OSM OAuth:**
```bash
export AUTH_PROVIDER=legacy
```

## Notes

- The middleware order is critical: `HankoAuthMiddleware` must come before `AuthenticationMiddleware`
- User mappings are stored in the authentication service
- OSM connection is optional but may be required for some operations
- Admin emails can be configured to automatically get admin mappings

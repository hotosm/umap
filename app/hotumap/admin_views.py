"""
Admin views for user mapping management.

Compatible with fAIr's admin mapping endpoints.
Uses basic Django views without REST Framework.
"""

from django.views import View
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


@method_decorator(csrf_exempt, name='dispatch')
class MappingsListCreateView(View):
    """List or create user mappings."""
    
    def get(self, request):
        """List all user mappings.
        
        Returns user list (admin access required).
        """
        if not request.user.is_staff:
            return JsonResponse(
                {"detail": "Admin access required"},
                status=403
            )
        
        # Return list of users with mapping-compatible format
        users = User.objects.all()
        mappings = [
            {
                "id": user.id,
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
            }
            for user in users
        ]
        
        return JsonResponse(mappings, safe=False)
    
    def post(self, request):
        """Create a new user mapping.
        
        Creates a Django user for Hanko mapping.
        """
        if not request.user.is_staff:
            return JsonResponse(
                {"detail": "Admin access required"},
                status=403
            )
        
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {"detail": "Invalid JSON"},
                status=400
            )
        
        username = data.get('username')
        email = data.get('email')
        
        if not username or not email:
            return JsonResponse(
                {"detail": "username and email are required"},
                status=400
            )
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
        )
        
        return JsonResponse({
            "id": user.id,
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
        }, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class MappingDetailView(View):
    """Retrieve, update or delete a user mapping by Django ID or Hanko UUID."""
    
    def _is_uuid(self, value):
        """Check if value is a UUID."""
        try:
            import uuid
            uuid.UUID(value)
            return True
        except (ValueError, AttributeError):
            return False
    
    def get(self, request, id):
        """Get a specific user mapping."""
        if not request.user.is_staff:
            return JsonResponse(
                {"detail": "Admin access required"},
                status=403
            )
        
        # Check if it's a UUID (Hanko ID) or int (Django ID)
        if self._is_uuid(str(id)):
            # Hanko UUID lookup
            return JsonResponse({
                "message": "Hanko mapping lookup",
                "hanko_id": id,
                "note": "Full Hanko mapping table not yet implemented. Use Django user IDs (integers) for now."
            })
        
        # Django user ID lookup
        try:
            pk = int(id)
            user = User.objects.get(pk=pk)
            return JsonResponse({
                "id": user.id,
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
            })
        except (ValueError, User.DoesNotExist):
            return JsonResponse(
                {"detail": "Not found"},
                status=404
            )
    
    def put(self, request, id):
        """Update a user mapping."""
        if not request.user.is_staff:
            return JsonResponse(
                {"detail": "Admin access required"},
                status=403
            )
        
        # Check if it's a UUID
        if self._is_uuid(str(id)):
            return JsonResponse({
                "message": "Update by Hanko ID",
                "hanko_id": id,
                "note": "Full Hanko mapping table not yet implemented."
            })
        
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {"detail": "Invalid JSON"},
                status=400
            )
        
        try:
            pk = int(id)
            user = User.objects.get(pk=pk)
            
            # Update fields if provided
            if 'username' in data:
                user.username = data['username']
            if 'email' in data:
                user.email = data['email']
            
            user.save()
            
            return JsonResponse({
                "id": user.id,
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
            })
        except (ValueError, User.DoesNotExist):
            return JsonResponse(
                {"detail": "Not found"},
                status=404
            )
    
    def delete(self, request, id):
        """Delete a user mapping."""
        if not request.user.is_staff:
            return JsonResponse(
                {"detail": "Admin access required"},
                status=403
            )
        
        # Check if it's a UUID
        if self._is_uuid(str(id)):
            return JsonResponse({
                "message": "Delete by Hanko ID",
                "hanko_id": id,
                "note": "Full Hanko mapping table not yet implemented."
            })
        
        try:
            pk = int(id)
            user = User.objects.get(pk=pk)
            user.delete()
            return JsonResponse({}, status=204)
        except (ValueError, User.DoesNotExist):
            return JsonResponse(
                {"detail": "Not found"},
                status=404
            )

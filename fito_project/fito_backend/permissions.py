from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrAuthenticatedWrite(BasePermission):
    """
    - Leitura (GET, HEAD, OPTIONS): liberada para todos
    - Escrita (POST, PUT, PATCH): apenas autenticados
    - Exclusão (DELETE): apenas admin
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if request.method == 'DELETE':
            return request.user and request.user.is_staff
        return request.user and request.user.is_authenticated 
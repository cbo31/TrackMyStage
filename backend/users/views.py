from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken 
from django.contrib.auth.hashers import check_password
from .models import CustomUser, Application
from .serializers import UserSerializer, ApplicationSerializer

@api_view(['POST'])
def register(request):
    """
    Endpoint to save new user
    Get : { 'email': '...', 'name': '...', 'password': '...' }
    """
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "compte bien crée ! 🎉",
            "user": serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    """
    Endpoint to login
    Get : { 'email': '...', 'password': '...' }
    """
    email = request.data.get('email')
    password = request.data.get('password')

    try: 
        user = CustomUser.objects.get(username=email)
        refresh = RefreshToken.for_user(user)

        if check_password(password, user.password):
            return Response({
                'message': 'connexion réussie',
                'access': str(refresh.access_token),
                'user' : {
                    'id': user.id,
                    'email': user.email,
                    'name': user.name
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'email ou mot de passe incorrect'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    except CustomUser.DoesNotExist:
        return Response({
            'error': 'utilisateur inconnu'
        }, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_application(request):
    serializer = ApplicationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user) # get user from token identify by django
        return Response({
            'message': 'nouvelle candidature ajouté',
            'application': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) # mendatory token
def get_applications(request):
    applications = Application.objects.filter(user=request.user)

    if not applications.exists():
        return Response({'message': 'Aucune candidature'}, status=status.HTTP_200_OK)
    
    serializer = ApplicationSerializer(applications, many=True) # many=True because it is a list
    return Response(serializer.data)


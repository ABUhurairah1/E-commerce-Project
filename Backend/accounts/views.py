from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from .serializers import UserSerializer
from allauth.socialaccount.models import SocialAccount
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import requests
from django.conf import settings
from django.shortcuts import redirect

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def CreateUser(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def google_callback(request):
    print("Google callback received request")
    id_token = request.data.get('access_token')
    print(f"ID token received: {'Yes' if id_token else 'No'}")
    
    if not id_token:
        print("No ID token provided in request")
        return Response(
            {'error': 'ID token not provided'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Verify the ID token with Google
        user_info_response = requests.get(
            'https://oauth2.googleapis.com/tokeninfo',
            params={'id_token': id_token}
        )

        if user_info_response.status_code != 200:
            return Response(
                {'error': 'Failed to verify ID token with Google'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_info = user_info_response.json()
        email = user_info.get('email')

        if not email:
            return Response(
                {'error': 'Email not provided by Google'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Try to find existing social account
            social_account = SocialAccount.objects.get(
                provider='google',
                uid=user_info.get('sub')
            )
            user = social_account.user
        except SocialAccount.DoesNotExist:
            try:
                # Try to find existing user by email
                user = User.objects.get(email=email)
                # Create social account for existing user
                SocialAccount.objects.create(
                    user=user,
                    provider='google',
                    uid=user_info.get('sub'),
                    extra_data=user_info
                )
            except User.DoesNotExist:
                # Create new user and social account
                user = User.objects.create_user(
                    email=email,
                    username=user_info.get('given_name', ''),
                    last_name=user_info.get('family_name', ''),
                    role='User'
                )
                SocialAccount.objects.create(
                    user=user,
                    provider='google',
                    uid=user_info.get('sub'),
                    extra_data=user_info
                )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        })

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def google_login_callback(request):
    user = request.user
    social_accounts = SocialAccount.objects.filter(user=user)
    print("Social Account for user:", social_accounts)

    social_account = social_accounts.first()

    if not social_account:
        print("No social account for user:", user)
        return redirect(f'{settings.FRONTEND_URL}/login/callback/?error=NoSocialAccount')
    
    token = SocialToken.objects.filter(account=social_account, account__provider='google').first()

    if token:
        print('Google token found:', token.token)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return redirect(f'{settings.FRONTEND_URL}/login/callback/?access_token={access_token}')
    else:
        print('No Google token found for user', user)
        return redirect(f'{settings.FRONTEND_URL}/login/callback/?error=NoGoogleToken')

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def validate_google_token(request):
    try:
        google_access_token = request.data.get('access_token')
        print(google_access_token)

        if not google_access_token:
            return Response(
                {'detail': 'Access Token is missing.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response({'valid': True})
    except Exception as e:
        return Response(
            {'detail': 'Invalid request.'},
            status=status.HTTP_400_BAD_REQUEST
        )


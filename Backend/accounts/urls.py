from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import CreateUser, google_callback

urlpatterns = [
    path('register/', CreateUser, name='register'),
    path('google/callback/', google_callback, name='google-callback'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]

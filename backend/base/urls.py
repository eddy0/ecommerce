from django.urls import path
from . import views

# from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', views.get_routes, name='routes'),

    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.user_profile, name='users_profile'),
    path('users/', views.get_users, name='users'),
    path('users/register/', views.register_user, name='register'),

    path('products/', views.get_products, name='products'),
    path('products/<str:pk>', views.get_product, name='product'),
]

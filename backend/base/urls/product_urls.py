from django.urls import path

# from rest_framework_simplejwt.views import TokenObtainPairView
from base.views import product_views as views

# products/
urlpatterns = [
    path('', views.get_products, name='products'),
    path('<str:pk>', views.get_product, name='product'),
]

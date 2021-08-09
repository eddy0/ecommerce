from django.urls import path

# from rest_framework_simplejwt.views import TokenObtainPairView
from base.views import product_views as views

# products/
urlpatterns = [
    path('', views.get_products, name='products'),

    path('delete/<str:pk>/', views.delete_product, name='delete_product'),
    path('update/<str:pk>/', views.update_product, name='update_product'),
    path('create/', views.create_product, name='create_product'),
    path('upload/', views.upload_image, name='upload_image'),
    path('<str:pk>/reviews/', views.create_view, name='product_review'),

    path('<str:pk>/', views.get_product, name='product'),
]

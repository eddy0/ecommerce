from django.urls import path

# from rest_framework_simplejwt.views import TokenObtainPairView

# products/
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.get_orders, name='orders'),

    path('<str:pk>/', views.get_order_by_id, name='order-by-id'),
    path('<str:pk>/pay/', views.update_order_to_paid, name='update_order_to_paid'),

    # path('', views.get_products, name='products'),
    # path('<str:pk>', views.get_product, name='product'),
]

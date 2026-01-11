from django.urls import path
from . import views

urlpatterns = [
    # Destinations
    path('destinations/', views.destination_list, name='destination-list'),
    path('destinations/<int:pk>/', views.destination_detail, name='destination-detail'),

    # Bookings
    path('bookings/', views.create_booking, name='create-booking'),

    # M-Pesa payments
    path('mpesa/stk-push/', views.initiate_mpesa_payment, name='mpesa-stk-push'),
    path('mpesa/query/', views.query_mpesa_transaction, name='mpesa-query'),
    path('mpesa/callback/', views.mpesa_callback, name='mpesa-callback'),
    path('mpesa/transaction/<str:checkout_request_id>/', views.get_transaction, name='get-transaction'),

    # Health check
    path('mpesa/health/', views.health_check, name='health-check'),
]
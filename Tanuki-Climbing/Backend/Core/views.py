from django.http import JsonResponse
from firebase_admin import firestore
from django.views.decorators.csrf import csrf_exempt
import json

# Reference to Firestore
db = firestore.client()

@csrf_exempt
def submit_order(request):
    if request.method == "POST":
        try:
            # Parse the request body
            body = json.loads(request.body)

            # Extract order details
            user_details = body.get("userDetails")
            cart_items = body.get("cartItems")
            total_price = body.get("totalPrice")

            if not user_details or not cart_items or total_price is None:
                return JsonResponse({"success": False, "message": "Invalid data."}, status=400)

            # Add order to Firestore
            order_data = {
                "userDetails": user_details,
                "cartItems": cart_items,
                "totalPrice": total_price,
                "createdAt": firestore.SERVER_TIMESTAMP,
            }

            # Save to Firestore
            orders_ref = db.collection("orders")
            new_order = orders_ref.add(order_data)

            return JsonResponse({"success": True, "orderId": new_order[1].id}, status=201)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

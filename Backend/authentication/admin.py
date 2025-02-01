from django.contrib import admin
from authentication.models import UserDetails  # ✅ Correct Import

admin.site.register(UserDetails)

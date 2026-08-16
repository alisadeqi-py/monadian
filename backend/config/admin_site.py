from django.contrib import admin

admin.site.site_header = "پنل مدیریت موسسه منادیان فتح ایرانیان"
admin.site.site_title = "پنل مدیریت"
admin.site.index_title = "داشبورد"
# Points the admin's "مشاهده سایت" link at the public site instead of "/",
# which on this deployment just redirects back into the admin.
admin.site.site_url = "https://monadianfath.com"
# One consistent placeholder for empty values across every changelist,
# matching what the custom display methods already return.
admin.site.empty_value_display = "—"

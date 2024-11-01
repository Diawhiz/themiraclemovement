from .models import PageVisit

class AnalyticsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if not request.path.startswith('/admin/'):
            PageVisit.objects.create(
                page_url=request.path,
                user_agent=request.META.get('HTTP_USER_AGENT'),
                ip_address=request.META.get('REMOTE_ADDR')
            )
        return response
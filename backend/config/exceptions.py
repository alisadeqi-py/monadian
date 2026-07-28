from rest_framework.exceptions import Throttled
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    """Rewrites DRF's built-in English messages (rate limiting, malformed
    request bodies, etc.) to Farsi so every form error reaching the
    frontend - not just serializer field errors - is user-facing text."""
    response = exception_handler(exc, context)
    if response is None:
        return None

    if isinstance(exc, Throttled):
        wait = int(exc.wait) if exc.wait else None
        detail = (
            f"تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً {wait} ثانیه دیگر دوباره تلاش کنید."
            if wait
            else "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید."
        )
        response.data = {"detail": detail}
    elif response.status_code >= 500:
        response.data = {"detail": "خطایی در سرور رخ داد. لطفاً بعداً دوباره تلاش کنید."}
    elif not isinstance(response.data, dict) or (
        "detail" in response.data and len(response.data) == 1
    ):
        # Generic DRF exceptions (bad request body, method not allowed, not
        # found, etc.) that aren't per-field validation errors.
        response.data = {"detail": "درخواست نامعتبر است. لطفاً دوباره تلاش کنید."}

    return response

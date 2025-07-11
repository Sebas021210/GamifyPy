from .auth import router as auth_router
from .user import router as user_router
from .category_level import router as category_level_router
from .lessons import router as lessons_router

__all__ = [
    "auth_router",
    "user_router",
    "category_level_router",
    "lessons_router"
]

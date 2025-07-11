from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from backend.routes import auth_router, user_router, category_level_router, lessons_router

app = FastAPI(title="GamifyPy")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(category_level_router, prefix="/category-level", tags=["category_level"])
app.include_router(lessons_router, prefix="/lessons", tags=["lessons"])
app.mount("/static", StaticFiles(directory="backend/static"), name="static")

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
    )

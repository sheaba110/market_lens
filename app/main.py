from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import search


app = FastAPI(title="Offer Explorer")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React dev server default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)

@app.get("/")
def read_root():
    return{"message": "Wlecome to the Offer Explorer Search Engine API"}
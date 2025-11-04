from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import search


app = FastAPI(title="Offer Explorer")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development (change to specific origins in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Offer Explorer Search Engine API"}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "service": "Offer Explorer API"}
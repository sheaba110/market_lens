from fastapi import FastAPI 
from app.api.routers import search


app = FastAPI(title="Offer Explorer")

app.include_router(search.router)

@app.get("/")
def read_root():
    return{"message": "Wlecome to the Offer Explorer Search Engine API"}
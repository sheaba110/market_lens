from app.core.services import search_service
from fastapi import APIRouter, HTTPException 
from app.core.services.search_service import SearchService

router  = APIRouter()
search_service = SearchService()

@router.get("/search")
async def search_documents(query: str):
    try:
        hits = search_service.search(query)

        results = []
        for hit in hits:
            source = hit['_source']
            results.append({
                "title": source.get("title"),
                "url": source.get("url"),
                "snippet": (source.get("content")[:200] + "..." if source.get("content") else "")
                })
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")
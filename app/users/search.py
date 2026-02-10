from fastapi import APIRouter, HTTPException 
from app.products.search_service import SearchService

router = APIRouter()
search_service = SearchService()

@router.get("/search")
async def search_documents(query: str):
    """
    Search for offers matching the query string.
    Returns a list of results with title, price, currency, url, image, source, and snippet.
    """
    try:
        if not query or not query.strip():
            return {"results": []}
        
        hits = search_service.search(query.strip())

        results = []
        for hit in hits:
            source = hit.get('_source', {})
            
            # Generate snippet from title since content field doesn't exist in data.json
            title = source.get("title", "")
            content = source.get("content", "")
            
            if content:
                snippet = content[:200] + "..." if len(content) > 200 else content
            elif title:
                # Create a meaningful snippet from title and source
                source_name = source.get("source", "")
                snippet = f"Find {title}" + (f" at {source_name}" if source_name else "")
            else:
                snippet = None
            
            results.append({
                "title": title or None,
                "price": source.get("price"),
                "url": source.get("url"),
                "image": source.get("image"),
                "source": source.get("source"),
                "snippet": snippet
            })
        
        return {"results": results}
    except ConnectionError as e:
        raise HTTPException(
            status_code=503, 
            detail=f"Elasticsearch connection failed: {str(e)}. Please ensure Elasticsearch is running."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

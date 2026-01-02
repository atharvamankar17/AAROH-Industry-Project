from fastapi import APIRouter
from app.analytics.store import get_analytics

router = APIRouter()

@router.get("/analytics")
def fetch_analytics():
    return {
        "events": get_analytics(),
        "total_events": len(get_analytics())
    }

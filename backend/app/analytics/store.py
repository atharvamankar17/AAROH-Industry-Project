# backend/app/analytics/store.py

from collections import Counter
from datetime import datetime

analytics_log = []

def log_event(event: dict):
    analytics_log.append({
        **event,
        "logged_at": datetime.utcnow().isoformat()
    })

def get_analytics():
    raaga_count = Counter(e["raaga"] for e in analytics_log)
    prahar_count = Counter(e["prahar"] for e in analytics_log)
    rasa_count = Counter(e["rasa"] for e in analytics_log if e["rasa"])

    return {
        "raaga_usage": raaga_count,
        "prahar_usage": prahar_count,
        "rasa_distribution": rasa_count,
        "total_events": len(analytics_log)
    }

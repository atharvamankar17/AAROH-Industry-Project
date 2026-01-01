from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")

def get_prahar_from_timestamp(timestamp: str) -> str:
    """
    Convert ISO timestamp → IST → return prahar
    """

    # Parse ISO timestamp
    dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))

    # Convert to 
    ist_time = dt.astimezone(IST)
    hour = ist_time.hour

    # DEBUG (keep this for now)
    print("IST TIME →", ist_time.strftime("%H:%M"))
    


# Determine fine prahar
    if 2 <= hour < 4:
        fine = "PRE_DAWN"
    elif 4 <= hour < 6:
        fine = "DAWN"
    elif 6 <= hour < 9:
        fine = "EARLY_MORNING"
    elif 9 <= hour < 12:
        fine = "LATE_MORNING"
    elif 12 <= hour < 16:
        fine = "AFTERNOON"
    elif 16 <= hour < 18:
        fine = "LATE_AFTERNOON"
    elif 18 <= hour < 21:
        fine = "EVENING"
    else:
        fine = "NIGHT"

    FINE_TO_COARSE_PRAHAR = {
    "PRE_DAWN": "NIGHT",
    "DAWN": "MORNING",
    "EARLY_MORNING": "MORNING",
    "LATE_MORNING": "MORNING",
    "AFTERNOON": "AFTERNOON",
    "LATE_AFTERNOON": "AFTERNOON",
    "EVENING": "EVENING",
    "NIGHT": "NIGHT",
}
    coarse = FINE_TO_COARSE_PRAHAR[fine]

    print("FINE PRAHAR →", fine)
    print("COARSE PRAHAR →", coarse)

    return coarse
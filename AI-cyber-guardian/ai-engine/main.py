from fastapi import FastAPI
from pydantic import BaseModel
from agents import detect_threat, calculate_risk, decide_action, generate_explanation

app = FastAPI()

class EmailRequest(BaseModel):
    email_content: str


@app.post("/analyze")
def analyze_email(request: EmailRequest):
    email_text = request.email_content

    # Agent 1
    found_keywords, suspicious_links = detect_threat(email_text)

    # Agent 2
    risk_score = calculate_risk(found_keywords, suspicious_links)

    # Agent 3
    action, threat_level = decide_action(risk_score)

    # Agent 4
    explanation = generate_explanation(found_keywords, suspicious_links)

    return {
        "risk_score": risk_score,
        "threat_level": threat_level,
        "action_taken": action,
        "explanation": explanation
    }
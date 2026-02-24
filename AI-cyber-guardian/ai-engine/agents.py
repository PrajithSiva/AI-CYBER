import re

# 🧠 Agent 1 – Threat Detection Agent
def detect_threat(email_text):
    phishing_keywords = [
        "urgent",
        "immediately",
        "verify",
        "bank",
        "password",
        "click",
        "account suspended"
    ]

    found_keywords = []

    for word in phishing_keywords:
        if word in email_text.lower():
            found_keywords.append(word)

    suspicious_links = re.findall(r"http[s]?://\S+", email_text)

    return found_keywords, suspicious_links


# 📊 Agent 2 – Risk Analysis Agent
def calculate_risk(found_keywords, suspicious_links):
    score = 0

    score += len(found_keywords) * 10
    score += len(suspicious_links) * 25

    if score > 100:
        score = 100

    return score


# ⚖ Agent 3 – Decision Agent
def decide_action(score):
    if score <= 30:
        return "Allow", "Low"
    elif score <= 70:
        return "Warn", "Medium"
    else:
        return "Block", "High"


# 📢 Agent 4 – Explanation Agent
def generate_explanation(found_keywords, suspicious_links):
    explanation = "The email contains "

    if found_keywords:
        explanation += f"suspicious keywords: {', '.join(found_keywords)}. "

    if suspicious_links:
        explanation += f"It also includes suspicious links."

    if not found_keywords and not suspicious_links:
        explanation += "no major phishing indicators."

    return explanation
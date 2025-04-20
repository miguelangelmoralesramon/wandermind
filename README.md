# 🗺️ WanderMind: The Multimodal Tourist Guide

## 📖 README

### Overview
**WanderMind** is a multimodal AI-powered tourist guide. It allows users to upload a **photo** or record a **voice message**, and the assistant will:
- Identify the location
- Provide historical and cultural information
- Suggest nearby attractions and places of interest

It leverages OpenAI's GPT-4 Vision, Whisper, and Tools API, offering an immersive, context-aware travel experience.

---

### 🚀 Features
- **Image-Based Recognition** using GPT-4-Vision
- **Voice-Based Interaction** via Whisper
- **Cultural & Historical Insights** from GPT-4
- **Nearby Recommendations** using OpenStreetMap data
- **Responsive UI** with Angular 21
- **Backend API** in Python 3.11

---

### 🧰 Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Angular 21 |
| Backend | Python 3.11 |
| AI Services | GPT-4-Vision, Whisper, OpenAI Tools API |
| Mapping | OpenStreetMap, geopy |
| Deployment | Hugging Face Spaces (optional) |

---

### 📦 Installation
```bash
git clone https://github.com/yourusername/wandermind.git
cd wandermind
```
#### Frontend (Angular)
```bash
cd frontend
npm install
ng serve
```
#### Backend (Python)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

### 📸 Example Usage
- **Upload a photo of a monument** → Response: "This is the Colosseum in Rome... Here are 3 places nearby you might enjoy."
- **Speak into mic: "Where am I? What should I see?"** → Voice transcribed, location inferred, recommendations returned

---

### 📍 Contribution
Feel free to fork and PR! Add new local datasets, enhance OSM queries, or contribute multilingual support.

---

### 📄 License
MIT License


# 🧱 Technical Architecture

## System Overview
WanderMind is composed of three major modules:
1. **Frontend** (Angular 21)
2. **Backend API** (Python 3.11)
3. **AI Services Layer** (OpenAI APIs + OpenStreetMap)

---

## 📊 Data Flow
```
User Input (Photo or Audio)
       ↓
Frontend (Upload + Geolocation)
       ↓
Backend (Python API)
       ↓
[Branch 1: Photo] → GPT-4-Vision → Landmark detection → Location & insights
[Branch 2: Voice] → Whisper → Transcription → GPT-4 + geolocation context
       ↓
OpenAI Tools API → Dynamic function calling for OpenStreetMap queries
       ↓
Final Response → Angular Frontend (Chat bubble + Optional map)
```

---

## 🧠 AI Pipeline
- **GPT-4-Vision**: Parses image content, infers location, extracts visual elements.
- **Whisper**: Transcribes voice notes to text.
- **GPT-4 + Tools API**: Handles user queries, context interpretation, and API tool usage.

---

## 🔧 APIs Used
- `OpenAI GPT-4-Vision` → `analyze_image()`
- `OpenAI Whisper` → `transcribe_audio()`
- `OpenAI GPT-4 Tools API` → `get_location_details()`, `fetch_nearby_places()`
- `OpenStreetMap` → Custom search & POI queries based on coordinates

---

## 🌍 Bonus: Hugging Face Spaces
- Demo deployment using `gradio` or `streamlit` + static Angular frontend
- Good for sharing lightweight MVPs or visual demos

---

## 📌 Extensibility Ideas
- Multilingual support for tourists
- Offline mode using cached data
- Local cultural databases (UNESCO, Wikipedia snippets)
- Smart itinerary builder (GPT + Maps + preferences)


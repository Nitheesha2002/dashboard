from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running successfully"}

@app.get("/metrics")
def get_metrics():
    return {
        "gearbox_temp": round(random.uniform(60,100),2),
        "vibration": round(random.uniform(0.2,1.5),2),
        "oil_pressure": round(random.uniform(20,50),2),
        "power_output": round(random.uniform(800,1500),2)
    }
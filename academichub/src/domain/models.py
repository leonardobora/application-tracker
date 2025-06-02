from typing import List
from pydantic import BaseModel, Field

class LifecycleStage(BaseModel):
    name: str
    owner: str

class OpportunityLifecycle(BaseModel):
    stages: List[LifecycleStage] = Field(default_factory=lambda: [
        LifecycleStage(name="Descoberta", owner="AI Agent"),
        LifecycleStage(name="Application", owner="Student"),
        LifecycleStage(name="Avaliação", owner="University"),
        LifecycleStage(name="Feedback", owner="AI Agent"),
    ])

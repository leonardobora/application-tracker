from typing import List, Dict
from fastapi import FastAPI, HTTPException, status
from domain.models import OpportunityLifecycle, LifecycleStage

app = FastAPI()

# In-memory "database" for lifecycle stages
# Initialize with default stages.
# Each stage is a LifecycleStage object.
db_stages: List[LifecycleStage] = [
    LifecycleStage(name="Descoberta", owner="AI Agent"),
    LifecycleStage(name="Application", owner="Student"),
    LifecycleStage(name="Avaliação", owner="University"),
    LifecycleStage(name="Feedback", owner="AI Agent"),
]

@app.get("/opportunities/lifecycle/", response_model=OpportunityLifecycle)
async def get_opportunity_lifecycle():
    """
    Retrieves the current opportunity lifecycle, constructed from the in-memory list of stages.
    """
    return OpportunityLifecycle(stages=db_stages)

@app.get("/opportunities/lifecycle/stages/", response_model=List[LifecycleStage])
async def get_all_lifecycle_stages():
    """
    Retrieves all individual lifecycle stages currently in memory.
    """
    return db_stages

@app.post("/opportunities/lifecycle/stages/", response_model=LifecycleStage, status_code=status.HTTP_201_CREATED)
async def create_lifecycle_stage(stage: LifecycleStage):
    """
    Adds a new lifecycle stage.
    Checks for duplicate names before adding.
    """
    for existing_stage in db_stages:
        if existing_stage.name == stage.name:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Lifecycle stage with name '{stage.name}' already exists."
            )
    db_stages.append(stage)
    return stage

@app.put("/opportunities/lifecycle/stages/{stage_name}", response_model=LifecycleStage)
async def update_lifecycle_stage(stage_name: str, updated_stage_data: LifecycleStage):
    """
    Updates an existing lifecycle stage identified by its name.
    The stage's name can also be updated via the request body.
    """
    stage_index = -1
    for i, s in enumerate(db_stages):
        if s.name == stage_name:
            stage_index = i
            break

    if stage_index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lifecycle stage with name '{stage_name}' not found."
        )

    # If the name in the body is different and that new name already exists (and it's not the current stage itself)
    if updated_stage_data.name != stage_name:
        for existing_stage in db_stages:
            if existing_stage.name == updated_stage_data.name:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"Lifecycle stage with name '{updated_stage_data.name}' already exists. Cannot rename."
                )

    db_stages[stage_index] = updated_stage_data
    return db_stages[stage_index]

@app.delete("/opportunities/lifecycle/stages/{stage_name}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lifecycle_stage(stage_name: str):
    """
    Deletes a lifecycle stage by its name.
    """
    stage_index = -1
    for i, s in enumerate(db_stages):
        if s.name == stage_name:
            stage_index = i
            break

    if stage_index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lifecycle stage with name '{stage_name}' not found."
        )

    db_stages.pop(stage_index)
    return # For 204 No Content, FastAPI expects no body

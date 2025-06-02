import pytest
import copy
from httpx import AsyncClient, ASGITransport

# Assuming the FastAPI app instance is named 'app' and located in 'academichub.src.application.api'
from application.api import app, db_stages as api_db_stages # Import the app and its db_stages
from domain.models import LifecycleStage, OpportunityLifecycle

# Default stages for resetting
DEFAULT_STAGES_DATA = [
    {"name": "Descoberta", "owner": "AI Agent"},
    {"name": "Application", "owner": "Student"},
    {"name": "Avaliação", "owner": "University"},
    {"name": "Feedback", "owner": "AI Agent"},
]

@pytest.fixture(autouse=True)
def reset_db_stages():
    """Resets the in-memory db_stages to its default state before each test."""
    global api_db_stages
    api_db_stages.clear()
    for stage_data in DEFAULT_STAGES_DATA:
        api_db_stages.append(LifecycleStage(**stage_data))
    yield # Test runs here
    # Teardown can be added here if needed, but clearing and repopulating is usually enough


@pytest.mark.asyncio
async def test_get_opportunity_lifecycle_default():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/opportunities/lifecycle/")
    assert response.status_code == 200
    data = response.json()
    assert len(data["stages"]) == 4
    assert data["stages"][0]["name"] == "Descoberta"
    # Quick check if it's a valid OpportunityLifecycle structure
    assert "stages" in data
    for stage in data["stages"]:
        assert "name" in stage
        assert "owner" in stage

@pytest.mark.asyncio
async def test_get_all_lifecycle_stages_default():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/opportunities/lifecycle/stages/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 4
    assert data[0]["name"] == "Descoberta"

@pytest.mark.asyncio
async def test_create_lifecycle_stage_success():
    new_stage_data = {"name": "Entrevista", "owner": "Hiring Manager"}
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/opportunities/lifecycle/stages/", json=new_stage_data)
    
    assert response.status_code == 201
    created_stage = response.json()
    assert created_stage["name"] == new_stage_data["name"]
    assert created_stage["owner"] == new_stage_data["owner"]

    # Verify it's added
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/opportunities/lifecycle/stages/")
    stages = response.json()
    assert len(stages) == 5 # 4 default + 1 new
    assert any(s["name"] == new_stage_data["name"] for s in stages)

@pytest.mark.asyncio
async def test_create_lifecycle_stage_conflict():
    existing_stage_data = {"name": "Descoberta", "owner": "AI Agent"} # Already exists
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/opportunities/lifecycle/stages/", json=existing_stage_data)
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]

@pytest.mark.asyncio
async def test_create_lifecycle_stage_invalid_payload():
    invalid_payload = {"owner": "Missing Name"} # Name is required
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/opportunities/lifecycle/stages/", json=invalid_payload)
    assert response.status_code == 422 # Unprocessable Entity for Pydantic validation errors

@pytest.mark.asyncio
async def test_update_lifecycle_stage_success_change_owner():
    stage_to_update_name = "Application"
    update_data = {"name": "Application", "owner": "Recruiter"} # Changing owner
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{stage_to_update_name}", json=update_data)
    
    assert response.status_code == 200
    updated_stage = response.json()
    assert updated_stage["name"] == update_data["name"]
    assert updated_stage["owner"] == update_data["owner"]

    # Verify change in the list
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response_get = await ac.get("/opportunities/lifecycle/stages/")
    stages = response_get.json()
    found_stage = next(s for s in stages if s["name"] == stage_to_update_name)
    assert found_stage["owner"] == update_data["owner"]

@pytest.mark.asyncio
async def test_update_lifecycle_stage_success_rename():
    stage_to_update_name = "Avaliação"
    update_data = {"name": "Technical Assessment", "owner": "University"} # Renaming
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{stage_to_update_name}", json=update_data)
        
    assert response.status_code == 200
    updated_stage = response.json()
    assert updated_stage["name"] == update_data["name"]
    assert updated_stage["owner"] == update_data["owner"]

    # Verify rename
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response_get = await ac.get("/opportunities/lifecycle/stages/")
    stages = response_get.json()
    assert not any(s["name"] == stage_to_update_name for s in stages) # Old name gone
    assert any(s["name"] == update_data["name"] for s in stages)     # New name present

@pytest.mark.asyncio
async def test_update_lifecycle_stage_rename_conflict():
    stage_to_update_name = "Avaliação"
    # Try to rename "Avaliação" to "Descoberta", which already exists
    update_data = {"name": "Descoberta", "owner": "University"} 
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{stage_to_update_name}", json=update_data)
    
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]

@pytest.mark.asyncio
async def test_update_lifecycle_stage_not_found():
    non_existent_name = "NonExistentStage"
    update_data = {"name": "NonExistentStage", "owner": "Nobody"}
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{non_existent_name}", json=update_data)
    assert response.status_code == 404

@pytest.mark.asyncio
async def test_update_lifecycle_stage_invalid_payload():
    stage_to_update_name = "Application"
    invalid_payload = {"owner": "Only Owner"} # Missing name
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{stage_to_update_name}", json=invalid_payload)
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_delete_lifecycle_stage_success():
    stage_to_delete_name = "Feedback"
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.delete(f"/opportunities/lifecycle/stages/{stage_to_delete_name}")
    assert response.status_code == 204

    # Verify deletion
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response_get = await ac.get("/opportunities/lifecycle/stages/")
    stages = response_get.json()
    assert len(stages) == 3 # 4 default - 1 deleted
    assert not any(s["name"] == stage_to_delete_name for s in stages)

@pytest.mark.asyncio
async def test_delete_lifecycle_stage_not_found():
    non_existent_name = "NonExistentStage"
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.delete(f"/opportunities/lifecycle/stages/{non_existent_name}")
    assert response.status_code == 404

# A more robust fixture to ensure `api_db_stages` is a distinct copy for modification tests
@pytest.fixture
def fresh_db_stages():
    original_stages = [LifecycleStage(**data) for data in DEFAULT_STAGES_DATA]
    
    # Monkeypatch api_db_stages for the duration of a test
    # This is a bit more involved if api_db_stages is imported directly
    # For simplicity, the global fixture `reset_db_stages` is used for all tests.
    # If more fine-grained control or true isolation without global state modification is needed,
    # dependency injection in FastAPI or more complex patching would be required.
    # The current `reset_db_stages` autouse fixture handles the reset adequately for these tests.
    pass # This fixture is more of a conceptual note for advanced scenarios.
         # The `reset_db_stages` autouse=True fixture should cover current needs.

# Example of testing the OpportunityLifecycle response model (can be expanded)
@pytest.mark.asyncio
async def test_get_opportunity_lifecycle_model_validation():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/opportunities/lifecycle/")
    assert response.status_code == 200
    # Pydantic model validation would happen when OpportunityLifecycle(**response.json()) is called.
    # FastAPI does this automatically for response_model.
    # Here, we just check the structure again.
    data = response.json()
    assert OpportunityLifecycle(**data) # This will raise ValidationError if structure is wrong
    assert len(data["stages"]) == len(DEFAULT_STAGES_DATA)

# Test PUT when stage_name in path and body are the same (no rename attempt)
@pytest.mark.asyncio
async def test_update_lifecycle_stage_success_no_rename():
    stage_to_update_name = "Application"
    update_data = {"name": "Application", "owner": "New Owner For Application"}
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{stage_to_update_name}", json=update_data)
    
    assert response.status_code == 200
    updated_stage = response.json()
    assert updated_stage["name"] == update_data["name"]
    assert updated_stage["owner"] == update_data["owner"]

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response_get = await ac.get(f"/opportunities/lifecycle/stages/")
    stages = response_get.json()
    found_stage = next(s for s in stages if s["name"] == stage_to_update_name)
    assert found_stage["owner"] == update_data["owner"]

# Test PUT where name in body is different, but it's the same as the original path parameter (should not conflict with itself)
@pytest.mark.asyncio
async def test_update_lifecycle_stage_rename_to_self_allowed():
    stage_to_update_name = "Application"
    update_data = {"name": "Application", "owner": "Owner Updated Again"} # name is same as path param
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.put(f"/opportunities/lifecycle/stages/{stage_to_update_name}", json=update_data)
        
    assert response.status_code == 200
    updated_stage = response.json()
    assert updated_stage["name"] == stage_to_update_name
    assert updated_stage["owner"] == update_data["owner"]

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response_get = await ac.get(f"/opportunities/lifecycle/stages/")
    stages = response_get.json()
    found_stage = next(s for s in stages if s["name"] == stage_to_update_name)
    assert found_stage["owner"] == update_data["owner"]

# Test that an empty list of stages can be retrieved if db_stages is empty
@pytest.mark.asyncio
async def test_get_all_lifecycle_stages_empty():
    global api_db_stages
    api_db_stages.clear() # Manually clear for this specific test after fixture setup
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/opportunities/lifecycle/stages/")
    assert response.status_code == 200
    assert response.json() == []

    # Also check the main lifecycle endpoint
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/opportunities/lifecycle/")
    assert response.status_code == 200
    assert response.json() == {"stages": []}
    # reset_db_stages fixture will repopulate for the next test

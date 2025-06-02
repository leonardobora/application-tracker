import pytest
from pydantic import ValidationError
from domain.models import LifecycleStage, OpportunityLifecycle

class TestLifecycleStage:
    def test_create_lifecycle_stage_success(self):
        stage = LifecycleStage(name="Discovery", owner="AI Agent")
        assert stage.name == "Discovery"
        assert stage.owner == "AI Agent"

    def test_create_lifecycle_stage_missing_name(self):
        with pytest.raises(ValidationError) as excinfo:
            LifecycleStage(owner="AI Agent")
        assert "name" in str(excinfo.value)

    def test_create_lifecycle_stage_missing_owner(self):
        with pytest.raises(ValidationError) as excinfo:
            LifecycleStage(name="Discovery")
        assert "owner" in str(excinfo.value)

    def test_create_lifecycle_stage_invalid_types(self):
        with pytest.raises(ValidationError):
            LifecycleStage(name=123, owner=456) # type: ignore
        with pytest.raises(ValidationError):
            LifecycleStage(name="Test", owner=None) # type: ignore


class TestOpportunityLifecycle:
    def test_create_opportunity_lifecycle_default_stages(self):
        lifecycle = OpportunityLifecycle()
        assert len(lifecycle.stages) == 4
        
        expected_stages = [
            {"name": "Descoberta", "owner": "AI Agent"},
            {"name": "Application", "owner": "Student"},
            {"name": "Avaliação", "owner": "University"},
            {"name": "Feedback", "owner": "AI Agent"},
        ]

        for i, stage in enumerate(lifecycle.stages):
            assert stage.name == expected_stages[i]["name"]
            assert stage.owner == expected_stages[i]["owner"]
            assert isinstance(stage, LifecycleStage)

    def test_create_opportunity_lifecycle_custom_stages(self):
        custom_stages_data = [
            {"name": "Custom 1", "owner": "Owner 1"},
            {"name": "Custom 2", "owner": "Owner 2"},
        ]
        custom_stages = [LifecycleStage(**data) for data in custom_stages_data]
        
        lifecycle = OpportunityLifecycle(stages=custom_stages)
        assert len(lifecycle.stages) == 2
        assert lifecycle.stages[0].name == "Custom 1"
        assert lifecycle.stages[0].owner == "Owner 1"
        assert lifecycle.stages[1].name == "Custom 2"
        assert lifecycle.stages[1].owner == "Owner 2"
        for stage in lifecycle.stages:
            assert isinstance(stage, LifecycleStage)

    def test_opportunity_lifecycle_stages_list_item_invalid_dict(self):
        # Test with a list containing a dict that cannot be coerced to LifecycleStage
        # e.g., 'name' is an integer instead of a string
        with pytest.raises(ValidationError) as excinfo:
            OpportunityLifecycle(stages=[{"name": 123, "owner": "Invalid Owner"}]) # type: ignore
        assert "stages" in str(excinfo.value) # Check that the error is related to the 'stages' field
        # More specific check for Pydantic V2: error message will indicate validation error for an item in the list
        assert "Input should be a valid string" in str(excinfo.value) or "value is not a valid string" in str(excinfo.value)

    def test_opportunity_lifecycle_stages_empty_list(self):
        lifecycle = OpportunityLifecycle(stages=[])
        assert len(lifecycle.stages) == 0

    def test_opportunity_lifecycle_stages_not_a_list(self):
        with pytest.raises(ValidationError) as excinfo:
            OpportunityLifecycle(stages="not a list") # type: ignore
        assert "stages" in str(excinfo.value)

    def test_opportunity_lifecycle_stages_list_with_invalid_item_type(self):
        with pytest.raises(ValidationError) as excinfo:
            OpportunityLifecycle(stages=[LifecycleStage(name="Valid", owner="Valid"), "not a stage object"]) # type: ignore
        # This will error because the list items must all be LifecycleStage
        # The error message might point to the specific problematic item in the list
        assert "stages" in str(excinfo.value)

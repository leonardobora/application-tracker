[Leia em Português do Brasil (Read in Brazilian Portuguese)](README_pt-BR.md)

# AcademicHub

## Overview

AcademicHub is a system designed to help students navigate and apply for academic opportunities. It leverages AI-driven insights and automation to streamline the discovery and application process for programs, scholarships, and other academic advancements.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
  - [Linux/macOS](#development-setup-linuxmacos)
  - [Windows](#development-setup-windows)
  - [GitHub Codespaces](#github-codespaces)
- [API Endpoints Overview](#api-endpoints-overview)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Docker Usage](#docker-usage)
- [Contributing](#contributing)

## Features

*   **Opportunity Lifecycle Management:** Core functionality to define and manage the stages involved in an academic opportunity lifecycle (e.g., Discovery, Application, Evaluation, Feedback).
*   **AI-Powered Insights (Future):** Planned features include AI-driven recommendations, essay validation, and personalized guidance.
*   **Common Application Integration (Future):** Future capabilities aim to simplify applications by integrating with common application platforms.
*   **Automated Document Processing (Future):** Plans to include automated parsing and validation of academic documents.

## Project Structure

The project is organized as follows:

```
academichub/
├── .git/                     # Git version control files
├── .github/                  # GitHub specific files
│   └── workflows/            # GitHub Actions CI/CD pipeline configurations
│       └── main.yml          # Main CI workflow
├── docs/                     # Project documentation
│   └── technical_decisions/  # ADRs and technical decision records
│       └── template_decision_record.tex # LaTeX template for ADRs
├── frontend_prototype/       # Initial HTML/CSS/JS prototype (not integrated with backend yet)
│   ├── app.js
│   ├── index.html
│   └── style.css
├── src/                      # Main Python application source code
│   ├── __init__.py
│   ├── application/          # API endpoint definitions and application-level logic
│   │   ├── __init__.py
│   │   └── api.py            # FastAPI routes for OpportunityLifecycle
│   ├── domain/               # Core domain models (Pydantic)
│   │   ├── __init__.py
│   │   └── models.py         # Pydantic models for OpportunityLifecycle, LifecycleStage
│   └── main.py               # FastAPI application entry point (runs with uvicorn)
├── tests/                    # Pytest unit and integration tests
│   ├── __init__.py
│   ├── application/          # API endpoint tests
│   │   └── test_api.py
│   └── domain/               # Domain model tests
│       └── test_models.py
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── Dockerfile                # Defines the Docker image for the application
├── docker-compose.yml        # Configuration for local development using Docker Compose
├── pytest.ini                # Configuration for pytest (test paths, pythonpath)
├── README.md                 # This file: project overview and developer guide
└── requirements.txt          # Python package dependencies
```

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Git:** For version control.
*   **Python:** Version 3.12 is recommended.
*   **Docker and Docker Compose:** (or Docker Desktop) For containerized development and deployment.
*   **An IDE:** A code editor like VSCode with Python support is highly recommended.

## Development Setup

### Development Setup (Linux/macOS)

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> 
    # Replace <repository_url> with the actual URL of the repository
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd academichub
    ```
3.  **Create a Python virtual environment:**
    ```bash
    python3 -m venv venv
    ```
4.  **Activate the virtual environment:**
    ```bash
    source venv/bin/activate
    ```
5.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
6.  **Running the Application (Directly with Uvicorn):**
    The application uses FastAPI and can be run locally with Uvicorn. This provides live reloading for development.
    ```bash
    uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
    ```
    The API will be available at `http://localhost:8000`.

7.  **Running the Application (with Docker Compose):**
    This is the recommended way for a consistent development environment.
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:8000`. Docker Compose handles live reloading of the `src` directory.
    *Note:* If you see a warning about `COMPOSE_BAKE`, you can optionally set the environment variable `COMPOSE_BAKE=true` for potentially faster builds using Docker's experimental Bake feature.

8.  **Running Tests:**
    Ensure your virtual environment is activated or Docker environment is up.
    ```bash
    pytest
    ```

### Development Setup (Windows)

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    # Replace <repository_url> with the actual URL of the repository
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd academichub
    ```
3.  **Create a Python virtual environment:**
    ```bash
    python -m venv venv
    ```
4.  **Activate the virtual environment:**
    ```bash
    .\venv\Scripts\activate
    ```
5.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
6.  **Running the Application (Directly with Uvicorn):**
    ```bash
    uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
    ```
    The API will be available at `http://localhost:8000`.

7.  **Running the Application (with Docker Compose):**
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:8000`.
    *Note:* If you see a warning about `COMPOSE_BAKE`, you can optionally set the environment variable `COMPOSE_BAKE=true` for potentially faster builds using Docker's experimental Bake feature.

8.  **Running Tests:**
    ```bash
    pytest
    ```

### GitHub Codespaces

*   This project is configured to work with GitHub Codespaces.
*   When you open this repository in a Codespace, the development environment should be largely pre-configured.
*   Follow the standard "Development Setup (Linux/macOS)" instructions for running the application and tests within the Codespaces terminal.
*   The necessary Docker and Python versions are typically available in default Codespaces environments. If you encounter issues, ensure your Codespace configuration provides them.
*   Port forwarding for the application (port 8000) should be automatically handled by Codespaces when you run `docker-compose up` or `uvicorn`.

## API Endpoints Overview

The AcademicHub API provides endpoints for managing various aspects of academic opportunities. When the application is running, interactive API documentation is available via:

*   **Swagger UI:** `http://localhost:8000/docs`
*   **ReDoc:** `http://localhost:8000/redoc`

### Key Endpoints for `OpportunityLifecycle`

These endpoints manage the stages of an academic opportunity:

*   `GET /opportunities/lifecycle/`: Retrieves the complete current opportunity lifecycle (all stages).
*   `GET /opportunities/lifecycle/stages/`: Retrieves a list of all individual lifecycle stages.
*   `POST /opportunities/lifecycle/stages/`: Adds a new lifecycle stage.
    *   *Body:* `LifecycleStage` object (e.g., `{"name": "New Stage", "owner": "Admin"}`)
*   `PUT /opportunities/lifecycle/stages/{stage_name}`: Updates an existing lifecycle stage identified by `stage_name`.
    *   *Body:* `LifecycleStage` object with new details (e.g., `{"name": "Updated Stage Name", "owner": "New Owner"}`)
*   `DELETE /opportunities/lifecycle/stages/{stage_name}`: Deletes a lifecycle stage by its name.

## Testing

*   Unit and integration tests are written using the `pytest` framework.
*   Tests are located in the `tests/` directory, mirroring the `src/` structure (`tests/domain` for domain model tests, `tests/application` for API tests).
*   To run all tests, execute the following command from the project root directory:
    ```bash
    pytest
    ```
*   Current test coverage includes the core domain models (`LifecycleStage`, `OpportunityLifecycle`) and the API endpoints for lifecycle management.

## CI/CD

*   Continuous Integration (CI) is managed by GitHub Actions. The workflow is defined in `.github/workflows/main.yml`.
*   The current CI pipeline performs the following steps on every push or pull request to the `main` branch:
    1.  Sets up the Python environment.
    2.  Installs project dependencies from `requirements.txt`.
    3.  Lints the codebase using `flake8` to check for code style and potential errors.
        *   Critical issues (syntax errors, undefined names) will fail the build.
        *   Other style issues are reported as warnings.
    4.  Runs the `pytest` test suite to ensure all tests pass.

## Docker Usage

The application is containerized using Docker for consistent development and deployment environments.

*   **Build the Docker image:**
    ```bash
    docker build -t academichub .
    ```
*   **Run the Docker container (after building):**
    ```bash
    docker run -p 8000:8000 academichub
    ```
    This will start the application, and it will be accessible at `http://localhost:8000`.

*   **Development with Docker Compose (Recommended):**
    For local development, `docker-compose` is configured to provide live reloading of code changes.
    ```bash
    docker-compose up --build
    ```
    This command builds the image (if not already built or if Dockerfile changed) and starts the service. The API will be available at `http://localhost:8000`.
    *Note:* If you see a warning about `COMPOSE_BAKE`, you can optionally set the environment variable `COMPOSE_BAKE=true` for potentially faster builds using Docker's experimental Bake feature.


## Contributing

Contributions are welcome! If you'd like to contribute, please follow these general steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (e.g., `git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3.  Make your changes and commit them with clear, descriptive messages.
4.  Ensure your code adheres to the project's style guidelines (run `flake8`).
5.  Write or update tests for your changes and ensure all tests pass (`pytest`).
6.  Push your branch to your fork.
7.  Submit a Pull Request (PR) to the `main` branch of the original repository.

Please provide a clear description of your changes in the PR.

---
*This README is a living document and will be updated as the project evolves.*

# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the container
# Initially, copy only what's needed to install dependencies, then copy the rest.
# This helps with Docker layer caching.
# Copy requirements first to leverage Docker cache for dependencies.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set PYTHONPATH to include the /app directory (where src is located)
ENV PYTHONPATH="/app:${PYTHONPATH}"

# Define the command to run the application
# This command will be used if `docker run` is used without a command.
# For docker-compose, the command there might override this.
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]

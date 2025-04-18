# Image from dockerhub
FROM python:3.10-slim

# Expose port
EXPOSE 8000

# Make /code as a working directory in the container
WORKDIR /code

# requirements from host, to docker container in /app
COPY ./requirements.txt /code/requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy everything from api, database, and frontend
COPY ./api /code/api/
COPY ./database /code/database

# Run the application
CMD ["fastapi", "run", "./api/run_api.py", "--port", "8000"]
# Stage 1: Build the React frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend

# Copy package files first for caching
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

# Copy the rest of the frontend source
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Python backend
FROM python:3.12-slim
WORKDIR /app

# Install system deps for lxml (python-docx dependency)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libxml2-dev libxslt1-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend app
COPY . .

# Copy the built frontend from Stage 1 into frontend_dist
COPY --from=build-frontend /app/frontend/dist /app/frontend_dist

# Create output directory for generated materials
RUN mkdir -p output

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

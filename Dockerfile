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

# Copy app
COPY . .

# Create output directory
RUN mkdir -p output

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

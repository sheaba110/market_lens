FROM python:3.12-slim

WORKDIR /app_backend

# Install system dependencies (Using apt-get for Debian-based slim image)
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django application
COPY . .

# Expose the port
EXPOSE 8000

# Migrations are created during development and applied at deployment time.
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]

FROM python:3.11-slim

WORKDIR /app_backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/* \
    apk add --update --upgrade --no-cache postgresql-client \ 
    apk add --update --upgrade --no-cache --virtual .tmp \
        postgresql-dev 


# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && apk del .tmp

# Copy the Django application
COPY . .

# Expose the port
EXPOSE 8000

# Run migrations and start the Django development server
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

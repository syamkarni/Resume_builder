
FROM python:3.8-slim

WORKDIR /app


RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*


COPY . /app


RUN pip install --trusted-host pypi.python.org -r requirements.txt


EXPOSE 5000


ENV NAME World


CMD ["python", "app.py"]

FROM python:3.11-slim

# システムパッケージのアップデートとクリーンアップを1レイヤーで実行
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# 本番環境では0.0.0.0:8000でバインドする
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

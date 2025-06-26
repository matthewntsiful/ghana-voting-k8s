FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install flask redis
EXPOSE 80
CMD ["python", "app.py"]
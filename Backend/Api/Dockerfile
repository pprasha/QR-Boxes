FROM python:3.7

# RUN pip install fastapi uvicorn

EXPOSE 8000

ADD . /api

WORKDIR /api

RUN pip install -r requirements.txt

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
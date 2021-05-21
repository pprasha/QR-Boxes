from typing import Optional

from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import text

engine = create_engine('mysql+mysqlconnector://qr_boxes:9PszVpg%QipJ4*p@zS6$gph&g%Qi@db/qr_boxes')

con = engine#.connect() 

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://127.0.0.1:3000",
    "127.0.0.1:3000",
    "http://192.168.0.119:3000",
    "192.168.0.119:3000",
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# sql injection detection function
def check(string):
  if "SELECT" in string or "--" in string or ";" in string or "select" in string:
    return False
  else:
    return True  

@app.get("/box/{box_id}")
def read_item(box_id):
    if check(box_id) == False:
        return ["error", "Invalied ID (700)"]
    else:
        items = con.execute("SELECT list_box_data FROM box WHERE box_id=\"" + box_id + "\";")
        items = items.fetchone()
        items = items[0]
        return {items}

class Items(BaseModel):
    list: list

@app.post("/items/")
def create_qr_code(items: Items):
    # print(items)
    if check(items) == False:
        return ["error", "Invalied ID (700)"]
    else:
        box_id = con.execute("SELECT UUID();")
        box_id = box_id.fetchone()
        box_id = box_id[0]
        box_id = box_id[0:8]
        # print(box_id)
        items = str(items)[5:]
        con.execute("INSERT INTO box (box_id, list_box_data, created_time, updated_time) VALUES (\"" + str(box_id) + "\" , \"" + str(items) + "\", now(), now());")
        # print(items, box_id)
        return {box_id}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/signup/oauth")
def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

# class Oauth(BaseModel):
#     name: str
#     email: str
#     phoneNumber: Optional[str] = None
#     oauthProvider: str
#     oauthProviderId: int
#     profilePic: str

# @app.post("/signup/oauth")
# def login(oauth: Oauth):
#     return {"username": oauth}

# @app.post("/signup/email")
# def login(username: str = Form(...), password: str = Form(...)):
#     return {"username": username}

# box_id = con.execute("SELECT box_id From data WHERE list_data=\"" + str(items) +"\";")
# for row in result:
#     print(row)
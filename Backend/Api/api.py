from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine

engine = create_engine('mysql+mysqlconnector://qr_boxes:9PszVpg%QipJ4*p@zS6$gph&g%Qi@localhost/qr_boxes')

con = engine#.connect() 

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
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
        con.execute("INSERT INTO data (box_id, list_data, created_at, updated_at) VALUES (\"" + str(box_id) + "\" , \"" + str(items) + "\", now(), now());")
        print(items, box_id)
        return {"box_id:" + box_id}

# box_id = con.execute("SELECT box_id From data WHERE list_data=\"" + str(items) +"\";")
# for row in result:
#     print(row)
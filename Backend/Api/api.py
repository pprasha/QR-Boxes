from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import jwt

# import requests as req

import uuid

from sqlalchemy import create_engine
from sqlalchemy.sql.expression import true
# from sqlalchemy.sql.expression import text
from google.oauth2 import id_token
from google.auth.transport import requests

engine = create_engine('mysql+mysqlconnector://qr_boxes:9PszVpg%QipJ4*p@zS6$gph&g%Qi@db/qr_boxes')

con = engine#.connect() 

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "localhost:3000",
    "http://127.0.0.1:3000",
    "https://127.0.0.1:3000",
    "127.0.0.1:3000",
    "http://192.168.0.119:3000",
    "https://192.168.0.119:3000",
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
        # return ["Error", "SQL Injection Detected"]
        raise HTTPException(status_code=405, detail="SQL injection detected.")
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
    if check(items.list) == False:
        # return ["Error", "SQL Injection Detected"]
        raise HTTPException(status_code=405, detail="SQL injection detected.")
    else:
        box_id = con.execute("SELECT UUID();")
        box_id = box_id.fetchone()
        box_id = box_id[0]
        box_id = box_id[0:8]
        # print(box_id)
        # items = str(items)[5:]
        con.execute("INSERT INTO box (box_id, list_box_data, created_time, updated_time) VALUES (\"" + str(box_id) + "\" , \"" + str(items) + "\", now(), now());")
        # print(items, box_id)
        return {box_id}

class Oauth(BaseModel):
    provider: str
    tokenId: Optional[str] = None

@app.post("/signup/oauth")
def oauth_signup(oauth: Oauth):
    if oauth.provider == "Google":
        request = requests.Request()

        id_info = id_token.verify_oauth2_token(oauth.tokenId, request, '463592647963-sj2gq0f9vo9d2l0vgn53bt7p1phnb061.apps.googleusercontent.com')
        if id_info["sub"].isnumeric() == False:
            # return ["Error", "SQL Injection Detected"]
            raise HTTPException(status_code=405, detail="SQL injection detected.")
        else:
            checkUserEmail = con.execute("SELECT oauth_provider_user_id FROM user WHERE oauth_provider_user_id = {};".format(id_info["sub"]))
            checkUserEmail = checkUserEmail.fetchone()
            print(checkUserEmail)
            if checkUserEmail == None:
                user_id = uuid.uuid1().int
                # profilePic = req.get(id_info["picture"], allow_redirects=True)
                # profilePic = profilePic.content
                con.execute("INSERT INTO user (user_id, user_name, name, email, oauth_provider, oauth_provider_user_id, profile_pic, boxes, subscription_id, active, created_time, updated_time) VALUES({}, \"{}\", \"{}\", \"{}\", \"{}\", {}, \"{}\", {}, {}, \"{}\", now(), now());".format(user_id, (id_info["given_name"] + id_info["family_name"][0] + str(user_id)[0:5]).lower(), id_info["name"], id_info["email"], "Google", id_info["sub"], id_info["picture"], 0, 123456, "true"))
                # con.execute("INSERT INTO `qr_boxes`.`user`(`user_id`,`user_name`,`name`,`email`,`phone_number`,`password`,`oauth_provider`,`oauth_provider_user_id`,`oauth_access_token`,`profile_pic`,`boxes`,`subscription_id`,`active`,`created_time`,`updated_time`) VALUES(%i, %s, %s, %s, %s, %i, %s, %s, %i, %b, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);" %(int(user_id), id_info["given_name"] + id_info["family_name"][0] + str(user_id)[0:5], id_info["name"], id_info["email"], "Google", int(id_info["sub"]), oauth.accessToken, id_info["picture"], 0, true))
                return {"status: success"}
            else:
                # return {"Error: User already Exists."}
                raise HTTPException(status_code=402, detail="User already exists.")
            # print(id_info)
    elif oauth.provider == "Facebook":
        return
    else:
        raise HTTPException(status_code=403, detail="Oauth error. Contact support for assistance.")
    return {id_info}

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
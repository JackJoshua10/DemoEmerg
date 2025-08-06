from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import os
from motor.motor_asyncio import AsyncIOMotorClient
import uuid
from datetime import datetime
import jwt
from passlib.context import CryptContext

app = FastAPI(title="La Carreta Restaurant API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "la-carreta-secret-key-2024"

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client.la_carreta_db

# Pydantic models
class Category(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    image_url: Optional[str] = None

class MenuItem(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    price: float
    category_id: str
    image_url: Optional[str] = None
    available: bool = True

class CartItem(BaseModel):
    menu_item_id: str
    quantity: int
    special_instructions: Optional[str] = None

class Order(BaseModel):
    id: Optional[str] = None
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    items: List[CartItem]
    total_amount: float
    status: str = "pending"
    created_at: Optional[datetime] = None
    special_instructions: Optional[str] = None

class Admin(BaseModel):
    username: str
    password: str

# Authentication functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Basic routes
@app.get("/")
async def root():
    return {"message": "La Carreta Restaurant API"}

@app.get("/api/health")
async def health():
    return {"status": "healthy", "restaurant": "La Carreta"}

# Categories endpoints
@app.get("/api/categories", response_model=List[Category])
async def get_categories():
    categories = []
    async for category in db.categories.find():
        category["id"] = category["_id"]
        del category["_id"]
        categories.append(Category(**category))
    return categories

@app.post("/api/categories", response_model=Category)
async def create_category(category: Category, admin: dict = Depends(verify_token)):
    category_dict = category.dict()
    category_dict["_id"] = str(uuid.uuid4())
    await db.categories.insert_one(category_dict)
    category_dict["id"] = category_dict["_id"]
    del category_dict["_id"]
    return Category(**category_dict)

# Menu items endpoints
@app.get("/api/menu", response_model=List[MenuItem])
async def get_menu():
    menu_items = []
    async for item in db.menu_items.find():
        item["id"] = item["_id"]
        del item["_id"]
        menu_items.append(MenuItem(**item))
    return menu_items

@app.get("/api/menu/category/{category_id}", response_model=List[MenuItem])
async def get_menu_by_category(category_id: str):
    menu_items = []
    async for item in db.menu_items.find({"category_id": category_id}):
        item["id"] = item["_id"]
        del item["_id"]
        menu_items.append(MenuItem(**item))
    return menu_items

@app.post("/api/menu", response_model=MenuItem)
async def create_menu_item(item: MenuItem, admin: dict = Depends(verify_token)):
    item_dict = item.dict()
    item_dict["_id"] = str(uuid.uuid4())
    await db.menu_items.insert_one(item_dict)
    item_dict["id"] = item_dict["_id"]
    del item_dict["_id"]
    return MenuItem(**item_dict)

# Orders endpoints
@app.post("/api/orders", response_model=Order)
async def create_order(order: Order):
    order_dict = order.dict()
    order_dict["_id"] = str(uuid.uuid4())
    order_dict["created_at"] = datetime.now()
    await db.orders.insert_one(order_dict)
    order_dict["id"] = order_dict["_id"]
    del order_dict["_id"]
    return Order(**order_dict)

@app.get("/api/orders", response_model=List[Order])
async def get_orders(admin: dict = Depends(verify_token)):
    orders = []
    async for order in db.orders.find():
        order["id"] = order["_id"]
        del order["_id"]
        orders.append(Order(**order))
    return orders

# Admin authentication
@app.post("/api/admin/login")
async def admin_login(admin: Admin):
    # Simple admin check - in production, use proper user management
    if admin.username == "admin" and admin.password == "lacarreta2024":
        token = create_access_token({"username": admin.username, "role": "admin"})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
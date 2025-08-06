import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
import uuid

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def init_database():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.la_carreta_db
    
    # Clear existing data
    await db.categories.delete_many({})
    await db.menu_items.delete_many({})
    
    # Create categories
    categories_data = [
        {
            "_id": "entradas",
            "name": "Entradas",
            "description": "Deliciosos aperitivos para comenzar tu experiencia gastronómica",
            "image_url": None
        },
        {
            "_id": "platos-principales",
            "name": "Platos Principales", 
            "description": "Los sabores auténticos del Perú en cada platillo principal",
            "image_url": None
        },
        {
            "_id": "ceviches",
            "name": "Ceviches",
            "description": "Frescos ceviches preparados con pescado del día",
            "image_url": None
        },
        {
            "_id": "postres",
            "name": "Postres",
            "description": "Dulces tradicionales peruanos para finalizar tu comida",
            "image_url": None
        },
        {
            "_id": "bebidas",
            "name": "Bebidas",
            "description": "Refrescantes bebidas peruanas y tradicionales",
            "image_url": None
        }
    ]
    
    # Insert categories
    await db.categories.insert_many(categories_data)
    print("✅ Categories inserted successfully")
    
    # Create menu items
    menu_items_data = [
        # ENTRADAS
        {
            "_id": str(uuid.uuid4()),
            "name": "Papa a la Huancaína",
            "description": "Papas amarillas bañadas en salsa de ají amarillo con queso fresco",
            "price": 12.00,
            "category_id": "entradas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Anticuchos de Corazón",
            "description": "Brochetas de corazón de res marinadas en ají panca, servidas con papas cocidas",
            "price": 15.00,
            "category_id": "entradas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Causa Limeña",
            "description": "Puré de papa amarilla rellena con pollo, palta y mayonesa",
            "price": 14.00,
            "category_id": "entradas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Tamales Peruanos",
            "description": "Masa de maíz rellena con pollo o cerdo, envuelta en hojas de plátano",
            "price": 10.00,
            "category_id": "entradas",
            "image_url": None,
            "available": True
        },
        
        # CEVICHES
        {
            "_id": str(uuid.uuid4()),
            "name": "Ceviche de Pescado",
            "description": "Pescado fresco marinado en limón con cebolla roja, cilantro y ají",
            "price": 25.00,
            "category_id": "ceviches",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Ceviche Mixto",
            "description": "Pescado, camarones, pulpo y chicharrón de calamar en leche de tigre",
            "price": 32.00,
            "category_id": "ceviches",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Tiradito de Lenguado",
            "description": "Finas láminas de lenguado bañadas en ají amarillo y limón",
            "price": 28.00,
            "category_id": "ceviches",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Leche de Tigre",
            "description": "El jugo del ceviche servido como shot energizante",
            "price": 8.00,
            "category_id": "ceviches",
            "image_url": None,
            "available": True
        },
        
        # PLATOS PRINCIPALES
        {
            "_id": str(uuid.uuid4()),
            "name": "Lomo Saltado",
            "description": "Tiras de lomo saltadas con cebolla, tomate, papas fritas y arroz",
            "price": 28.00,
            "category_id": "platos-principales",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Ají de Gallina",
            "description": "Pollo deshilachado en cremosa salsa de ají amarillo con nueces",
            "price": 22.00,
            "category_id": "platos-principales",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Arroz con Pollo",
            "description": "Arroz verde con pollo tierno, cilantro y arvejas",
            "price": 20.00,
            "category_id": "platos-principales",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Pollo a la Brasa",
            "description": "Pollo entero marinado y asado a la brasa, con papas y ensalada",
            "price": 35.00,
            "category_id": "platos-principales",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Cabrito Norteño",
            "description": "Tierno cabrito guisado con frejoles y arroz",
            "price": 32.00,
            "category_id": "platos-principales",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Rocoto Relleno",
            "description": "Rocoto relleno con carne molida, pasas y queso, gratinado",
            "price": 24.00,
            "category_id": "platos-principales",
            "image_url": None,
            "available": True
        },
        
        # POSTRES
        {
            "_id": str(uuid.uuid4()),
            "name": "Suspiro a la Limeña",
            "description": "Dulce de leche con merengue de port y canela",
            "price": 8.00,
            "category_id": "postres",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Mazamorra Morada",
            "description": "Postre tradicional de maíz morado con frutas",
            "price": 7.00,
            "category_id": "postres",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Picarones",
            "description": "Buñuelos de zapallo y camote con miel de chancaca",
            "price": 9.00,
            "category_id": "postres",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Tres Leches",
            "description": "Bizcocho empapado en tres leches con canela",
            "price": 10.00,
            "category_id": "postres",
            "image_url": None,
            "available": True
        },
        
        # BEBIDAS
        {
            "_id": str(uuid.uuid4()),
            "name": "Pisco Sour",
            "description": "Cóctel nacional del Perú con pisco, limón y clara de huevo",
            "price": 15.00,
            "category_id": "bebidas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Chicha Morada",
            "description": "Refrescante bebida de maíz morado con piña y canela",
            "price": 6.00,
            "category_id": "bebidas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Inca Kola",
            "description": "La bebida dorada del Perú",
            "price": 5.00,
            "category_id": "bebidas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Agua de Coco",
            "description": "Refrescante agua de coco natural",
            "price": 7.00,
            "category_id": "bebidas",
            "image_url": None,
            "available": True
        },
        {
            "_id": str(uuid.uuid4()),
            "name": "Emoliente",
            "description": "Bebida caliente de hierbas medicinales",
            "price": 4.00,
            "category_id": "bebidas",
            "image_url": None,
            "available": True
        }
    ]
    
    # Insert menu items
    await db.menu_items.insert_many(menu_items_data)
    print("✅ Menu items inserted successfully")
    
    print(f"🎉 Database initialized with {len(categories_data)} categories and {len(menu_items_data)} menu items!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(init_database())
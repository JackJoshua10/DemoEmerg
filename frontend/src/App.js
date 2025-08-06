import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingCart, FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import './App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Context for Cart
const CartContext = React.createContext();

// Header Component
function Header({ cartItems, toggleCart, toggleMobileMenu, isMobileMenuOpen }) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-peru-red text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-peruvian">🇵🇪 La Carreta</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-peru-yellow transition-colors">Inicio</Link>
            <Link to="/menu" className="hover:text-peru-yellow transition-colors">Menú</Link>
            <Link to="/about" className="hover:text-peru-yellow transition-colors">Nosotros</Link>
            <Link to="/contact" className="hover:text-peru-yellow transition-colors">Contacto</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="relative p-2 hover:bg-peru-yellow hover:bg-opacity-20 rounded-full transition-colors"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-peru-yellow text-peru-red rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-peru-yellow hover:bg-opacity-20 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-peru-yellow border-opacity-30">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="py-2 hover:text-peru-yellow transition-colors">Inicio</Link>
              <Link to="/menu" className="py-2 hover:text-peru-yellow transition-colors">Menú</Link>
              <Link to="/about" className="py-2 hover:text-peru-yellow transition-colors">Nosotros</Link>
              <Link to="/contact" className="py-2 hover:text-peru-yellow transition-colors">Contacto</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-peru-red to-peru-brown text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-peruvian mb-6">
          ¡Bienvenidos a La Carreta!
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Descubre los sabores auténticos del Perú en cada platillo. 
          Desde ceviches frescos hasta anticuchos a la parrilla.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/menu" 
            className="bg-peru-yellow text-peru-red px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          >
            Ver Menú
          </Link>
          <Link 
            to="/contact" 
            className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-peru-red transition-colors"
          >
            Reservar Mesa
          </Link>
        </div>
      </div>
    </section>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-peru-red mb-12">
            ¿Por qué elegir La Carreta?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-peru-red mb-4">Auténticos Sabores</h3>
              <p className="text-gray-600">
                Recetas tradicionales peruanas preparadas con ingredientes frescos y de la más alta calidad.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-semibold text-peru-red mb-4">Delivery Rápido</h3>
              <p className="text-gray-600">
                Ordena en línea y recibe tu comida favorita en la comodidad de tu hogar.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="text-6xl mb-4">👨‍🍳</div>
              <h3 className="text-2xl font-semibold text-peru-red mb-4">Chef Experto</h3>
              <p className="text-gray-600">
                Nuestro chef peruano trae años de experiencia y pasión por la gastronomía peruana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-peru-red mb-12">
            Platillos Populares
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-peru-yellow to-peru-red"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-peru-red mb-2">Ceviche de Pescado</h3>
                <p className="text-gray-600 mb-4">Pescado fresco marinado en limón con cebolla roja y cilantro</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-peru-red">S/ 25.00</span>
                  <Link to="/menu" className="bg-peru-red text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                    Ordenar
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-peru-brown to-peru-red"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-peru-red mb-2">Lomo Saltado</h3>
                <p className="text-gray-600 mb-4">Lomo saltado con papas fritas y arroz chaufa</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-peru-red">S/ 28.00</span>
                  <Link to="/menu" className="bg-peru-red text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                    Ordenar
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-peru-green to-peru-red"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-peru-red mb-2">Ají de Gallina</h3>
                <p className="text-gray-600 mb-4">Pollo deshilachado en salsa de ají amarillo cremosa</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-peru-red">S/ 22.00</span>
                  <Link to="/menu" className="bg-peru-red text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                    Ordenar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Menu Page Component
function MenuPage({ addToCart }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/menu`);
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category_id === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-peru-red">Cargando menú...</div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-peru-red mb-8">
          Nuestro Menú
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-peru-red text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-peru-red hover:text-white'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-peru-red text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-peru-red hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-peru-yellow to-peru-red flex items-center justify-center">
                <span className="text-4xl">🍽️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-peru-red mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-peru-red">S/ {item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-peru-red text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 text-xl mt-8">
            No hay platillos disponibles en esta categoría
          </div>
        )}
      </div>
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-peru-red mb-12">Sobre Nosotros</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-peru-red mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              La Carreta nació del sueño de compartir los auténticos sabores del Perú con nuestra comunidad. 
              Fundado en 2020, nuestro restaurante se ha convertido en el hogar de la mejor comida peruana, 
              preparada con amor y tradición familiar.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Cada platillo que servimos cuenta una historia de nuestra rica herencia culinaria, desde los 
              ceviches costeños hasta los platos de la sierra peruana. Utilizamos ingredientes frescos y 
              técnicas tradicionales para ofrecerte una experiencia gastronómica inolvidable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-peru-red mb-4">Nuestra Misión</h3>
              <p className="text-gray-600">
                Preservar y compartir la riqueza gastronómica peruana, ofreciendo platillos auténticos 
                que conecten a nuestros clientes con los sabores tradicionales del Perú.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-peru-red mb-4">Nuestra Visión</h3>
              <p className="text-gray-600">
                Ser reconocidos como el mejor restaurante peruano de la región, manteniendo siempre 
                nuestro compromiso con la calidad, autenticidad y excelencia en el servicio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Page Component
function ContactPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-peru-red mb-12">Contacto</h1>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-peru-red mb-6">Información de Contacto</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiPhone className="text-peru-red text-xl" />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p className="text-gray-600">+51 1 234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <FiMail className="text-peru-red text-xl" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">info@lacarreta.pe</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <FiMapPin className="text-peru-red text-xl" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="text-gray-600">Av. Larco 123, Miraflores, Lima, Perú</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-peru-red mb-4">Horarios de Atención</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Lunes - Viernes:</span> 12:00 PM - 10:00 PM</p>
                <p><span className="font-semibold">Sábados:</span> 11:00 AM - 11:00 PM</p>
                <p><span className="font-semibold">Domingos:</span> 11:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-peru-red mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  placeholder="+51 123 456 789"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
                <textarea 
                  rows="4" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  placeholder="Tu mensaje..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-peru-red text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Component
function CartSidebar({ isOpen, toggleCart, cartItems, updateQuantity, removeFromCart, total }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    special_instructions: ''
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    try {
      const orderData = {
        ...orderForm,
        items: cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          special_instructions: item.special_instructions || ''
        })),
        total_amount: total
      };

      await axios.post(`${API_URL}/api/orders`, orderData);
      
      alert('¡Pedido realizado exitosamente! Nos pondremos en contacto contigo pronto.');
      
      // Reset form and cart
      setOrderForm({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        special_instructions: ''
      });
      
      // Clear cart would need to be implemented in parent
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al realizar el pedido. Por favor intenta de nuevo.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-peru-red">Tu Pedido</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <FiShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="border-b border-gray-200 py-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-peru-red">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-xl font-bold text-peru-red">
                  <span>Total:</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={orderForm.customer_name}
                  onChange={(e) => setOrderForm({...orderForm, customer_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={orderForm.customer_phone}
                  onChange={(e) => setOrderForm({...orderForm, customer_phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  required
                />
                <input
                  type="email"
                  placeholder="Email (opcional)"
                  value={orderForm.customer_email}
                  onChange={(e) => setOrderForm({...orderForm, customer_email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                />
                <textarea
                  placeholder="Instrucciones especiales"
                  value={orderForm.special_instructions}
                  onChange={(e) => setOrderForm({...orderForm, special_instructions: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-peru-red"
                  rows="3"
                />
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="w-full bg-peru-red text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {isCheckingOut ? 'Procesando...' : 'Realizar Pedido'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-peru-red text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-peruvian">🇵🇪 La Carreta</h3>
            <p className="text-peru-yellow mb-4">
              Auténticos sabores peruanos en cada platillo
            </p>
            <div className="space-y-2">
              <p>📍 Av. Larco 123, Miraflores</p>
              <p>📞 +51 1 234-5678</p>
              <p>📧 info@lacarreta.pe</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Horarios</h4>
            <div className="space-y-1 text-peru-yellow">
              <p>Lun - Vie: 12:00 PM - 10:00 PM</p>
              <p>Sábados: 11:00 AM - 11:00 PM</p>
              <p>Domingos: 11:00 AM - 9:00 PM</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="space-y-2">
              <p>🔗 Facebook: @LaCarretaPeru</p>
              <p>📸 Instagram: @lacarreta_pe</p>
              <p>🐦 Twitter: @LaCarretaPE</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-peru-yellow border-opacity-30 mt-8 pt-8 text-center">
          <p>&copy; 2024 La Carreta. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    
    // Show brief notification
    alert(`${item.name} agregado al carrito!`);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header 
            cartItems={cartItems} 
            toggleCart={toggleCart} 
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          <Footer />

          <CartSidebar 
            isOpen={isCartOpen}
            toggleCart={toggleCart}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            total={total}
          />

          {/* Overlay for mobile menu and cart */}
          {(isCartOpen || isMobileMenuOpen) && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => {
                setIsCartOpen(false);
                setIsMobileMenuOpen(false);
              }}
            />
          )}
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
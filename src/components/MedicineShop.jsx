import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_MEDICINE, ADD_PURCHASE_HISTORY } from "../Redux/constants";
import { FiSearch, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import "../stylesheet/MedicineShop.css";

export default function MedicineShop() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const patients = useSelector((state) => state.patients);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      med.quantity > 0
  );

  const handleAddToCart = (medicine) => {
    const existing = cart.find((i) => i.id === medicine.id);

    if (existing) {
      if (existing.quantity < medicine.quantity) {
        setCart(
          cart.map((i) =>
            i.id === medicine.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        );
      } else alert("Not enough stock!");
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const handleRemove = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const handleQty = (id, qty) => {
    const med = medicines.find((m) => m.id === id);

    if (qty > med.quantity) return alert("Not enough stock!");
    if (qty <= 0) return handleRemove(id);

    setCart(
      cart.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  const total = () =>
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    if (!selectedPatient) return alert("Select patient");
    if (!cart.length) return alert("Cart empty");

    const patient = patients.find(
      (p) => p.id.toString() === selectedPatient
    );

    const purchase = {
      id: Date.now(),
      patientId: selectedPatient,
      patientName: patient.name,
      medicines: cart,
      totalAmount: total(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    cart.forEach((item) => {
      const med = medicines.find((m) => m.id === item.id);
      dispatch({
        type: UPDATE_MEDICINE,
        payload: {
          ...med,
          quantity: med.quantity - item.quantity,
        },
      });
    });

    dispatch({ type: ADD_PURCHASE_HISTORY, payload: purchase });

    setCart([]);
    setSelectedPatient("");
    setSearchTerm("");

    alert("Purchase successful");
  };

  return (
    <div className="medicine-shop">
      <div className="shop-container">

        {/* LEFT */}
        <div className="shop-left">
          <div className="shop-header">
            <h2><FiShoppingCart /> Medicine Shop</h2>

            <div className="search">
              <FiSearch />
              <input
                type="text"
                placeholder="Search medicine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="med-grid">
            {filteredMedicines.map((m) => (
              <div key={m.id} className="med-card">
                <h4>{m.name}</h4>
                <p>₹{m.price}</p>
                <span className={m.quantity <= 5 ? "low" : ""}>
                  Stock: {m.quantity}
                </span>

                <button onClick={() => handleAddToCart(m)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="shop-right">
          <h3>Cart</h3>

          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {cart.length === 0 ? (
            <p className="empty">Cart empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-row">
                  
                  <div className="cart-info">
                    <h5>{item.name}</h5>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="qty">
                    <button onClick={() => handleQty(item.id, item.quantity - 1)}>-</button>

                    <input
                      value={item.quantity}
                      onChange={(e) =>
                        handleQty(item.id, Number(e.target.value))
                      }
                    />

                    <button onClick={() => handleQty(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <div className="cart-total">
                    ₹{item.price * item.quantity}
                    <button onClick={() => handleRemove(item.id)}>
                      <FiTrash2 />
                    </button>
                  </div>

                </div>
              ))}

              <div className="total">
                Total: ₹{total()}
              </div>
            </>
          )}

          <button
            className="checkout"
            onClick={handleCheckout}
            disabled={!cart.length || !selectedPatient}
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
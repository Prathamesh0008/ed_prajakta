'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace('$', '')) * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-6 p-4 border rounded-lg">
                <img
                  src={item.image}
                  className="w-24 h-24 object-cover rounded"
                  alt={item.name}
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1"
                    />

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-bold text-[#8B0035]">
                  ${Number(item.price.replace('$', '')) * item.qty}
                </div>
              </div>
            ))}

            <div className="flex justify-end text-xl font-bold">
              Total: <span className="ml-2 text-[#8B0035]">${total}</span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

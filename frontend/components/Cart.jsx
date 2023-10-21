import Image from "next/image";

import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";

import cartIcon from '../public/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg'

function CartItem({ data }) {
  const { addItem, removeItem } = useAppContext();
  const { quantity, attributes } = data;

  return (
    <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800 cart">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-bold text-white mb-1">{attributes.name}</h6>
          <span className="block pb-4 mb-auto font-medium text-gray-400">
            {quantity} x ${(attributes.price)}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button
              className="mr-2 inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className="inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className="block mt-2 text-sm font-bold text-white">
            ${(attributes.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const router = useRouter();
  const { user, cart, showCart, setShowCart } = useAppContext();
  const total = cart.total;
  const displayTotal = Math.abs(total);

  function loginRedirect() {
    router.push("/login");
  }

  function cartRedirect() {
    setShowCart(true);
    router.push("/checkout");
  }

  return (
    <section className="right-20">
      <div className="relative">
        <button
          onClick={() => setShowCart((prevState) => !prevState)}
          className="absolute right-8 top-8 bg-sky-300 z-10 p-3 rounded-full hover:bg-teal-300 items-center background"
        >
        <Image
          src={cartIcon}
          alt="cart_icon"
          width={45}
          height={45}    
        />
        </button>
        {showCart && (
          <div className="rounded-3xl co bg-gray-800 background cart">
            <div className="max-w-lg pt-6 pb-8 px-8 mx-auto">
              <div className="flex mb-10 items-center justify-between">
                <h6 className="font-bold text-2xl text-white mb-0">
                  Your Cart
                </h6>
              </div>

              <div>
                {cart.items
                  ? cart.items.map((item, index) => {
                      if (item.quantity > 0) {
                        return <CartItem key={index} data={item} />;
                      }
                    })
                  : null}
              </div>
              <div className="p-6">
                <div className="flex mb-6 content-center justify-between">
                  <span className="font-bold text-white">Order total</span>
                  <span className="text-sm font-bold text-white">
                    ${(displayTotal)}
                  </span>
                </div>
                <button
                  onClick={() => (user ? cartRedirect() : loginRedirect())}
                  className="inline-block w-full px-6 py-3 text-center font-bold text-white bg-green-500 hover:bg-green-600 transition duration-200 rounded-full"
                >
                  {user ? "Continue To Pay" : "Login to Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
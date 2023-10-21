

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import Cookie from "js-cookie";
const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

import Head from "next/head";
import Link from "next/link";

function Navigation() {
  const { user, setUser } = useAppContext();
  const router = useRouter();

  function handleLogout() {
    setUser(null);
    Cookie.remove("token");
    router.push("/");
  }

  return (
    <header className="bg-yellow-800 background navbar sticky">
      <nav className=" flex justify-between p-4 px-6">
        <div className="flex justify-between items-center w-full">
          <div className="xl:w-1/3">
            <Link
              className="block text-2xl max-w-max text-white font-medium title"
              href="/"
            >
              Soap by Seá
            </Link>
          </div>

          <div className="xl:block xl:w-1/3">
            <div className="flex items-center justify-end">
              <Link
                className="px-5 text-gray-50  hover:text-yellow-200 font-medium links"
                href="/"
              >
                Home
              </Link>

              <div className="hxl:block px-5">
                {user ? (
                  <div className="flex items-center justify-end">
                    <span className="inline-block py-2 px-4 mr-2 leading-5 text-gray-50  hover:text-gray-100 bg-transparent font-medium rounded-md links">
                      {user.username}
                    </span>
                    <button
                      className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md links"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <Link
                      className="inline-block py-2 px-4 mr-2 leading-5 text-gray-500  hover:text-lime-500 font-medium bg-transparent rounded-md links"
                      href="/login"
                    >
                      Log In
                    </Link>
                    <Link
                      className="inline-block py-4 px-4 text-sm leading-5 text-green-50 hover:bg-blue-400 font-light focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 rounded-md links"
                      href="/register"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function Layout(props) {
  const title = "Soap by Seá";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
       
      </Head>
      <Navigation />
      <Cart />
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Soap by Seá
            <br  />
            <span className="text-center">
                Handcrafted Soap
            </span>
        </h1>
        <p className=" text-center">
        Enjoy Our Quality Products
        </p>
    </section>
      <div className="container mx-auto px-6">{props.children}</div>
    </div>
  );
}
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Image from "next/image";
import Loader from "@/components/Loader";
import { useAppContext } from "../../context/AppContext";


const GET_SOAPTYPE_SOAPS = gql`
  query ($id: ID!) {
    soaptype(id: $id) {
      data {
        id
        attributes {
          name
          soaps {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function SoapCard({ data }) {
  const { addItem, setShowCart } = useAppContext();
    // will add some logic here

    function handleAddItem() {
      addItem(data);
      setShowCart(true);
    }
  

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <Image
          className="w-full rounded-2xl"
          height={300}
          width={300}
          src={`${process.env.STRAPI_URL || "http://127.0.0.1:1337"}${
            data.attributes.image.data.attributes.url
          }`}
          alt="soap image"
        />
        <div className="p-8 text-center">
          <div className="group inline-block mb-4" href="#">
            <h3 className="font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
              {data.attributes.name}
            </h3>
            <h2 className="text-black">${(data.attributes.price)}</h2>
          </div>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <button
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                onClick={handleAddItem}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default function Soap() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_SOAPTYPE_SOAPS, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Soaps";
  if (loading) return <Loader />;
  if (data.soaptype.data.attributes.soaps.data.length) {
    const { soaptype } = data;

    return (
      <div className="py-6">
        <h1 className="text-4xl font-bold text-green-600">
          {soaptype.data.attributes.name}
        </h1>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {soaptype.data.attributes.soaps.data.map((res) => {
                return <SoapCard key={res.id} data={res} />;
              })}
            </div>
          </div>
        </div>
    );
  } else {
    return <h1>No Soap Found</h1>;
  }
}
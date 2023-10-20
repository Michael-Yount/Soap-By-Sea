import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const QUERY = gql`
  {
    soaptypes {
      data {
        id
        attributes {
          name
          description
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
`;

function SoapTypeCard({ data }) {
  return (
    
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 text-center">
      
        <Image
          className="w-full rounded-2xl"
          height={300}
          width={300}
          src={`${process.env.STRAPI_URL || "http://127.0.0.1:1337"}${
            data.attributes.image.data.attributes.url
          }`}
          alt=""
        />
        <div className="p-8">
          <h3 className="mb-3 font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
            {data.attributes.name}
          </h3>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <Link
                className="button-label block w-full px-12 py-3.5 text-lg text-center font-bold bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                href={`/soaptype/${data.id}`}
              >
                View Soaps
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

function SoapTypeList(props) {
  const { loading, error, data } = useQuery(QUERY);

  if (error) return "Error loading soap_types";
  if (loading) return <Loader />;

  if (data.soaptypes.data && data.soaptypes.data.length) {
    const searchQuery = data.soaptypes.data.filter((query) =>
      query.attributes.name.toLowerCase().includes(props.query.toLowerCase())
    );

    if (searchQuery.length != 0) {
      return (
        <div className="py-16 px-8 rounded-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -m-4 mb-6">
              {searchQuery.map((res) => {
                return <SoapTypeCard key={res.id} data={res} />;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>No Soaps Found</h1>;
    }
  }
  return <h5>Add Soaps</h5>;
}
export default SoapTypeList;
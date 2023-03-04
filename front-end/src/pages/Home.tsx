import React from "react";
import Navbar, { getPathname } from "../components/Navbar";
import getPhotos from "../services/getPhotos";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
type Props = {};

export default function Home({}: Props) {
  const [photo, setPhoto] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError]= useState<boolean>(false);
  useEffect(() => {
    getPhotos()
      .then((data) => setPhoto([...data.photo]))
      .catch((err) => {

        setError(true)});
      setTimeout(()=> setLoading(false),3000);
  }, []);

  return (
    <>
    {loading && <Loading/>}

    { !loading &&<> <Navbar />
      {error&& <Empty location ={getPathname()}/>}
        {photo && (
          <main className="w-full mt-14  columns-2 sm:columns-2 gap-4 lg:columns-3 ">
          <div>
            {photo.map((item: any, index: number) => (
              <figure
                className="group relative"
                key={`${item.caption}-${index}`}
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className={`mb-4 rounded-xl  cursor-pointer `}
                />
                <figcaption className="absolute bottom-0  transition ease-in-out p-4 text-white z-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-2">
                  {item.caption}
                </figcaption>
                <div className="w-full h-full absolute top-0 transition delay-100 left-0 group-hover:bg-black/50 cursor-pointer"></div>
              </figure>
            ))}
          </div>
          </main>
        )}
      <Footer/>
</>}
    </>
  );
}

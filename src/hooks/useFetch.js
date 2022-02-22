//Custom React Hooks must start with "use", this way React knows it is a hook

//Shaun Pelling Udemy course React-Firebase
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  //use useRef to wrap an object/array argument
  //which is a useEffect dependency
  //const options = useRef(_options).current;

  useEffect(() => {
      const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
          if (err.name === "AbortError") {
              console.log("The fetch was aborted");
          } else {
              setError("Could not fetch the data");
              setIsPending(false);
          }
      }
    };

    fetchData();

    //Clean up function
    return () => {
        controller.abort();
    }
  }, [url]);

  return { data, isPending, error };
};

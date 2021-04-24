import { useEffect, useState } from "react";

const useData = (query, getApiEndpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const promiseArray = [];
    if (query.length === 0) {
      setData([]);
      return;
    }
    let timeoutID = setTimeout(async () => {
      setIsLoading(true);
      Array(3)
        .fill("")
        .forEach((_, index) => {
          const url = getApiEndpoint(query, index + 1);
          promiseArray.push(fetch(url));
        });
      const jsonResponses = await Promise.all(
        promiseArray.map(async (p) => {
          const resolved = await p;
          return resolved.json();
        })
      );
      const dataArray = jsonResponses
        .map((r) => r.Search)
        .flat()
        .reduce((uniqueArray, item) => {
          const dataAlreadyExists = uniqueArray.find(
            (i) => i.imdbID === item.imdbID
          );
          return dataAlreadyExists ? uniqueArray : [...uniqueArray, item];
        }, [])
        .slice(0, 24);

      setData(dataArray);
      setIsLoading(false);
    }, 500);
    return () => {
      timeoutID && clearTimeout(timeoutID);
    };
  }, [query]);

  return { isLoading, data };
};

export default useData;

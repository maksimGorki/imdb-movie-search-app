import { useEffect, useState } from "react";

const useData = (query, getApiEndpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(true);
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const promiseArray = [];
    if (query.length === 0) {
      setData([]);
      setResponse(true);
      setIsLoading(false);
      return;
    }
    const timeoutID = setTimeout(async () => {
      setIsLoading(true);
      // OMDb API return 10 results per request, so 3 request sent simultaneously to get 30 results per search
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
      console.log(jsonResponses);

      if (jsonResponses[0].Response === "False") {
        setResponse(false);
        setIsLoading(false);
        setErrorMsg(jsonResponses[0].Error);
        return { errorMsg, response, isLoading, data };
      }

      setResponse(true);
      let dataArray = [];
      // If there is less result than 30 data
      if (jsonResponses.find((i) => i.Response === "False")) {
        dataArray = jsonResponses[0].Search;
      } else {
        dataArray = jsonResponses
          .map((r) => r.Search)
          .flat()
          .reduce((uniqueArray, item) => {
            const dataAlreadyExists = uniqueArray.find(
              (i) => i.imdbID === item.imdbID
            );
            return dataAlreadyExists ? uniqueArray : [...uniqueArray, item];
          }, [])
          .slice(0, 24);
      }

      setData(dataArray);
      setIsLoading(false);
    }, 500);
    return () => {
      timeoutID && clearTimeout(timeoutID);
    };
  }, [query]);
  return { errorMsg, response, isLoading, data };
};

export default useData;

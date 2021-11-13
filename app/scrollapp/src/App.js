import { useState, useEffect } from "react";

function App() {
  const [pageData, setPageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    //initial load
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  // flags whether fetching or not
  useEffect(() => {
    if (isFetching) fetchMoreListItems();
  }, [isFetching]);

  //trigger on Scroll
  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  const handleScroll = () => {
    // logic to check if the scroll has exceeded the window height or is  scrolling then fetch data
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.offsetHeight ||
      isFetching
    )
      setIsFetching(true);
  };

  const fetchData = () => {
    // mock call
    fetch(`./API/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        // update pageData
        setPageData([...pageData, { ...myJson.page }]);
      })
      .catch(() => console.log("file end"));
    //pageNumber state for the next trigger
    setPageNumber(pageNumber + 1);
  };

  // rendering the page
  return (
    <>
      <div className="bg-black">
        <h2 className="text-2xl  tracking-tight text-white">Romantic Comedy</h2>
        {pageData?.map((page) => (
          <div
            className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8"
            data-testid="imagePage"
          >
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
              {page["content-items"].content.map((image) => (
                <div key={image.name} className="group relative">
                  <div
                    className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-full lg:aspect-none"
                    data-testid="imageTestId"
                  >
                    <img
                      src={`./Slices/${image["poster-image"]}`}
                      alt={image.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-2.4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-white">
                        <a href={image.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {image.name}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

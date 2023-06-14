import { useEffect, useState } from "react";

const Paginator = (props) => {
  const { total_pages, page } = props; // Objective structure
  const [pages, setPages, selectPage] = useState([]);

  const calculatePages = () => {
    let pageNumbers = Array.from({ length: total_pages }, (_, i) => i + 1);
    let center = page - 1;

    if (center < 3) {
      console.log("girdik");
      center = 0;
    }
    console.log("çıktı", center);

    setPages(pageNumbers.splice(center, 7));

    console.log("sayımız :", pageNumbers[page - 1], page - 1);
    console.log(pageNumbers);
  };

  useEffect(() => {
    calculatePages();
    console.log("try");
  }, [page]);

  return (
    <div className="page-numbers">
      <ul>
        {pages &&
          pages.map((p) => {
            return (
              <li
                onClick={() => props.selectPages(p)}
                className={page === p ? "active" : ""}
              >
                {p}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Paginator;

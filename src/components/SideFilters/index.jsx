import React, { useEffect } from "react";
import { useStore } from "../../context/Store";
import { FaSpinner } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";

import "./style.scss";

function SideFilters() {
  const { filters, mainFilter, setMainFilter } = useStore();

  useEffect(() => {
    console.log(mainFilter);
  }, [mainFilter]);

  function addMacroFilter(e) {
    const current = e.currentTarget;
    const value = parseInt(current.value);
    const checked = current.checked;

    const macro = Object.keys(filters).filter((macro) => {
      return filters[macro].id === value;
    });
    const subs = filters[macro].sub;

    const arr = Object.keys(subs).map((sub) => {
      document.querySelector(
        `.checkbox-main-${subs[sub].id}`
      ).checked = checked;
      return subs[sub].id;
    });

    //mainFilter U (arr - mainFilter)
    if (checked) {
      const union = arr.filter((main) => {
        return !mainFilter.includes(main);
      });
      setMainFilter([...mainFilter, ...union]);
    }
    //(mainFilter - arr)
    else {
      const diff = mainFilter.filter((main) => {
        return !arr.includes(main);
      });
      setMainFilter([...diff]);
    }
  }

  function addMainFilter(e) {
    const current = e.currentTarget;
    const value = parseInt(current.value);
    const pos = mainFilter.indexOf(value);
    if (pos !== -1) {
      setMainFilter([...mainFilter.filter((el) => el !== value)]);
    } else {
      setMainFilter([...mainFilter, value]);
    }
  }

  function handleClick(e) {
    const current = e.currentTarget;
    const id = current.dataset.id;
    const mainGroup = document.querySelector(
      `.filter-group-macro-${id} .filter-group-main`
    );
    current.classList.toggle("rotate");
    mainGroup.classList.toggle("hide-group");
  }

  function renderFilters() {
    return (
      filters &&
      Object.keys(filters).map((macro) => {
        return (
          <div
            className={`filter-group-macro filter-group-macro-${filters[macro].id}`}
          >
            <div className="filter-macro">
              <span>
                <input
                  onChange={addMacroFilter}
                  type="checkbox"
                  value={filters[macro].id}
                />
                <label>
                  <b>
                    {macro} ({filters[macro].qtd})
                  </b>
                </label>
              </span>

              <span
                className="icon-expand"
                onClick={handleClick}
                data-id={filters[macro].id}
              >
                <GoTriangleDown />
              </span>
            </div>

            <div className="filter-group-main hide-group">
              {Object.keys(filters[macro].sub).map((main) => {
                return (
                  <div
                    className="filter-main"
                    data-id={filters[macro].sub[main].id}
                  >
                    <span className="filter-main-span">
                      <input
                        type="checkbox"
                        value={filters[macro].sub[main].id}
                        onChange={addMainFilter}
                        className={`checkbox-main-${filters[macro].sub[main].id}`}
                      />
                      <label>
                        {main} ({filters[macro].sub[main].qtd})
                      </label>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
    );
  }

  if (!filters) {
    return (
      <div className="spinner-div" style={{ marginTop: "8px" }}>
        <span className="spinner-icon">
          <FaSpinner />
        </span>
      </div>
    );
  }
  return <section className="card side-filters">{renderFilters()}</section>;
}

export default SideFilters;

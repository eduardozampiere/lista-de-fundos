import React from "react";
import TopFilters from "../TopFilters";
import SideFilters from "../SideFilters";
import "./style.scss";
import List from "../List";
function Main() {
  return (
    <main>
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 medium-12 large-9">
          <TopFilters />

          <List />
        </div>

        <div className="cell small-12 medium-12 large-3">
          <SideFilters />
        </div>
      </div>
    </main>
  );
}

export default Main;

import React from "react";
import { BsSearch } from "react-icons/bs";
import "./style.scss";
import Slider from "../Slider";
import RiskProfile from "../RiskProfile";
import { formatReal } from "../../utils";
function TopFilters(props) {
  return (
    <section className="card top-filter" {...props}>
      <div className="filter-header">
        <div className="input-group">
          <input type="text" placeholder="Buscar fundo por nome" />
          <button>
            <BsSearch />
          </button>
        </div>
      </div>

      <div className="filter-body">
        <Slider
          title="Aplicação mínima"
          initial={9}
          formatter={(value) => `Até ${formatReal(value)}`}
          values={[
            0,
            1,
            100,
            300,
            500,
            1000,
            2000,
            2500,
            3000,
            5000,
            10000,
            15000,
            20000,
            25000,
            30000,
            50000,
            100000,
            250000,
            500000,
          ]}
        />

        <RiskProfile />

        <Slider
          title="Prazo de resgate"
          initial={10}
          formatter={(value) => {
            return `Até ${value} ${value > 1 ? "dias úteis" : "dia util"}`;
          }}
          values={[
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            9,
            10,
            12,
            13,
            14,
            15,
            17,
            19,
            20,
            21,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            37,
            42,
            44,
            45,
            50,
            57,
            58,
            59,
            60,
            89,
            90,
            91,
            119,
            120,
            179,
            180,
            270,
          ]}
        />
      </div>

      <div className="filter-footer"></div>
    </section>
  );
}

export default TopFilters;

import React, { useEffect, useState } from "react";
import Asset from "../Asset";
import API from "../../api";
import { useStore } from "../../context/Store";

import "./style.scss";
function List() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { setFilters, minimumAply, minimumDays, fundName, risk } = useStore();

  const specHeaders = [];

  useEffect(() => {
    (async () => {
      try {
        if (
          typeof minimumAply === "object" ||
          typeof minimumDays === "object" ||
          typeof fundName === "object"
        )
          return () => {};
        setLoading(true);
        console.log(risk);
        let { data } = await API.data();
        const aux = {};

        //Aplicando filtros
        data = data.filter(
          (el) =>
            el?.operability?.minimum_initial_application_amount >=
              minimumAply &&
            el?.operability?.retrieval_liquidation_days >= minimumDays &&
            el?.simple_name?.search(new RegExp(fundName, "i")) !== -1 &&
            (parseInt(
              el?.specification?.fund_risk_profile?.score_range_order
            ) === parseInt(risk) ||
              !risk)
        );
        console.log(data);

        //Separando filtros de estrategia
        data.map((el) => {
          const macro = el.specification.fund_macro_strategy.name;
          const main = el.specification.fund_main_strategy.name;
          const macro_id = el.specification.fund_macro_strategy.id;
          const main_id = el.specification.fund_main_strategy.id;
          if (!aux[macro])
            aux[macro] = {
              qtd: 0,
              sub: {},
              id: macro_id,
            };
          aux[macro].qtd++;

          if (!aux[macro].sub[main]) {
            aux[macro].sub[main] = { qtd: 0, id: main_id };
          }

          aux[macro].sub[main].qtd++;
        });

        setFilters(aux);

        //Ordenando dados por estrategia
        data.sort((a, b) => {
          if (
            a.specification.fund_macro_strategy.id <
            b.specification.fund_macro_strategy.id
          )
            return 1;
          if (
            a.specification.fund_macro_strategy.id >
            b.specification.fund_macro_strategy.id
          )
            return -1;

          if (
            a.specification.fund_main_strategy.id <
            b.specification.fund_main_strategy.id
          )
            return 1;
          if (
            a.specification.fund_main_strategy.id >
            b.specification.fund_main_strategy.id
          )
            return -1;
          return 0;
        });

        setData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [minimumAply, minimumDays, fundName, risk]);

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <table className="unstriped list-table">
      <thead>
        <tr>
          <th>Fundo</th>
          <th>Data da cota</th>
          <th>Mês (%)</th>
          <th>Ano (%)</th>
          <th>12M (%)</th>
          <th style={{ textAlign: "right" }}>Aplicação mínima</th>
          <th style={{ textAlign: "center" }}>Prazo do resgate</th>
          <th>Aplicar</th>
        </tr>
      </thead>

      <tbody>
        {data?.map((el) => (
          <Asset data={el} header={specHeaders} />
        ))}
      </tbody>
    </table>
  );
}

export default List;

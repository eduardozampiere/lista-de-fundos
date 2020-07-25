import React, { useEffect, useState } from "react";
import Asset from "../Asset";
import API from "../../api";
import { useStore } from "../../context/Store";

import "./style.scss";
function List() {
  const [loading, setLoading] = useState(true);

  const { data, setData, setFilters } = useStore();
  //profitabilities
  //quota_date
  //fund_main_strategy
  //fund_risk_profile

  //is_qualified

  //operability minimum_initial_aplication_amount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.data();
        const aux = {};
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
          return 0;
        });

        setData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

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
          <Asset data={el} />
        ))}
      </tbody>
    </table>
  );
}

export default List;

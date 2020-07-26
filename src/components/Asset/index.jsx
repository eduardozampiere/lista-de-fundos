import React from "react";
import { formatReal, formatPercent, formatDate, colors } from "../../utils";
import { AiOutlineInfoCircle, AiFillStar } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";

function Asset({ data, header }) {
  function renderHeader() {
    const trsToReturn = [];
    const macro = data?.specification?.fund_macro_strategy.name;
    const main = data?.specification?.fund_main_strategy.name;
    if (!header.includes(macro)) {
      header.push(macro);
      trsToReturn.push(
        <tr className="tr-spec-header">
          <td colSpan={1} className="sticky-td">
            {macro}
          </td>
          <td colSpan={8}></td>
        </tr>
      );
    }

    if (!header.includes(main)) {
      header.push(main);
      trsToReturn.push(
        <tr className="tr-spec-header">
          <td colSpan={1} className="sticky-td">
            {main}
          </td>
          <td colSpan={8}></td>
        </tr>
      );
    }

    return <>{trsToReturn}</>;
  }

  function handleAply(e) {
    e.preventDefault();
    alert("Investindo no fundo");
  }

  function handleClick(e, id) {
    const el = document.querySelector(`[data-id="${id}"]`);
    el.classList.toggle("tr-hide");
    console.log(data);
    return false;
  }

  function handleMove(e) {
    const current = e.currentTarget;
    const info = current.querySelector(".info");

    info.classList.toggle("info-hide");
  }

  return (
    <>
      {renderHeader()}
      <tr
        onClick={(e) => handleClick(e, data.id)}
        className={
          !data.is_closed_to_capture
            ? "fund-active asset-row"
            : "fund-inative asset-row"
        }
      >
        <td className="sticky-td">
          <div
            style={{
              borderLeft: `solid 5px ${
                colors[
                  parseInt(
                    data?.specification?.fund_risk_profile?.score_range_order
                  ) - 1
                ]
              }`,
            }}
          >
            <div className="fund-name">
              {data?.simple_name}
              {data?.specification?.is_qualified ? (
                <span
                  className="badge"
                  data-tooltip
                  tabIndex={1}
                  title="Fundo para investidor qualificado"
                  data-title="Fundo para investidor qualificado"
                >
                  <AiFillStar />
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="fund-spec">
              {`${data?.specification?.fund_macro_strategy.name} | 
            ${data?.specification?.fund_main_strategy.name}`}
            </div>
          </div>
        </td>
        <td>{formatDate(data?.quota_date)}</td>
        <td>{formatPercent(data?.profitabilities?.month * 100)}</td>
        <td>{formatPercent(data?.profitabilities?.year * 100)}</td>
        <td>{formatPercent(data?.profitabilities?.m12 * 100)}</td>
        <td style={{ textAlign: "right" }}>
          {formatReal(data?.operability?.minimum_initial_application_amount)}
        </td>
        <td style={{ textAlign: "center" }}>
          <span
            className="info-icon"
            onMouseEnter={handleMove}
            onMouseLeave={handleMove}
          >
            <AiOutlineInfoCircle />

            <div class="info info-hide">
              {data?.operability?.retrieval_quotation_days_str}
            </div>
          </span>
        </td>
        {/* //{data?.operability?.retrieval_quotation_days_str} */}
        <td>
          <span class="aply-icon" onClick={handleAply}>
            <TiArrowBack />
          </span>
        </td>
      </tr>

      <tr data-id={data.id} className="tr-hide">
        <td colSpan={9}>
          <div className="grid-x grid-margin-x">
            <div className="cell small-7 medium-7 large-7">
              <div className="fund-description">
                <b>Fundo para: </b>
                {data?.description.target_audience}
              </div>

              <div className="fund-description">
                <b>Objetivo: </b>
                {data?.description.objective}
              </div>
            </div>

            <div className="cell small-5 medium-5 large-5 fund-info">
              <div>
                <b>Cotização da aplicação: </b>
                {data?.operability?.application_quotation_days_str}
              </div>
              <div>
                <b>Cotização do resgate: </b>
                {data?.operability?.retrieval_quotation_days_str}
              </div>
              <div>
                <b>Liquidação do resgate: </b>
                {data?.operability?.retrieval_liquidation_days_str}
              </div>
              <div>
                <b>Taxa de administração: </b>
                {data?.fees?.administration_fee}
              </div>

              <div>
                <a>Conheça mais sobre esse fundo</a>
              </div>

              <div>
                <b>CNPJ do fundo</b>: {data?.cnpj}
              </div>
              <div>
                <b>Nome do gestor</b>: {data?.fund_manager?.name}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </> //
  );
}

export default Asset;

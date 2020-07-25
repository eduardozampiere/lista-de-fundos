import React from "react";
import { formatReal, formatPercent, formatDate, colors } from "../../utils";
import { AiOutlineInfoCircle } from "react-icons/ai";
console.log(colors);
function Asset({ data }) {
  return (
    <tr>
      <td>
        <div
          style={{
            borderLeft: `solid 4px ${
              colors[
                parseInt(
                  data?.specification?.fund_risk_profile?.score_range_order
                ) - 1
              ]
            }`,
          }}
        >
          <div className="fund-name">{data?.simple_name}</div>

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
        <span className="info-icon">
          <AiOutlineInfoCircle />
        </span>
      </td>
      {/* //{data?.operability?.retrieval_quotation_days_str} */}
      <td>Aplicar</td>
    </tr>
  );
}

export default Asset;

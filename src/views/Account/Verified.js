import React from "react";
import "./styles.css";

import imgVerifiedOk from "../../assets/img/verified-ok.svg";
// import imgVerifiedAnalyzed from "../../assets/img/verified-analyzed.svg";
// import imgVerifiedPending from "../../assets/img/verified-pending.svg";

export default function Verified({ status = imgVerifiedOk }) {
  return (
    <div className="content-verified">
      <img src={status} alt="analyzed" />
      <span>Verificado</span>
    </div>
  );
}

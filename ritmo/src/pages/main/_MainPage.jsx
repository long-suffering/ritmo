import BigLogo from "../../assests/images/big-logo.svg";
import { OpenAddressing, SimplestHashTables, Sorting } from "./fragments";

export const MainPage = () => (
  <div className="fluid-body">
    <div className="frontpage">
      <div className="header">
        <img src={BigLogo} alt="logo" />
      </div>

      <Sorting/>
      <SimplestHashTables/>
      <OpenAddressing/>
    </div>
  </div>
);
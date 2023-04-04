
import HeaderEl from "../elements/HeaderEl";
import SectionHeaderEl from "../elements/SectionHeaderEl";
import { lazy } from "solid-js";
const PaymentIcon = lazy(() => import("@suid/icons-material/Payments"));

const Pricing = () => {
  return (
    <>
      <HeaderEl icon={PaymentIcon}>Pricing</HeaderEl>
      <SectionHeaderEl>Placeholder</SectionHeaderEl>
    </>
  );
};

export default Pricing;
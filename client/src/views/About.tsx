import SectionHeaderEl from "../elements/SectionHeaderEl";
import HeaderEl from "../elements/HeaderEl";
import { lazy } from "solid-js";
const AboutIcon = lazy(() => import("@suid/icons-material/People"));

const About = () => {
  return (
    <>
      <HeaderEl icon={AboutIcon}>About Us</HeaderEl>
      <SectionHeaderEl>Placeholder</SectionHeaderEl>
    </>
  );
};

export default About;
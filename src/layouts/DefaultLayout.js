import React from "react";
import {Container} from "react-bootstrap";

import Topbar from "./components/Topbar.js";

const DefaultLayout = ({ children ,}) => (
  <Container fluid>
    <Topbar/>

    
    {/* <div className="d-flex justify-content-center">
      <picture>
        <source media="(max-width: 480px)" srcSet="https://i.ibb.co/CbRDbMh/lightsaber-banner-480w.jpg" />
        <source media="(max-width: 1366px)" srcSet="https://i.ibb.co/HBJpfDn/lightsaber-banner-1366w.jpg" />
        <img id="banner" src="https://i.ibb.co/TRBt1P6/lightsaber-banner-1920w.jpg" alt="Web banner" />
      </picture>
    </div> */}

    {children}
    </Container>
);
export default DefaultLayout;


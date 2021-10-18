import React from "react";
import "./header.css";
import Container from "../container/Container";
import { AmplifySignOut } from "@aws-amplify/ui-react";

export default function Header() {
  return (
    <div className='headerMain'>
      <Container>
        <div className='header'>
          <div>
            <h2>Dashboard</h2>
          </div>
          <div>
            <h3>
              <AmplifySignOut />
            </h3>
          </div>
        </div>
      </Container>
    </div>
  );
}

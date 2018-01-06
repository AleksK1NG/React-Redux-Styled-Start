// @flow
import React from 'react';
import type { Node } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Wrapper } from './styled';

type Props = {
  children: Node,
}

const Layout = ({ children }: Props) => (
  <Wrapper>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <NavLink to="/" activeClassName="is-active">Home</NavLink>
          {' | '}
          <NavLink to="/about" activeClassName="is-active">About</NavLink>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {children}
        </Col>
      </Row>
    </Grid>
  </Wrapper>
);


export default Layout;

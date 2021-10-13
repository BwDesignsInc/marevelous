import React from "react";
import styled from "styled-components";
import AddItems from "../features/AddItems";
import { Itemlist } from "../components/Itemslist/Itemlist";
import useMedia from "use-media";

const AppContainer = styled.div`
  padding: 3%;
  background-color: rgb(121, 129, 143);
  position: relative;
`;

const Title = styled.div`
  color: white;
  font-weight: 300;
  font-family: Merriweather;
  font-style: italic;
  font-size: 3rem;
`;

const IntroText = styled.p`
  width: ${(props) => props.isDesktop ? '60%': '100%'};
  color: rgb(140, 242, 227);
`;

const Grid = styled.div``;

const Row = styled.div`
  display: flex;
  min-width: ${(props) => !props.isDesktop ? '200px': '0px'};
  flex-wrap: wrap;
`;

const Col = styled.div`
  position: relative;
  flex: ${(props) => props.size};
  flex-wrap: wrap;
`;

export const App = () => {
  const isDesktop = useMedia({ minWidth: "768px" });

  return (
    <AppContainer className="container">
      <Title>Marvelous!</Title>
      <IntroText isDesktop={isDesktop}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </IntroText>
      <Grid>
        <Row>
          <Col size={1}>
            <AddItems />
          </Col>
          {isDesktop && (
            <Col size={2}>
              <Grid style={{ border: "5px solid white", marginLeft: "5px" }}>
                <Row>
                  <Col size={1}>
                    <Itemlist column={1} />
                  </Col>
                  <Col size={1}>
                    <Itemlist column={2} />
                  </Col>
                </Row>
              </Grid>
            </Col>
          )}
        </Row>
        {}
      </Grid>
      {!isDesktop && (
        <Grid style={{ border: "5px solid white", marginLeft: "5px", marginTop: "200px", marginBottom: "100px"}}>
          <Row isDesktop={isDesktop}>
            <Col size={1}>
              <Itemlist column={1}/>
            </Col>
            <Col size={1}>
              <Itemlist column={2}/>
            </Col>
          </Row>
        </Grid>
      )}
    </AppContainer>
  );
};

export default App;

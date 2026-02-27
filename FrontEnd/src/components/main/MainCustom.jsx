import "./mainCustom.css";
import { Container, Row, Col } from "react-bootstrap";
import ButtonCustom from "../buttonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";

const MainCustom = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="mt-5">
        <Row className="d-flex bg-color-custom-main mt-3  ">
          <Col xs={12} md={12} lg={6} className="d-flex  flex-column gap-3">
            {" "}
            <div className="m-4">
              <div>
                <h1 className="h1-custom-main">EXPERIENCE FOR THE SELLER</h1>
              </div>
              <div className="w-100  ">
                <img
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  onDragStart={(e) => e.preventDefault()}
                  src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm90b3xlbnwwfHwwfHx8MA%3D%3D"
                  className="img-custom-main "
                />
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={12}
            lg={6}
            className="d-flex flex-column gap-2 align-items-center"
          >
            <div className="mt-5 ">
              <ul className="d-flex  flex-column gap-4">
                <li className="li-custom-main">FOOD PHOTOGRAPHY</li>
                <li className="li-custom-main">PORTRAIT PHOTOGRAPHY</li>
                <li className="li-custom-main">ARCHITECTURE PHOTOGRAPHY</li>
                <div className="mt-4 ">
                  <ButtonCustom
                    type="button"
                    onClick={() => navigate("/search")}
                    className="text-white"
                    text="Search"
                  ></ButtonCustom>
                </div>
              </ul>
            </div>
            <div className=" w-75 d-flex justify-content-center align-items-center h-50  ">
              <img
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
                className="img-custom-main "
              />
            </div>
            <div className="div-custom-p w-75">
              <p className="p-3 ">
                Photography is the art and science of capturing light to create
                lasting images, acting as a powerful medium for storytelling,
                memory preservation, and artistic expression. It blends
                technical skill with creative vision, allowing photographers to
                freeze moments in time, evoke emotions, and showcase unique
                perspectives of the world.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default MainCustom;

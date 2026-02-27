import { useContext, useEffect, useState } from "react";
import "./searchingPage.css";
import { Container, Row, Col, Form, Button, Offcanvas } from "react-bootstrap";
import PhotoCard from "../photoCard/PhotoCard";
import FooterCustom from "../footer/FooterCustom";
import { API_URL } from "../../config/api";
import NavbarCustom from "../navigation/NavbarCustom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
const SearchingPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [maxPrice, setMaxPrice] = useState(999);
  const [minPrice, setMinPrice] = useState(0);
  const [photos, setPhotos] = useState([]);

  const [photoByTitle, setPhotoByTitle] = useState([]);
  const [showNtf, setShowNtf] = useState(false);
  const [showSideBar, setShowSidebar] = useState(false);

  const show = () => {
    setShowSidebar(true);
  };
  const showOff = () => {
    setShowSidebar(false);
  };
  const list = photoByTitle.length > 0 ? photoByTitle : photos;

  const filtered = list.filter((photo) => {
    const price = Number(photo.price);
    if (!Number.isFinite(price)) return true; //isFinite controlla che sia un numero e che non sia Infinito negativo e positivo
    return price <= maxPrice;
  });

  const getPhotoByTitle = async (searchValue) => {
    setShowNtf(false);
    if (!searchValue?.trim()) {
      // ?=> evita il crash in caso il value sie undefined
      setPhotoByTitle([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/photos/title/${searchValue}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setShowNtf(true);
      }
      const data = await response.json();
      console.log(data);
      setPhotoByTitle(data.photos ?? []);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllPhoto = async () => {
    try {
      const response = await fetch(`${API_URL}/photos`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPhotos(data.photos.photos);

      console.log(data.photos.photos.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitOn = async (e) => {
    e.preventDefault();
    await getPhotoByTitle(searchValue);
  };

  console.log(searchValue);
  useEffect(() => {
    getAllPhoto();
  }, []);

  return (
    <div className="div-background-searching-page ">
      <NavbarCustom />
      <Container fluid>
        <Row className="d-flex justify-content-between align-items-center">
          <Col xs={3}>
            <div>
              <button className="btn-filter" onClick={show}>
                Filter
              </button>

              <Offcanvas show={showSideBar} onHide={showOff}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <form onSubmit={submitOn} className=" ">
                    <div>
                      {" "}
                      <label for="range1" className="form-label">
                        Price
                      </label>
                      <Slider
                        range
                        min={0}
                        max={999}
                        value={[minPrice, maxPrice]}
                        onChange={(value) => {
                          setMinPrice(value[0]);
                          setMaxPrice(value[1]);
                        }}
                        handleRender={(node, props) => (
                          <Tooltip
                            overlay={`${props.value}€`}
                            visible
                            placement="top"
                            key={props.index}
                          >
                            {node}
                          </Tooltip>
                        )}
                      />
                      <p className="mt-2">
                        {minPrice}€ - {maxPrice}€
                      </p>
                    </div>
                  </form>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Col>
          <Col xs={9}>
            <div className="mt-3 mb-3">
              <form
                className="w-100 d-flex justify-content-center gap-2"
                onSubmit={submitOn}
              >
                <input
                  className="w-100 search-bar"
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                ></input>
                <button type="submit" className="search-button-custom">
                  Search
                </button>
              </form>
            </div>
          </Col>
        </Row>

        <Row className="mt-4 custom-height  ">
          {showNtf ? (
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center  flex-grow-1 "
            >
              <div className="d-flex align-items-center justify-content-center w-100 ">
                <h1 className="text-white">No Results found...</h1>
              </div>
            </Col>
          ) : (
            filtered.map((photo) => (
              <Col
                xs={12}
                md={4}
                className="d-flex justify-content-between "
                key={photo._id}
              >
                <PhotoCard
                  title={photo.title}
                  userName={photo.user.firstName}
                  lastName={photo.user.lastName}
                  src={photo.image}
                  photo={photo}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
      <FooterCustom />
    </div>
  );
};
export default SearchingPage;

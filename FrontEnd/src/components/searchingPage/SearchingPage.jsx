import { useContext, useEffect, useState } from "react";
import "./searchingPage.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import PhotoCard from "../photoCard/PhotoCard";
import FooterCustom from "../footer/FooterCustom";
const SearchingPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoByTitle, setPhotoByTitle] = useState([]);

  const getPhotoByTitle = async (searchValue) => {
    if (!searchValue?.trim()) {
      // ?=> evita il crash in caso il value sie undefined
      setPhotoByTitle([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4545/photos/title/${searchValue}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await response.json();
      console.log(data);
      setPhotoByTitle(data.photos ?? []);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllPhoto = async () => {
    try {
      const response = await fetch("http://localhost:4545/photos", {
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
    <>
      <Container fluid className="bg-warning">
        <Row>
          <Col xs={4}>
            <div>
              <form>
                <label for="range1" className="form-label">
                  Price
                </label>
                <input
                  type="range"
                  className="form-range"
                  id="range1"
                  min="0"
                  max="9999"
                ></input>
                <output
                  for="range4"
                  id="rangeValue"
                  aria-hidden="true"
                ></output>
              </form>
            </div>
          </Col>
          <Col xs={8}>
            <div className="mt-5">
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

          <Col xs={12} className="d-flex ">
            {photoByTitle.map((photo) => (
              <PhotoCard
                key={photo._id}
                title={photo.title}
                userName={photo.user.firstName}
                lastName={photo.user.lastName}
                src={photo.image}
                photo={photo}
              ></PhotoCard>
            ))}
          </Col>
        </Row>
      </Container>
      <FooterCustom />
    </>
  );
};
export default SearchingPage;

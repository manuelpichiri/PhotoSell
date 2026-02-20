import "./buttonCustom.css";
import { Button } from "react-bootstrap";
import { CircleArrowRight } from "lucide-react";
const ButtonCustom = ({ text, onClick, type, className }) => {
  return (
    <>
      <Button
        className={`btn border-custom  position-icon text-size ${className} `}
        type={type}
        onClick={onClick}
      >
        {text}
        <CircleArrowRight
          color="#fafafa"
          size={20}
          absoluteStrokeWidth={false}
        />
      </Button>
    </>
  );
};
export default ButtonCustom;

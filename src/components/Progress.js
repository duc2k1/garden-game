import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";
//
const Container = Styled.div`
    progress[value]{
        width: ${(props) => props.width};
        textAlign:"center";
    }
`;
//
export default function ProgressBar({ value, max, width }) {
  return (
    <Container width={width}>
      <progress value={value} max={max} />
    </Container>
  );
}
//
ProgressBar.prototype = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  width: PropTypes.string,
};
//
ProgressBar.defaultProps = {
  max: 0,
  width: "60px",
};

import styled from "styled-components";

export default function GridButton({
  isPlayed = false,
  soundPlay,
  id,
  handSampleChange,
}) {
  return (
    <Wrapper isPlayed={isPlayed} onClick={soundPlay}>
      <label onClick={(e) => e.stopPropagation()} htmlFor={id}>
        ♫
      </label>
      <input
        onClick={(e) => e.stopPropagation()}
        id={id}
        type="file"
        onChange={handSampleChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 4px;
  background: #40407a;
  background: radial-gradient(circle, #2c2c54 0%, #474787 100%);
  position: relative;
  overflow: hidden;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: radial-gradient(
      circle,
      #40407a ${(props) => (props.isPlayed ? "20%" : "0%")},
      #706fd3 100%
    );
    opacity: ${(props) => (props.isPlayed ? "1" : "0")};
    transition: linear 0.2s;
  }
  &:hover::before {
    opacity: 1;
  }
  &:active::before {
    opacity: 1;
    background: radial-gradient(circle, #40407a 30%, #706fd3 100%);
  }
  & input {
    display: none;
  }
  & label {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 24px;
  }
`;

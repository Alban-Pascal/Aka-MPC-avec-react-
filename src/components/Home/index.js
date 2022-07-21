import styled from "styled-components";

import GridButton from "./GridButton";

import useSound from "hooks/useSounds";

export default function Home() {
  const { buttonList } = useSound();
  return (
    <Wrapper>
      <Grid>
        {buttonList.map(
          ({ soundPlay, isPlayed, id, handSampleChange }, index) => {
            return (
              <GridButton
                key={index}
                soundPlay={soundPlay}
                isPlayed={isPlayed}
                id={id}
                handSampleChange={handSampleChange}
              />
            );
          }
        )}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  width: 400px;
  height: 400px;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  row-gap: 12px;
  margin: auto;

  @media (max-width: 60px) {
    width: 300px;
    height: 300px;
  } ;
`;

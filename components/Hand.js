import styled from "styled-components";

const Hand = ({ angle }) => {
  return (
    <Narrow style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}>
      <WideBody />
    </Narrow>
  )
}

export default Hand

const Narrow = styled.div`
    height: 30px;
    width: 3px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    bottom: 134px;
    transform-origin: bottom center;
`;

const WideBody = styled.div`
    height: 55px;
    width: 6px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
    border-radius: 3px;
`;

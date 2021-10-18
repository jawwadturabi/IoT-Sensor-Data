import Loader from "react-loader-spinner";
export default function MyLoader({ color, width, height }) {
  //other logic
  return <Loader type='Puff' color={color} height={height} width={width} />;
}

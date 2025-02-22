interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => (
  <h1 style={{ color: "white", margin: 0 }}>{text}</h1>
);

export default Title;

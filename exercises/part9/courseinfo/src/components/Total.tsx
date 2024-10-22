interface TotalProps {
  sum: number;
}

const Total = (props: TotalProps) => <p>Number of exercises {props.sum}</p>;

export { Total };

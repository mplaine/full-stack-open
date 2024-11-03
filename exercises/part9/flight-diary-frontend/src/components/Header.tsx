interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => <h2>{name}</h2>;

export { Header };

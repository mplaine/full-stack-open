interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => <h1>{name}</h1>;

export { Header };

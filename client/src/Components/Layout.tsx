import MenuAppBar from "./AppBar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = (props: Props) => {
  return (
    <div>
      <MenuAppBar />
      {props.children}
    </div>
  );
};

export default Layout;

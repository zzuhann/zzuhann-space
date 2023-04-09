import { Home } from "../components/home";
import { getLayout } from "../layout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <Home />;
};

Page.getLayout = getLayout;

export default Page;

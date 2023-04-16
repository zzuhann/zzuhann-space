import { AddPosts } from '@/features/addPosts';
import { getLayout } from '@/layout';

const Page = () => {
  return <AddPosts />;
};

Page.getLayout = getLayout;

export default Page;

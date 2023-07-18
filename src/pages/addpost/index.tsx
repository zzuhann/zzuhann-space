import PostForm from '@/features/postForm/PostForm';
import { getLayout } from '@/layout';

const Page = () => {
  return <PostForm />;
};

Page.getLayout = getLayout;

export default Page;

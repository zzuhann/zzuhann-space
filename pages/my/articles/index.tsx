import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useEffect, useState } from "react";
import MyArticle from "../../../components/myArticles/MyArticle";
import { IArticleFirestore } from "../../../common/articleType";

const AllMyArticles = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>([]);

  async function getTargetCollections() {
    const q = query(collection(db, "articles"));
    const querySnapshot = await getDocs(q);
    const newArticles: IArticleFirestore[] = [];
    querySnapshot.forEach((doc) => {
      newArticles.push({
        id: doc.id,
        ...doc.data(),
      } as IArticleFirestore);
    });
    setArticles(newArticles);
  }

  useEffect(() => {
    getTargetCollections();
  }, []);
  return <MyArticle articles={articles} setArticles={setArticles} />;
};

export default AllMyArticles;

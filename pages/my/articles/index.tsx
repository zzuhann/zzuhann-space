import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useEffect, useState } from "react";
import { IArticle } from "../../../common/firebaseFun";

const Container = styled.div``;

const AllMyArticles = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  async function getTargetCollections() {
    const q = query(collection(db, "articles"));
    const querySnapshot = await getDocs(q);
    const newArticles: IArticle[] = [];
    querySnapshot.forEach((doc) => {
      newArticles.push(doc.data() as IArticle);
    });
    setArticles(newArticles);
  }

  useEffect(() => {
    getTargetCollections();
  }, []);
  return <Container>home</Container>;
};

export default AllMyArticles;

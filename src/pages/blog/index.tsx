import Blog from "../../components/Blog";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getAllArticles } from "../../lib/post";
import { PostData } from "../../types/Post";

type IndexProps = {
  articles: PostData[];
};

const Index = ({ articles }: IndexProps) => {
  console.log(articles);
  return (
    <div className="relative overflow-hidden">
      <Header />
      <Blog articles={articles} />
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const articles = await getAllArticles();

  return {
    props: {
      articles,
    },
  };
};

export default Index;

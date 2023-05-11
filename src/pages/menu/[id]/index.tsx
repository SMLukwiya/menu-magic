import { type NextPage } from "next";
import ExamplePostDetailPage from "@/components/menu/pages/detail.page";

type Props = {
  id: string;
};

const ShowPost: NextPage<Props> = ({ id }: Props) => {
  return <ExamplePostDetailPage id={id} />;
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default ShowPost;

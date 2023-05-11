import { type NextPage } from "next";
import { EditExamplePostForm } from "@/components/menu/pages/edit.page";

type Props = {
  id: string;
};

const EditPost: NextPage<Props> = ({ id }: Props) => {
  return <EditExamplePostForm id={id} />;
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default EditPost;

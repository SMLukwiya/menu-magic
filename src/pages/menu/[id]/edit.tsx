import { type NextPage } from "next";
import { EditMenuForm } from "@/components/menu/pages/edit.page";

type Props = {
  id: string;
};

const EditMenu: NextPage<Props> = ({ id }: Props) => {
  return <EditMenuForm id={id} />;
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default EditMenu;

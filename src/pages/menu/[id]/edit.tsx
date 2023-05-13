import { type NextPage } from "next";

type Props = {
  id: string;
};

const EditMenu: NextPage<Props> = ({ id }: Props) => {
  return <></>;
};

export function getServerSideProps(context: { params: Props }) {
  return {
    props: { id: context.params.id },
  };
}

export default EditMenu;

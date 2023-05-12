import { Layout } from "@/components/layout/layout";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import { ArrowDownIcon } from "lucide-react";

import { useUser } from "@clerk/clerk-react";
import { type ValidationSchemaForMenuItem } from "@/server/api/validation-schemas/menu.schema";

const ListMenuPage = () => {
  const { user } = useUser();
  const query = api.menu.list.useQuery({ userId: user?.id || "" });

  const menu = query.data;

  return (
    <Layout>
      <div className="flex h-full flex-col gap-2 py-2">
        <div className="flex w-full items-start justify-between">
          <div className="pb-3">
            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-slate-300">
              My Menu
            </h1>
            <p className="text-sm text-muted-foreground">
              The fast and easy way to create menus.
            </p>
          </div>

          <Button disabled className="border disabled:text-slate-500">
            English
            <ArrowDownIcon className="ml-4 h-4 w-4" />
          </Button>
        </div>
        <div className="relative h-full space-y-3 pt-3">
          {(!menu || !user) && <LoadingPage />}
          {menu &&
            user &&
            menu.map((item) => <MenuItemComponent item={item} key={item.id} />)}
          <div className="pt-8"></div>
        </div>
      </div>
    </Layout>
  );
};

function MenuItemComponent({ item }: { item: ValidationSchemaForMenuItem }) {
  return (
    <div
      id={item.id}
      className="border-b border-b-slate-600 pb-2"
      key={item.id}
    >
      <h1 className="font-semibold text-slate-200">{item.title}</h1>
      <div className="flex items-end justify-between">
        <p className="text-sm text-slate-300">{item.description}</p>
        <p className="text-sm font-semibold text-slate-200">${item.price}</p>
      </div>
    </div>
  );
}

export default ListMenuPage;

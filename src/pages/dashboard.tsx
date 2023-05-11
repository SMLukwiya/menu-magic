import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pb-3">
        <div className="relative my-8 h-36 w-56">
          <Image src="/magic-wand.png" alt="wand" fill />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-100">
            Ready for some menu magic?
          </h1>
          <p className="my-5 text-base text-slate-300">
            Import your menu, and watch our AI transform it into a smart menu
            that speaks multiple langauges.
          </p>
          <ActionButton
            text="Paste as text"
            disabled={false}
            path="/menu/new"
          />
          <ActionButton
            text="Upload PDF (coming soon)"
            disabled={true}
            path="/dashboard"
          />
          <ActionButton
            text="Import from website (Coming soon)"
            disabled={true}
            path="/dashboard"
          />
        </div>
      </div>
    </Layout>
  );
};

interface Props {
  text: string;
  disabled: boolean;
  path: string;
}

function ActionButton({ text, disabled, path }: Props) {
  return (
    <div>
      <Link href={path}>
        <Button
          variant="ghost"
          className="my-2 w-72 rounded-md bg-slate-100 py-2 text-center text-sm hover:bg-slate-200/70 disabled:bg-gray-400"
          disabled={disabled}
        >
          {text}
        </Button>
      </Link>
    </div>
  );
}

export default Dashboard;

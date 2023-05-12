import { type NextPage } from "next";

import { NavigationHomepage } from "@/components/layout/navigation-homepage";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-900">
      <NavigationHomepage />
      <main className="flex items-center justify-center px-4 text-center sm:px-8">
        <div className="mt-20 flex max-w-[1100px] flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-slate-100 md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Smart QR Menus for your Restaurant
          </h1>
          <p className="max-w-[640px] text-lg text-slate-400 dark:text-slate-400 sm:text-xl">
            Ready for some menu magic? Import your menu and watch our AI
            transform it into a smart menu that speaks multiple langauges.
          </p>
        </div>
      </main>
      <div className="m-auto max-w-5xl px-12 pt-12 2xl:max-w-7xl">
        <Image
          src="/Screenshot-app.png"
          alt="screenshot of app"
          width={2310}
          height={1118}
          className="rounded-t-3xl border border-b-0 shadow-2xl 2xl:rounded-3xl 2xl:border-b"
        />
      </div>
    </div>
  );
};

export default Home;

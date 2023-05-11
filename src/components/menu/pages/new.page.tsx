import Image from "next/image";
import { Button } from "@/components/ui/button";
import { handlePromise } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useZodForm } from "@/hooks/use-zod-form";
import { toast } from "@/components/ui/use-toast";
import { validationSchemaInput } from "@/server/api/validation-schemas/menu.schema";
import { useRouter } from "next/router";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { ActionsTopbar } from "@/components/layout/actions-topbar";
import { Layout } from "@/components/layout/layout";

const NewMenuForm = () => {
  const router = useRouter();
  const ctx = api.useContext();
  const mutation = api.menu.create.useMutation({
    onSuccess: async () => {
      toast({
        description: "Your menu has been created.",
      });

      await ctx.menu.invalidate();
      await router.push("/menu");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast({
          variant: "destructive",
          description: errorMessage[0],
        });
      } else {
        toast({
          variant: "destructive",
          description: "Error! Please try again later.",
        });
      }
    },
  });

  const form = useZodForm({
    schema: validationSchemaInput,
  });

  return (
    <Layout noPadding fullScreenOnMobile>
      <form
        onSubmit={handlePromise(
          form.handleSubmit((data) => mutation.mutate(data))
        )}
      >
        <ActionsTopbar>
          <Link href="/menu">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </ActionsTopbar>

        <div className="flex justify-center p-3 md:px-8 md:py-6">
          <div className="flex max-w-2xl flex-col items-center justify-center space-y-4">
            <div className="relative my-8 h-32 w-56">
              <Image src="/magic-wand.png" alt="wand" fill />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-slate-100">
                Paste your menu
              </h1>
              <p className="my-3 text-base text-slate-300">
                Simply paster your menu as text, and our AI will turn it into a
                smart menu that speaks multiple langauges.
              </p>
            </div>
            <div className="w-full space-y-1">
              <Textarea
                id="menu"
                defaultValue=""
                {...form.register("menu")}
                className="h-auto text-slate-200"
                rows={10}
              />
              {form.formState.errors.menu?.message && (
                <p className="text-red-600">
                  {form.formState.errors.menu?.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={mutation.isLoading}
              variant="ghost"
              className="my-2 w-72 rounded-md bg-slate-100 py-2 text-center text-sm hover:bg-slate-200/70 disabled:bg-gray-400"
            >
              {mutation.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate smart menu
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export { NewMenuForm };

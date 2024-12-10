"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wykonano } from "./data-acces";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";

export default function Problem({ problem }) {
  const queryClient = useQueryClient();

  //   console.log(problem);
  const mutation = useMutation({
    mutationFn: () => wykonano(problem),
    onSuccess: () => {
      console.log("mutacja");
      queryClient.invalidateQueries("problemList");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <Card className="w-1/2  border-0">
      <CardHeader>
        <CardTitle>
          {problem.imieUcznia} {problem.nazwiskoUcznia}
        </CardTitle>
        <CardDescription>{formatDate(problem.data_utworzenia)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{problem.tresc}</p>
      </CardContent>
      <CardFooter>
        <ConfirmationAlert
          message={
            !problem.wykonano
              ? "Czy napewno problem został rozwiązany?"
              : "Czy chcesz anulować wykonanie problemu?"
          }
          description={""}
          cancelText={"Powrót"}
          triggerElement={
            !problem.wykonano ? (
              <Button>Wykonano</Button>
            ) : (
              <Button>Anuluj wykonanie</Button>
            )
          }
          mutationFn={() => mutation.mutateAsync()}
          toastError={{
            variant: "destructive",
            title: "Nie udało się wykonać operacji.",
            description: "Spróbuj ponownie później.",
          }}
          toastSucces={
            !problem.wykonano
              ? {
                  title: `Wykonano problem.`,
                  description: "",
                }
              : {
                  title: `Anulowanie wykonania problemu.`,
                  description: "",
                }
          }
          onSuccesCustomFunc={() =>
            queryClient.invalidateQueries({ queryKey: ["problemList"] })
          }
        />
      </CardFooter>
    </Card>
  );
}

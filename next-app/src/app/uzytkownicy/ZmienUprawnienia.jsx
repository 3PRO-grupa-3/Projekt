import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRoundPen } from "lucide-react";
import React from "react";
import { przelaczNaAdmina, przelaczNaUcznia } from "./data-acces";

export default function ZmienUprawnienia({ user }) {
  const queryClient = useQueryClient();

  const uprawnieniaMutation = useMutation({
    mutationFn: () => {
      if (user.rola === "admin") {
        przelaczNaUcznia(user);
      } else {
        przelaczNaAdmina(user);
      }
    },
    onSuccess: () => {
      console.log("mutacja");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ConfirmationAlert
      message={
        user.rola === "admin"
          ? "Czy napewno chcesz nadać uprawnienia ucznia?"
          : "Czy napewno chcesz nadać uprawnienia admina?"
      }
      description={
        user.rola === "admin"
          ? "Uczeń może przeglądać zbiórki, dodawać komentarze i zgłaszać problemy."
          : "Admin może zarządzać zbiórkami, użytkownikami, komentarzami i problemami."
      }
      cancelText={"Powrót"}
      triggerElement={
        user.rola === "admin" ? (
          <Button className="w-full  flex flex-row justify-center">
            Przełącz na Ucznia <UserRoundPen />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full flex flex-row justify-center"
          >
            Przełącz na Administratora <UserRoundPen />
          </Button>
        )
      }
      mutationFn={() => uprawnieniaMutation.mutateAsync()}
      toastError={{
        variant: "destructive",
        title: "Coś poszło nie tak.",
        description: "Spróbuj ponownie później.",
      }}
      toastSucces={
        user.rola === "admin"
          ? {
              title: `${user.imie} ${user.nazwisko} otrzymał uprawnienia ucznia`,
            }
          : {
              title: `${user.imie} ${user.nazwisko} otrzymał uprawnienia administratora`,
            }
      }
      onSuccesCustomFunc={() =>
        queryClient.invalidateQueries({ queryKey: ["listOfUsers"] })
      }
    />
  );
}

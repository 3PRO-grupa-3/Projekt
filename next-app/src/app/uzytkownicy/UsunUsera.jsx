import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { usunUzytkownika } from "./data-acces";

export default function UsunUsera({ user }) {
  const queryClient = useQueryClient();

  const usunUseraMutation = useMutation({
    mutationFn: () => usunUzytkownika(user),
    onSuccess: () => {
      console.log("mutacja");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ConfirmationAlert
      message={"Czy napewno chcesz usunąć użytkownika?"}
      description={
        "Tej akcji nie można cofnąć, użytkownik straci dostęp do aplikacji."
      }
      cancelText={"Powrót"}
      triggerElement={
        <Button variant="destructive">
          Usuń użytkownika <Trash />
        </Button>
      }
      mutationFn={() => usunUseraMutation.mutateAsync()}
      toastError={{
        variant: "destructive",
        title: "Nie udało się wykonać polecenia.",
        description: "Spróbuj ponownie później.",
      }}
      toastSucces={{
        title: "Uczeń został dodany do zbiórki",
        description: "",
      }}
      onSuccesCustomFunc={() =>
        queryClient.invalidateQueries({ queryKey: ["listOfUsers"] })
      }
    />
  );
}
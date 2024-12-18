import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addUczenToZbiorkaFinal, fetchUczen, fetchUsers } from "../data-acces";
import { cn } from "@/lib/utils";
import { useQueryClient } from '@tanstack/react-query';
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import SpinnerLoading from "@/lib/basicComponents/SpinnerLoading";

export default function DodajUczniaLista({ daneZbiorka, onStudentAdded }) {
  const queryClient = useQueryClient();
  const [usersNotInZbiorka, setUsersNotInZbiorka] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, refetch, isLoading: isLoadingUsers, error: errorUSers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: relacjeZbiorka, isLoading: isLoadingURelacje, error: errorRelacje } = useQuery({
    queryKey: ["uzytkownicyRelacje"],
    queryFn: fetchUczen,
  });

  useEffect(() => {
    try {
      if (!users || !relacjeZbiorka || !daneZbiorka) return;

      const allUsersIds = users.map((user) => user.id);

      const allIdInZbiorka = relacjeZbiorka
        .filter((item) => item.id_zbiorki === daneZbiorka.id)
        .map((item) => item.id_ucznia);

      const allUsersNotInZbiorka = allUsersIds.filter(
        (id) => !allIdInZbiorka.includes(id)
      );

      const filteredUsers = users.filter((user) =>
        allUsersNotInZbiorka.includes(user.id)
      );
      const finalUsers = filteredUsers.filter((user) => user.rola === "uczen");

      setUsersNotInZbiorka(finalUsers);
    } catch (error) {
      throw new Error(error);
    }
  }, [users, relacjeZbiorka, daneZbiorka]);

  if (isLoadingUsers || isLoadingURelacje) {
    return <SpinnerLoading />;
  }

  if (errorRelacje || errorUSers) {
    throw new Error(errorRelacje?.message || errorUSers?.message);
  }

  const handleSelect = (user) => {
    try {
      setSelectedUser(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleAddStudent = async () => {
    if (selectedUser && daneZbiorka) {
      try {
        await addUczenToZbiorkaFinal(daneZbiorka.id, selectedUser.id);

        onStudentAdded();

        setOpen(false);
        await queryClient.invalidateQueries("uzytkownicyRelacje");
        await refetch();
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between py-2 px-4 rounded-md text-primary bg-background border border-gray-300 hover:bg-secondary-100 focus:ring-2 focus:ring-primary"
          >
            {selectedUser
              ? `${selectedUser.imie} ${selectedUser.nazwisko}`
              : "Wybierz Ucznia"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0 bg-white border rounded-lg shadow-md">
          <Command>
            <CommandInput placeholder="Wyszukaj ucznia..." className="p-2 border-b border-gray-300" />
            <CommandList>
              <CommandEmpty>Nie znaleziono ucznia</CommandEmpty>
              <CommandGroup>
                {usersNotInZbiorka != null && usersNotInZbiorka.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={`${user.imie} ${user.nazwisko}`}
                    onSelect={() => handleSelect(user)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {`${user.imie} ${user.nazwisko}`}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedUser === user ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <ConfirmationAlert
        message={"Czy na pewno chcesz dodać tego ucznia do zbiórki?"}
        cancelText={"Powrót"}
        triggerElement={<Button className="bg-secondary hover:bg-secondary-600 text-white py-2 px-4 rounded-md">Dodaj Ucznia</Button>}
        mutationFn={() => console.log("")}
        toastError={{
          variant: "destructive",
          title: "Nie udało się wykonać polecenia.",
          description: "Spróbuj ponownie później.",
        }}
        toastSucces={{
          title: "Uczeń został dodany do zbiórki",
          description: "",
        }}
        onSuccesCustomFunc={handleAddStudent}
      />
    </div>
  );
}

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

export default function DodajUczniaLista({ daneZbiorka, onStudentAdded }) {
  const { data: users,refetch} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: relacjeZbiorka} = useQuery({
    queryKey: ["uzytkownicyRelacje"],
    queryFn: fetchUczen
  });

  const queryClient = useQueryClient();


  const [usersNotInZbiorka,setUsersNotInZbiorka] = useState(null)
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

    // const allUsersIds = users.map((user) => user.id);

    // const allIdInZbiorka = relacjeZbiorka
    //     ?.filter((item) => item.id_zbiorki === daneZbiorka.id)
    //     .map((item) => item.id_ucznia);

    // const allUsersNotInZbiorka = allIdInZbiorka?.map((item)=>allUsersIds!=allIdInZbiorka)

    // setUsersNotInZbiorka(allUsersNotInZbiorka)

    useEffect(() => {
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
    
      setUsersNotInZbiorka(filteredUsers);
      // console.log("Users in zbiórka:", allIdInZbiorka);
      // console.log("Users not in zbiórka:", filteredUsers);
    }, [users, relacjeZbiorka, daneZbiorka]);
    


    const handleSelect = (user) => {
      setSelectedUser(user);
      // console.log("Selected User:", user);
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
          console.error("Failed to add student to zbiórka:", error);
        }
      }
    };
    
    

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUser
            ? `${selectedUser.imie} ${selectedUser.nazwisko}`
            : "Wybierz Ucznia"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Wyszukaj ucznia..." />
          <CommandList>
            <CommandEmpty>Nie znaleziono ucznia</CommandEmpty>
            <CommandGroup>
              {usersNotInZbiorka!=null && usersNotInZbiorka.map((user) => (
                <CommandItem
                  key={user.id}
                  value={`${user.imie} ${user.nazwisko}`}
                  onSelect={() => handleSelect(user)}
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
      {/* <Button onClick={handleAddStudent} disabled={!selectedUser}>
        Dodaj test
      </Button> */}

      <ConfirmationAlert
              message={"Czy napewno chcesz dodać tego ucznia do zbiórki"}
              cancelText={"Powrót"}
              triggerElement={<Button>Dodaj Ucznia</Button>}
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
              onSuccesCustomFunc={
                handleAddStudent
              }
            />
    </Popover>

  );
}

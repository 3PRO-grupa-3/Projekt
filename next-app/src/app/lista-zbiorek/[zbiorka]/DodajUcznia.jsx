import { useState } from "react";
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
import { addUczenToZbiorkaFinal, fetchUsers } from "../data-acces";
import { cn } from "@/lib/utils";

export default function DodajUczniaLista({ daneZbiorka, onStudentAdded }) {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelect = (user) => {
    setSelectedUser(user);
    console.log("Selected User:", user);
  };

  const handleAddStudent = async () => {
    if (selectedUser && daneZbiorka) {
      try {
        await addUczenToZbiorkaFinal(daneZbiorka.id, selectedUser.id);
        onStudentAdded();
        setOpen(false);
      } catch (error) {
        console.error("Failed to add student to zbiórka:", error);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
              {users.map((user) => (
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
      <Button onClick={handleAddStudent} disabled={!selectedUser}>
        Dodaj Ucznia
      </Button>
    </Popover>
  );
}

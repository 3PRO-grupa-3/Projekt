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

export const addUczenToZbiorka = (daneZbiorka, uczenId) => {
    if (uczenId && daneZbiorka) {
      console.log("Uczeń ID:", uczenId);
      console.log("Dane Zbiórka:", daneZbiorka);
      addUczenToZbiorkaFinal(daneZbiorka.id, uczenId);
    } else {
      console.log("Brak danych dla ucznia lub zbiórki.");
    }
  };
  

export default function DodajUczniaLista() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    console.log("Selected Value:", newValue);
    addUczenToZbiorka()
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
          {value
            ? users.find((user) => user.imie + " " + user.nazwisko === value)?.idk
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
                  value={user.imie + " " + user.nazwisko}
                  onSelect={handleSelect}
                >
                  {user.imie + " " + user.nazwisko}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === user.imie + " " + user.nazwisko ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

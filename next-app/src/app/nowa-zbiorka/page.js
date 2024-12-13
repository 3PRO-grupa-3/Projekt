"use client";

import InputWithLabel from "@/lib/basicComponents/InputWithLabel";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";
import { Plus } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { pocketbase } from "@/lib/pocketbase";

export default function Page() {
  const { user } = useUser();
  const [nowaZbiorkaInput, setNowaZbiorkaInput] = useState({
    tytul: "",
    opis: "",
    cel: 0,
    tryb: "prywatna",
    dataZakonczenia: "",
  });

  const handleTrybChange = (value) => {
    setNowaZbiorkaInput((prevState) => ({
      ...prevState,
      tryb: value,
    }));
  };

  const nowaZbiorkaMutation = useMutation({
    mutationFn: async () => insertNowaZbiorka(nowaZbiorkaInput, user),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center pt-14 pb-14">
      <div className="w-2/3">
        <h1 className="text-4xl">Nowa Zbiórka</h1>
        <p className="mt-4 text-muted-foreground">
          Wypełnij wymagane informacje aby rozpocząć nową zbiórkę.
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-8 gap-8">
        <div className="w-1/3 flex flex-col gap-4">
          <InputWithLabel
            inputType="text"
            labelText="Tytuł zbiórki"
            datafield="tytul"
            inputValue={nowaZbiorkaInput}
            dataSetter={setNowaZbiorkaInput}
          />
          <InputWithLabel
            inputType="textarea"
            labelText="Opis"
            datafield="opis"
            inputValue={nowaZbiorkaInput}
            dataSetter={setNowaZbiorkaInput}
          />
          <InputWithLabel
            inputType="number"
            labelText="Cel"
            datafield="cel"
            inputValue={nowaZbiorkaInput}
            dataSetter={setNowaZbiorkaInput}
          />
          <Label className="text-sm font-medium">Tryb Zbiórki</Label>
          <RadioGroup
            defaultValue={nowaZbiorkaInput.tryb}
            onValueChange={handleTrybChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prywatna" id="prywatna" />
              <Label htmlFor="prywatna">prywatna</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="publiczna" id="publiczna" />
              <Label htmlFor="publiczna">publiczna</Label>
            </div>
          </RadioGroup>

          <InputWithLabel
            inputType="date"
            labelText="Data zakończenia"
            datafield="dataZakonczenia"
            inputValue={nowaZbiorkaInput}
            dataSetter={setNowaZbiorkaInput}
          />

          <div className="w-full mt-4 flex justify-end items-end">
            <ConfirmationAlert
              message={`Czy napewno chcesz utworzyć nową zbiórkę?`}
              description={""}
              cancelText={"Powrót"}
              triggerElement={
                <Button>
                  Dodaj zbiórke <Plus />
                </Button>
              }
              mutationFn={() => nowaZbiorkaMutation.mutateAsync()}
              toastError={{
                variant: "destructive",
                title: "Nie udało się wykonać polecenia.",
                description: "Spróbuj ponownie później.",
              }}
              toastSucces={{
                title: `Utworzono nową zbiórkę.`,
                description: "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
async function insertNowaZbiorka(nowaZbiorkaInput, user) {
  console.log("insert");
  console.log({
    ...nowaZbiorkaInput,
    id_autora: user.id,
    cel: parseInt(nowaZbiorkaInput.cel),
    data_zakonczenia: convertToPocketBaseDate(nowaZbiorkaInput.dataZakonczenia),
  });

  try {
    const record = await pocketbase.collection("Zbiorki").create({
      ...nowaZbiorkaInput,
      id_autora: user.id,
      cel: parseInt(nowaZbiorkaInput.cel),
      data_zakonczenia: convertToPocketBaseDate(
        nowaZbiorkaInput.dataZakonczenia
      ),
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
function convertToPocketBaseDate(dateString) {
  // Ensure the input is in 'YYYY-MM-DD' format
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  // Format the date into the PocketBase format (ISO 8601 with UTC time)
  return date.toISOString(); // Automatically converts to 'YYYY-MM-DDTHH:mm:ss.sssZ'
}

// Example usage:
const date = "2024-12-13";
const pocketBaseDate = convertToPocketBaseDate(date);
console.log(pocketBaseDate); // Outputs: '2024-12-13T00:00:00.000Z'

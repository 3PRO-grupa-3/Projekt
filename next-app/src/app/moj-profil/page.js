"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Wplata from "./Wplata";
import { useQuery } from "@tanstack/react-query";
import { getWplaty } from "./data-acces";

export default function Page() {
  const {
    data: wplaty,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listaWplat"],
    queryFn: () => getWplaty(),
  });

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <h1>Zmień szczegóły konta</h1>
      <div className="">
        <p>Imię: {}</p>
        <p>Nazwisko: {}</p>
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edytuj dane </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Imię
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pobrac z bazy"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Nazwisko
                  </Label>
                  <Input
                    id="username"
                    defaultValue="pobrac z bazy"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Zapisz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {wplaty?.map((wplata) => {
        return <Wplata key={wplata.id} wplata={wplata} />;
      })}
    </div>
  );
}

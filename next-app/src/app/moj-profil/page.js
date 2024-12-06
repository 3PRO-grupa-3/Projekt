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

  const { user } = useUser();
  console.log("user", user);

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <h1>Zmień szczegóły konta</h1>
      <div className="">
        <p>Imię: {user?.imie}</p>
        <p>Nazwisko: {user?.nazwisko}</p>
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edytuj dane </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4s">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Imię
                  </Label>
                  <Input
                    defaultValue={user?.imie}
                    id="name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Nazwisko
                  </Label>
                  <Input
                    defaultValue={user?.nazwisko}
                    id="username"
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
      <div className="flex flex-row">
        {wplaty?.map((wplata) => {
          return <Wplata key={wplata.id} wplata={wplata} />;
        })}
      </div>
    </div>
  );
}

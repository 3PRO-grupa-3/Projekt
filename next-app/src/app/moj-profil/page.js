"use client"

import { useUser } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { fetchKomentarzeInUzytkownik, fetchProblemyInUzytkownik, fetchUzytkownicy, fetchWplatyInUzytkownik, fetchZBiorkiInUzytkownik } from "./data-acces"


export default function Page(){

 const {user} = useUser()
  console.log("user",user)

  const { zbiorki } = useQuery({
    queryKey: ['getZbiorkiUserInfo'],
    queryFn: fetchZBiorkiInUzytkownik(user?.id),
  });

  const { komentarze } = useQuery({
    queryKey: ['getZbiorkiUserInfo'],
    queryFn: fetchKomentarzeInUzytkownik(user?.id),
  });

  const { problemy } = useQuery({
    queryKey: ['getProblemyUserInfo'],
    queryFn: fetchProblemyInUzytkownik(user?.id),
  });

  const { wplaty } = useQuery({
    queryKey: ['getWplatyUserInfo'],
    queryFn: fetchWplatyInUzytkownik(user?.id),
  });

   
    return(
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
            <div>
                <h1>Historia wpłat</h1>
                <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>*tytul zbiorki*</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">kiedy wplacono:</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">ile wpłacono:</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label></Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
            </div>
        </div>
    )
}
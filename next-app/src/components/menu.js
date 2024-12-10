"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  Home,
  LayoutList,
  Megaphone,
  ShieldHalf,
  User,
  User2,
  Users,
} from "lucide-react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import ConfirmationAlert from "@/lib/basicComponents/ConfirmationAlert";

export default function Menu() {
  const router = useRouter();
  const { user, logout } = useUser();

  const items = [
    {
      title: "Strona główna",
      url: "/",
      icon: Home,
    },
    {
      title: "Zbiórki",
      url: "/lista-zbiorek",
      icon: LayoutList,
    },
    {
      title: "Moje zbiórki",
      url: "/moje-zbiorki",
      icon: ShieldHalf,
    },
    {
      title: "Problemy",
      url: "/problemy",
      icon: Megaphone,
    },
    {
      title: "Mój profil",
      url: "/moj-profil",
      icon: User,
    },
    ...(user?.rola === "admin"
      ? [
          {
            title: "Użytkownicy",
            url: "/uzytkownicy",
            icon: Users,
          },
        ]
      : []),
  ];
  return (
    <Sidebar>
      <SidebarContent className="flex flex-column justify-start items-center p-4">
        <div className="flex flex-row justify-between items-center">
          <p>
            {user?.imie} {user?.nazwisko}
          </p>
        </div>

        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        {user ? (
          <ConfirmationAlert
            message={`Czy napewno chcesz się wylogować?`}
            description={""}
            cancelText={"Powrót"}
            triggerElement={<Button variant="secondary">Wyloguj się</Button>}
            mutationFn={() => null}
            toastError={{
              variant: "destructive",
              title: "Nie udało się wylogować.",
              description: "Spróbuj ponownie później.",
            }}
            toastSucces={{
              title: `Wylogowano.`,
              description: "",
            }}
            onSuccesCustomFunc={() => logout()}
          />
        ) : (
          <Button variant="outline" onClick={() => router.push("/auth/login")}>
            Zaloguj się
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

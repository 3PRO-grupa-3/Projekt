"use client";
import React, { useEffect } from "react";
import { getUsers } from "./data-acces";
import { useQuery } from "@tanstack/react-query";
import SearchTable from "./SearchTable";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function page() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user?.rola);
      if (user?.rola !== "admin") {
        router.push("/");
      }
    }
  }, [user, router]);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listOfUsers"],
    queryFn: () => getUsers(),
  });

  return (
    <div className="w-full h-[100vh] flex flex-col justify-start items-center pt-14">
      {isLoading && <div>loading...</div>}
      {error && <div>error</div>}
      <div className="w-2/3">
        <div className="flex flex-row justify-start items-center">
          <h1 className="text-4xl">Użytkownicy</h1>
        </div>
        <div className="mt-4 text-muted-foreground">
          <p>Użyj tabeli poniżej aby zarządzaj uprawnieniami użytkowników</p>
        </div>
      </div>
      <SearchTable users={users} />
    </div>
  );
}

"use client";
import { useUser } from "@/hooks/useUser";
import SpinnerLoading from "@/lib/basicComponents/SpinnerLoading";
import { pocketbase } from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // console.log(pocketbase);
  const { user } = useUser();

  const {
    data: adminList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminList"],
    queryFn: () => getAdminList(),
    initialData: [],
  });

  // console.log(adminList);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-start items-center pt-14">
      {isLoading ? (
        // <SpinnerLoading />
        <div>Loading...</div>
      ) : (
        <div className="w-2/3">
          <h1 className="text-4xl">
            Witamy, {user?.imie} {user?.nazwisko}.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Użyj panelu po lewej stronie aby skorzystać z potrzebnych funkcji.
          </p>
          <div>
            <p className="mt-4 text-muted-foreground">
              Aktualnie posiadasz uprawnienia ucznia, pozwala ci to jedynie na
              interakcje ze zbiórkami.
            </p>
            <p className="mt-4 text-muted-foreground">
              Skontaktuj się z administratorami aby poznać szczegóły.
            </p>
            {!error ? (
              <ul className="mt-2 text-muted-foreground">
                {adminList?.map((admin) => {
                  return (
                    <li key={admin.id}>
                      - {admin.imie} {admin.nazwisko}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-destructive">
                Wystąpił błąd przy wyświetleniu administatorów.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
async function getAdminList() {
  try {
    const record = await pocketbase.collection("users").getFullList({
      sort: "created",
      filter: pocketbase.filter(`rola ~ {:rola}`, {
        rola: "admin",
      }),
    });
    return record;
  } catch (error) {
    throw new Error(error);
  }
}

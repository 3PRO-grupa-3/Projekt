import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getTitleFromWplata } from "./data-acces";

export default function Wplata({ wplata }) {
  const {
    data: zbiorkaWplaty,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tytulZbiorki", `${wplata.id_zbiorki}`],
    queryFn: () => getTitleFromWplata(wplata.id_zbiorki),

    refetchOnWindowFocus: false, // Disable refetching when window is refocused
  });

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0"); // Ensures two digits
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <div className="m-3">
      <Card className="w-[20vw]">
        <CardHeader>
          {zbiorkaWplaty !== undefined && (
            <CardTitle className="flex flex-col gap-2">
              <p>{zbiorkaWplaty[0].Tytul}</p>
              <p className="text-muted-foreground text-sm">
                {formatDate(wplata.data_utworzenia)}
              </p>
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <p>
              Wplacono: {wplata.kwota} ({wplata.typ_platnosci})
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}

"use client"
import React from 'react'
import { fetchUczen, fetchZbiorki } from './date-acces';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function page() {
  const userInfo = useUser();
  const { data: dataZbiorki } = useQuery({
    queryKey: ['mojeZbiorki'],
    queryFn: fetchZbiorki,
  });

  const { data: dataUzytkownik } = useQuery({
    queryKey: ['mzUsers'],
    queryFn: fetchUczen,
  });

  console.log("data", dataZbiorki);
  console.log("user", userInfo);
  console.log("uzytkownik", dataUzytkownik);

  const userId = userInfo?.user?.id;

  const filteredZbiorki = dataZbiorki?.filter((zbiorka) => {
    return dataUzytkownik?.some(uzytkownik => uzytkownik?.id_ucznia === userId && uzytkownik?.id_zbiorki === zbiorka?.id);
  });

  let zbiorkiToDisplay = [];
  
  if (userInfo?.user?.rola === "uczen") {
    zbiorkiToDisplay = filteredZbiorki;
  } else if (userInfo?.user?.rola === "admin") {
    zbiorkiToDisplay = dataZbiorki?.filter(zbiorka => zbiorka?.id_autora === userId);
  }

  return (
    <div>
      {zbiorkiToDisplay?.map((zbiorka) => (
        <Link key={`${zbiorka.id}-${zbiorka.Tytul}`} href={`lista-zbiorek/${zbiorka.Tytul}`}>
          <Card>
            <CardHeader>
              <CardTitle>{zbiorka.Tytul}</CardTitle>
              <CardDescription>{zbiorka.data_utworzenia}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(zbiorka.aktualnie_zebrano / zbiorka.cel) * 100}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { fetchZbiorki } from './data-acces';

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['zbiorki'],
    queryFn: fetchZbiorki,
  });
  console.log("data",data)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // useEffect(() => {
  //   if (data) {
  //     data.map((zbiorka) => {
  //       if (zbiorka.Title.includes(' ')) {
  //         console.log("test");
  //       }
  //     });
  //   }
  // }, [data]);
  

  return (
    <div>
      <h1>Lista Zbiórek</h1>
      {data?.map((zbiorka) => (
        zbiorka?.tryb=="publiczna" && <Link key={zbiorka.id} href={`lista-zbiorek/${zbiorka.Tytul}`}>
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

'use client';

import React from 'react';
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
import SpinnerLoading from '@/lib/basicComponents/SpinnerLoading';

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['zbiorki'],
    queryFn: fetchZbiorki,
  });

  if (isLoading) return <SpinnerLoading />;
  if (error) throw new Error(error);

  const publiczneZbiorki = data?.filter((zbiorka) => zbiorka?.tryb === 'publiczna');

  return (
    <div className="bg-background text-foreground p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Lista Zbiórek</h1>
      {publiczneZbiorki && publiczneZbiorki.length > 0 ? (
        publiczneZbiorki.map((zbiorka) => (
          <Link key={zbiorka.id} href={`lista-zbiorek/${zbiorka.Tytul}`}>
            <div className="border border-muted rounded-lg mb-6 hover:border-primary transition-all">
              <Card className="bg-card hover:bg-card-hover transition-all rounded-lg">
                <CardHeader className="bg-input text-primary-foreground rounded-t-lg p-4">
                  <CardTitle className="text-2xl font-semibold text-destructive-foreground">{zbiorka.Tytul}</CardTitle>
                  <CardDescription className="text-destructive-foreground text-sm">{new Date(zbiorka.data_utworzenia)
          .toISOString()
          .slice(0, 16)
          .replace('T', ' ')}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <Progress
                    value={(zbiorka.aktualnie_zebrano / zbiorka.cel) * 100}
                  />
                </CardContent>
              </Card>
            </div>
          </Link>
        ))
      ) : (
        <h2 className="text-xl text-muted-foreground">Brak Zbiórek możliwych do wyświetlenia</h2>
      )}
    </div>
  );
}

'use client'
import { useUser } from '@/hooks/useUser'
import React from 'react'
import { pocketbase } from '@/lib/pocketbase';
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';

export default function Page() {
  const { user, logout } = useUser()
  const [data,setData] = useState(null)

  //UseEffect do zmienienia na data-acces pozniej 
	useEffect(() => {
    const getData = async () => {
            try {
              const record = await pocketbase.collection('Zbiorki').getFullList({
            });
                setData(record)
                console.log(record)
              } catch (error) {
                throw new Error(error)
              }
        }
        getData()
    },[])

  return (
    <div>
      <h1>LISTA ZBIOREK, logged user: {user?.id}</h1>
      {data && data.map((zbiorki)=>(
        // {zbiorki.status==true && (
        <Link key={zbiorki.id} href={`lista-zbiorek/${zbiorki.Tytul}`}>
          <Card >
          <CardHeader>
            <CardTitle>{zbiorki.Tytul}</CardTitle>
            <CardDescription>{zbiorki.data_utworzenia}</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={zbiorki.cel / zbiorki.aktualnie_zebrano *10}></Progress>
          </CardContent>
          </Card>
        </Link>
        // )}
      ))}
    </div>
    )
}

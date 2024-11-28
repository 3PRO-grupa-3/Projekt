"use client"

import { pocketbase } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { use } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Page({params}){

    const zbiorkaParams = use(params)

    // const [dataZbiorka,setDataZbiorka] = useState("test")
    var daneZbiorka = []
    const [daneUczen,setDaneUczen] = useState(null)
    const [daneKomentarz,setDaneKomentarz] = useState(null)

    useEffect(() => {
        const getData = async () => {
                try {
                    const record = await pocketbase.collection('Zbiorki').getFirstListItem(`Tytul="${zbiorkaParams.zbiorka}"`, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    daneZbiorka = record
                  } catch (error) {
                    throw new Error(error)
                  }
            }
            getData()
        },[])

        useEffect(() => {
            const getData = async () => {
                    try {
                    //   const record = await pocketbase.collection('uczniowe').getFirstListItem(`id_zbiorki="${daneZbiorka.id}"`, {
                    //     expand: 'relField1,relField2.subRelField',
                    // });
                        const record = await pocketbase.collection('uczniowe').getFullList({
                          sort: '-id',
                          // filter: `id_zbiorki = "${daneZbiorka.id}"`
                      });
                        setDaneUczen(record)
                        console.log(record)
                      console.log("Tablica test" , daneZbiorka)
                      } catch (error) {
                        throw new Error(error)
                      }
                }
                getData()
            },[])

            useEffect(() => {
              const getData = async () => {
                      try {
                          
                        const record = await pocketbase.collection('komentarze').getFullList({
                          sort: '-tresc',
                      });
                          setDaneKomentarz(record)
                          console.log(record)
                        } catch (error) {
                          throw new Error(error)
                        }
                  }
                  getData()
              },[])

        return(
            <div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{daneZbiorka.Tytul}</CardTitle>
                    <CardDescription>{daneZbiorka.data_zakonczenia}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h1>{daneZbiorka.opis}</h1>
                    <p>{daneZbiorka.cena_na_ucznia}</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Button>ZGLOS PROBLEM</Button>
                <Button>EDYTUJ SZCZEGOLY</Button>
                <Button>ZAKONCZ/ZAKONCZONA</Button>
                <Button>PRZYPOMNIJ O ZBIORCE</Button>
              </div>  
              <div>
                <div>
                  <h1>Lista Uczniów</h1>
                  <Input ></Input>
                  <Button>Dodaj Ucznia</Button>
                </div>
                {daneUczen && daneUczen.map((uczen)=>(
                  <Card>
                    <CardHeader>
                      <CardTitle></CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
        )
}
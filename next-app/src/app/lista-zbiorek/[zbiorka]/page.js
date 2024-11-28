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

export default function Page({params}){

    const zbiorkaParams = use(params)

    // const [dataZbiorka,setDataZbiorka] = useState("test")
    var daneZbiorka = []
    const [dataUczen,setDataUczen] = useState(null)


    useEffect(() => {
        const getData = async () => {
                try {
                    const record = await pocketbase.collection('Zbiorki').getFirstListItem(`Tytul="${zbiorkaParams.zbiorka}"`, {
                        expand: 'relField1,relField2.subRelField',
                    });
                    daneZbiorka = record
                    console.log(record)
                  } catch (error) {
                    throw new Error(error)
                  }
            }
            getData()
        },[])

        useEffect(() => {
            const getData = async () => {
                    try {
                        // const record = await pocketbase.collection('uczniowie').getFirstListItem(`id_zbiorki="${daneZbiorka.id}"`, {
                        //     expand: 'relField1,relField2.subRelField',
                        // });
                        const record = await pocketbase.collection('uczniowie').getFullList({
                        });
                        // setDataUczen(record)
                        console.log(record)
                      } catch (error) {
                        throw new Error(error)
                      }
                }
                getData()
            },[])

        return(
            <div>

            </div>
        )
}
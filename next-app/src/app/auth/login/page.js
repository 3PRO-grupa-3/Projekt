"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { login } from "../data-acces";
import { pocketbase, user } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import SpinnerLoading from "@/lib/basicComponents/SpinnerLoading";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function page() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    pocketbase.authStore?.isValid && router.push("/lista-zbiorek");
  }, []);

  // react query mutation
  // https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      await login(loginData);
    },
    onError: (error) => {
      console.log("Error occurred:", error);
    },
    onSuccess: () => {
      // console.log('mutation worked')
      router.push("/lista-zbiorek");
    },
  });

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-1/5">
        <div className="flex justify-center items-center">
          {loginMutation.isLoading && <SpinnerLoading />}

          <h1 className="text-3xl">Zaloguj się</h1>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <Label htmlFor="password">Hasło</Label>
          <Input
            id="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center items-center flex-row">
            {loginMutation.isError && (
              <p className="text-destructive">
                Wystąpił błąd podczas logowania.
              </p>
            )}
          </div>
          <div className="w-full mt-4 flex justify-end items-end">
            <Button
              onClick={async () => {
                await loginMutation.mutateAsync();
              }}
            >
              Zaloguj się
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center ">
          <h2>Nie posiadasz konta?</h2>
          <Link href={"/auth/register"}>
            <h1 className="underline">Zarejetruj się.</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

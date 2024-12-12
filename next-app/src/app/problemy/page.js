"use client";

import { useQuery } from "@tanstack/react-query";
import { getProblems } from "./data-acces";
import Problem from "./Problem";
import { useEffect, useState } from "react";
import FilterProblems from "./FilterProblems";
import SpinnerLoading from "@/lib/basicComponents/SpinnerLoading";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function page() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // console.log(user?.rola);
      if (user?.rola !== "admin") {
        router.push("/");
      }
    }
  }, [user, router]);

  const [problems, setProblems] = useState([]);
  const {
    data: problemsList,
    isLoading,
    isError,
    isSuccess,
    isRefetching,
  } = useQuery({
    queryKey: ["problemList"],
    queryFn: () => getProblems(),
  });

  useEffect(() => {
    if (isSuccess) {
      setProblems(problemsList);
    }
  }, [isSuccess, problemsList]);
  // console.log(problemsList);

  return (
    <div className="w-full  flex flex-col justify-center items-center pt-14 pb-14">
      <div className="w-2/3">
        <h1 className="text-4xl">Problemy</h1>
        <p className="mt-4 text-muted-foreground">
          Zarządzaj i rozwiązuj zgłoszone przez użytkowników problemy dotyczące
          zbiórek.
        </p>
      </div>
      {isError ? (
        <h1>Wystąpił błąd.</h1>
      ) : (
        <>
          <FilterProblems
            setProblems={setProblems}
            problemList={problemsList}
          />
          <div className="w-2/3 flex flex-col justify-center items-center mt-8 gap-8">
            {isLoading ? (
              <SpinnerLoading />
            ) : (
              <>
                {problems?.length === 0 ? (
                  <h1>Brak problemów.</h1>
                ) : (
                  <>
                    {problems?.map((problem) => {
                      return (
                        <Problem
                          key={problem.id}
                          problem={problem}
                          isRefetching={isRefetching}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

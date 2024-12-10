"use client";

import { useQuery } from "@tanstack/react-query";
import { getProblems } from "./data-acces";
import Problem from "./Problem";

export default function page() {
  const {
    data: problems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["problemList"],
    queryFn: () => getProblems(),
  });

  return (
    <div className="w-full h-[100vh] flex flex-col justify-start items-center pt-14">
      <div className="w-2/3">
        <h1 className="text-4xl">Problemy</h1>
        <p className="mt-4 text-muted-foreground">
          Zarządzaj i rozwiązuj zgłoszone przez użytkowników problemy dotyczące
          zbiórek.
        </p>
      </div>
      <div className="w-2/3 flex flex-col justify-center items-center mt-8">
        {problems?.map((problem) => {
          return <Problem key={problem.id} problem={problem} />;
        })}
      </div>
    </div>
  );
}

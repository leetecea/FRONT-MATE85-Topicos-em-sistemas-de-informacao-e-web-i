import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Tarefa } from "@/models/Tarefa";
import { User } from "@/models/User";

import * as tarefasApi from "../services/api/tarefas";

const tarefasKeys = {
  all: ["tarefas"],
};

export const useTarefasQueries = () => {
  const queryClient = useQueryClient();

  const useGetTarefaAluno = () =>
    useQuery({
      queryKey: tarefasKeys.all,
      queryFn: async () => {
        const user = queryClient.getQueryData<User>(["user"]);

        if (user) {
          const response = await tarefasApi.getTarefasAluno(user.id);

          return response.data;
        }
      },
      select: (data) =>
        data?.sort(
          (a, b) => Date.parse(b.data_prazo) - Date.parse(a.data_prazo),
        ),
    });

  const useConcluirTarefa = () =>
    useMutation({
      mutationFn: tarefasApi.concluirTarefa,
      onMutate: async ({ id, ...tarefa }) => {
        await queryClient.cancelQueries({
          queryKey: tarefasKeys.all,
        });

        const previousTarefas = queryClient.getQueryData<Tarefa[]>(
          tarefasKeys.all,
        );

        queryClient.setQueryData<Tarefa[]>(
          tarefasKeys.all,
          (data) =>
            data && data.map((t) => (t.id === id ? { ...t, ...tarefa } : t)),
        );

        return { previousTarefas };
      },
      onError: (_err, _variables, context) => {
        queryClient.setQueryData(tarefasKeys.all, context?.previousTarefas);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: tarefasKeys.all,
        });
      },
    });

  return { useGetTarefaAluno, useConcluirTarefa };
};

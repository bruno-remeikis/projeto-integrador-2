'use client';

import { TEvento } from "@/models/Evento";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type EventosContextProps = {
   feed: TEvento[];
   setFeed: Dispatch<SetStateAction<TEvento[]>>; //(eventos: TEvento[]) => void;
   addEventoFeed: (e: TEvento) => void;
   removerEventoFeed: (idEvento: number) => void;

   meusEventos: TEvento[];
   setMeusEventos: Dispatch<SetStateAction<TEvento[]>>; //(eventos: TEvento[]) => void;
   addMeuEvento: (e: TEvento) => void;
   removerMeuEvento: (idEvento: number) => void;
}

const EventosContext = createContext<EventosContextProps>({} as EventosContextProps);

type EventosProviderProps = {
   children: React.ReactNode;
}

export const EventosProvider = ({ children }: EventosProviderProps) =>
{
   const [feed, setFeed] = useState<TEvento[]>([]);
   const [meusEventos, setMeusEventos] = useState<TEvento[]>([]);

   const addEventoFeed = (e: TEvento) =>
      setFeed([...feed, e]);

   const removerEventoFeed = (idEvento: number) =>
      setFeed(feed.filter(e => e.id !== idEvento));

   const addMeuEvento = (e: TEvento) =>
      setMeusEventos([...meusEventos, e]);
   
   const removerMeuEvento = (idEvento: number) =>
      setMeusEventos(meusEventos.filter(e => e.id !== idEvento))

   return (
      <EventosContext.Provider value={{
         feed, setFeed, addEventoFeed, removerEventoFeed,
         meusEventos, setMeusEventos, addMeuEvento, removerMeuEvento
      }}>
         { children }
      </EventosContext.Provider>
   )
}

export const useEventos = () => useContext(EventosContext);
/*export function useEventos()
{
   const context = useContext(EventosContext);

   if(!context)
      throw new Error('useEventos must be used within a EventosProvider');

   const { feed, setFeed, addEventoFeed, removerEventoFeed, meusEventos, setMeusEventos, addMeuEvento, removerMeuEvento } = context;

   return { feed, setFeed, addEventoFeed, removerEventoFeed, meusEventos, setMeusEventos, addMeuEvento, removerMeuEvento };
}*/
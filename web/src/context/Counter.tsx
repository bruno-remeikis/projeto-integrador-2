import { ReactNode, createContext, useContext, useState } from "react";

type CounterContextProps = {
   count: number;
   increment: () => void;
}

const CounterContext = createContext<CounterContextProps | null>(null);

export const CounterProvider = ({ children }: { children: ReactNode }) =>
{
   const [count, setCount] = useState<number>(0);

   function increment() {
      setCount(c => c + 1);
   }

   return (
      <CounterContext.Provider value={{ count, increment }}>
         { children }
      </CounterContext.Provider>
   );
};

export function useCounter()
{
   const context = useContext(CounterContext);

   if(!context)
      throw new Error('useCounter must be used within a CounterProvider');

   const { count, increment } = context;

   return { count, increment };
}
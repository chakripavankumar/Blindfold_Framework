/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";

type UseFetchReturnType<T> = {
  data: T | undefined;
  loading: boolean | null;
  error: Error | null;
  fn: (...args: any[]) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
};

function useFetch<T>(cb: (...args: any[]) => Promise<T>): UseFetchReturnType<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error("An unknown error occurred");
      setError(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
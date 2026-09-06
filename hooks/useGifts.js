"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * useGifts
 * --------
 * Busca a lista de presentes, escuta o Realtime do Supabase (atualiza
 * sozinho quando qualquer dispositivo adiciona/edita/exclui) e expõe
 * as ações usadas pelo painel administrativo.
 */
export function useGifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortGifts = (list) =>
    [...list].sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount;
      return new Date(a.created_at) - new Date(b.created_at);
    });

  const fetchGifts = useCallback(async () => {
    const { data, error } = await supabase
      .from("gifts")
      .select("*")
      .order("amount", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setGifts(sortGifts(data || []));
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGifts();

    // TEMPO REAL: qualquer INSERT/UPDATE/DELETE em "gifts" refaz a busca.
    // É isso que sincroniza o celular com o telão instantaneamente.
    const channel = supabase
      .channel("gifts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gifts" },
        () => fetchGifts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchGifts]);

  const addGift = async (name, amount) => {
    const { error } = await supabase
      .from("gifts")
      .insert({ name: name.trim(), amount: Number(amount) || 0 });
    if (error) setError(error.message);
  };

  const updateGift = async (id, fields) => {
    const payload = {};
    if (fields.name !== undefined) payload.name = fields.name.trim();
    if (fields.amount !== undefined) payload.amount = Number(fields.amount) || 0;

    const { error } = await supabase.from("gifts").update(payload).eq("id", id);
    if (error) setError(error.message);
  };

  const deleteGift = async (id) => {
    const { error } = await supabase.from("gifts").delete().eq("id", id);
    if (error) setError(error.message);
  };

  return { gifts, loading, error, addGift, updateGift, deleteGift, refetch: fetchGifts };
}

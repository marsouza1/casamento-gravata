"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

const DEFAULT_TITLE = "Green Label";
const ROW_ID = "main";
const BUCKET = "prize-images";
const FILE_PATH = "prize/current.png";

/**
 * useSettings
 * -----------
 * Guarda o nome e a imagem do prêmio do 1º lugar.
 *
 * Assim como o useGifts, escuta o Realtime: quando você troca o nome
 * ou envia uma nova imagem pelo celular, o telão atualiza sozinho,
 * sem F5, porque os dois estão ouvindo a mesma tabela no Supabase.
 */
export function useSettings() {
  const [prizeTitle, setPrizeTitle] = useState(DEFAULT_TITLE);
  const [prizeImageUrl, setPrizeImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", ROW_ID)
      .maybeSingle();

    if (error) {
      setError(error.message);
    } else if (data) {
      setPrizeTitle(data.prize_title || DEFAULT_TITLE);
      setPrizeImageUrl(data.prize_image_url || null);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();

    // TEMPO REAL: qualquer mudança na linha "main" reflete em todos os telões abertos
    const channel = supabase
      .channel("settings-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "settings" },
        () => fetchSettings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSettings]);

  // Atualiza só o nome do prêmio (ex: trocar "Green Label" por outra coisa)
  const updatePrizeTitle = async (title) => {
    const { error } = await supabase
      .from("settings")
      .upsert({ id: ROW_ID, prize_title: title.trim(), updated_at: new Date().toISOString() });
    if (error) setError(error.message);
  };

  // Envia um PNG novo: sobrescreve sempre o mesmo arquivo no Storage
  // e atualiza a URL (com um carimbo de tempo, para forçar o telão a
  // buscar a imagem nova em vez de usar uma versão em cache).
  const uploadPrizeImage = async (file) => {
    setUploading(true);
    setError(null);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(FILE_PATH, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type || "image/png",
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(FILE_PATH);
    const bustedUrl = `${data.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("settings")
      .upsert({ id: ROW_ID, prize_image_url: bustedUrl, updated_at: new Date().toISOString() });

    if (updateError) setError(updateError.message);
    setUploading(false);
  };

  return {
    prizeTitle,
    prizeImageUrl,
    loading,
    uploading,
    error,
    updatePrizeTitle,
    uploadPrizeImage,
  };
}

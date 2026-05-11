"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Eksportuje bazowe elementy Dialog w stylu shadcn.
 *
 * @author Mihu
 */
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/**
 * Renderuje półprzezroczyste tło modala.
 *
 * @param props Właściwości komponentu Overlay.
 * @returns Warstwa overlay dialogu.
 */
function DialogOverlay(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      {...props}
      className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm ${props.className ?? ""}`}
    />
  );
}

/**
 * Renderuje zawartość modala w centrum ekranu.
 *
 * @param props Właściwości komponentu Content.
 * @returns Kontener z treścią dialogu.
 */
function DialogContent(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-(--card-border) bg-[#252B3B] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] ${props.className ?? ""}`}
      />
    </DialogPortal>
  );
}

/**
 * Renderuje wrapper nagłówka dialogu.
 *
 * @param props Właściwości kontenera.
 * @returns Sekcja nagłówkowa dialogu.
 */
function DialogHeader(props: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={`space-y-1 ${props.className ?? ""}`} />;
}

/**
 * Renderuje tytuł dialogu.
 *
 * @param props Właściwości tytułu.
 * @returns Element tytułu modala.
 */
function DialogTitle(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title {...props} className={`text-xl font-semibold text-white ${props.className ?? ""}`} />;
}

/**
 * Renderuje opis dialogu.
 *
 * @param props Właściwości opisu.
 * @returns Element opisu modala.
 */
function DialogDescription(props: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description {...props} className={`text-sm text-[#b8c2d5] ${props.className ?? ""}`} />;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

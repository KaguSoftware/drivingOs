"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "./confirm-dialog";
import { EditIcon, TrashIcon } from "./icons";

export function RowActionsMenu({
  editHref,
  deleteAction,
  deleteConfirmMessage = "Bu silinsin mi? Bu işlem geri alınamaz.",
}: {
  editHref: string;
  deleteAction: () => Promise<void>;
  deleteConfirmMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({ top: rect.bottom + window.scrollY + 4, left: rect.right + window.scrollX - 80 });
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), 220);
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Satır işlemleri"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-md p-1.5 text-muted hover:bg-surface hover:text-foreground"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path d="M10 4a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 10 4Zm0 4.75a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10 13.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              top: position.top,
              left: position.left,
              transformOrigin: "top right",
              transform: visible ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.85)",
              transitionProperty: "opacity, transform",
              transitionDuration: "220ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`fixed z-50 flex w-20 overflow-hidden rounded-md border border-border bg-[#faf6ed] shadow-md ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              href={editHref}
              role="menuitem"
              onClick={() => setOpen(false)}
              aria-label="Düzenle"
              title="Düzenle"
              className="flex flex-1 items-center justify-center px-3 py-2 hover:bg-white"
            >
              <EditIcon />
            </Link>
            <ConfirmDialog
              message={deleteConfirmMessage}
              action={deleteAction}
              trigger={(show) => (
                <button
                  type="button"
                  role="menuitem"
                  onClick={show}
                  aria-label="Sil"
                  title="Sil"
                  className="flex flex-1 items-center justify-center px-3 py-2 text-danger hover:bg-white"
                >
                  <TrashIcon />
                </button>
              )}
            />
          </div>,
          document.body
        )}
    </>
  );
}

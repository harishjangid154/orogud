"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { ReactNode } from "react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = ({ className, ...props }: ToastPrimitives.ToastViewportProps) => (
  <ToastPrimitives.Viewport
    className={`fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className || ""}`}
    {...props}
  />
);

const Toast = ({ className, ...props }: ToastPrimitives.ToastProps) => {
  return (
    <ToastPrimitives.Root
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border border-border bg-surface p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full ${className || ""}`}
      {...props}
    />
  );
};

const ToastAction = ({ className, ...props }: ToastPrimitives.ToastActionProps) => (
  <ToastPrimitives.Action
    className={`inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive ${className || ""}`}
    {...props}
  />
);

const ToastClose = ({ className, ...props }: ToastPrimitives.ToastCloseProps) => (
  <ToastPrimitives.Close
    className={`absolute right-2 top-2 rounded-md p-1 text-muted-foreground/50 opacity-0 transition-opacity hover:text-text focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 ${className || ""}`}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
);

const ToastTitle = ({ className, ...props }: ToastPrimitives.ToastTitleProps) => (
  <ToastPrimitives.Title className={`text-sm font-semibold text-text ${className || ""}`} {...props} />
);

const ToastDescription = ({ className, ...props }: ToastPrimitives.ToastDescriptionProps) => (
  <ToastPrimitives.Description className={`text-sm opacity-90 text-muted ${className || ""}`} {...props} />
);

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};


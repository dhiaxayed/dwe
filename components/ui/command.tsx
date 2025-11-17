"use client"

import * as CommandPrimitive from "cmdk"
import { Search } from "lucide-react"
import * as React from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Command>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Command>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Command
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card/95 text-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.Command.displayName

const CommandDialog = ({ children, ...props }: React.ComponentProps<typeof Dialog>) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden border border-border/40 bg-card/95 p-0 shadow-elevated">
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
)

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandInput>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
    <Search className="h-4 w-4 text-muted-foreground" />
    <CommandPrimitive.CommandInput
      ref={ref}
      className={cn("flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground", className)}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.CommandInput.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandList>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandList ref={ref} className={cn("max-h-[420px] overflow-y-auto px-2 py-3", className)} {...props} />
))
CommandList.displayName = CommandPrimitive.CommandList.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandEmpty>
>((props, ref) => (
  <CommandPrimitive.CommandEmpty ref={ref} className="px-4 py-8 text-center text-sm text-muted-foreground" {...props} />
))
CommandEmpty.displayName = CommandPrimitive.CommandEmpty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandGroup>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandGroup>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandGroup ref={ref} className={cn("mt-2 space-y-1 px-2", className)} {...props} />
))
CommandGroup.displayName = CommandPrimitive.CommandGroup.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandSeparator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandSeparator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandSeparator ref={ref} className={cn("-mx-2 my-2 h-px bg-border/40", className)} {...props} />
))
CommandSeparator.displayName = CommandPrimitive.CommandSeparator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandItem>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandItem
    ref={ref}
    className={cn(
      "flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-all duration-fast ease-crafted aria-selected:bg-muted/50 aria-selected:text-foreground",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.CommandItem.displayName

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-[11px] uppercase tracking-[0.3em] text-muted-foreground", className)} {...props} />
)
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
}

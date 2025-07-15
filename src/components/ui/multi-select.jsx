"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function MultiSelect({ options, selected, onChange, placeholder, className }) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value) => {
    const isSelected = selected.includes(value)
    if (isSelected) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const handleRemove = (value) => {
    onChange(selected.filter((item) => item !== value))
  }

  const selectedNames = selected
    .map((id) => options.find((opt) => opt.id === id)?.name)
    .filter(Boolean)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between h-auto min-h-[40px] flex-wrap flex-row-reverse", className)}
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-1 flex-row-reverse">
              {selectedNames.map((name, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 flex-row-reverse">
                  {name}
                  <X
                    className="h-3 w-3 cursor-pointer mr-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(options.find((opt) => opt.name === name)?.id || "")
                    }}
                  />
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">
              {placeholder || "اختر التخصصات..."}
            </span>
          )}
          <ChevronDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" dir="rtl">
        <Command>
          <CommandInput placeholder="ابحث عن التخصصات..." />
          <CommandList>
            <CommandEmpty>لم يتم العثور على تخصص.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.id} value={option.name} onSelect={() => handleSelect(option.id)}>
                  <Check
                    className={cn("ml-2 h-4 w-4", selected.includes(option.id) ? "opacity-100" : "opacity-0")}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

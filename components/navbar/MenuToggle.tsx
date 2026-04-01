"use client";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
interface MenuToggleProps {
    isOpen: boolean;
    onToggle: () => void;
}
export function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onToggle}
            aria-label="Toggle Menu"
        >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
    );
}
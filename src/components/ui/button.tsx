import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-[var(--edu-primary)] text-white hover:opacity-90 shadow-xl shadow-[var(--edu-primary)]/20",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 hover:border-[var(--edu-primary)]/20 text-slate-700",
                secondary: "bg-[var(--trans-primary)] text-white hover:opacity-90 shadow-xl shadow-[var(--trans-primary)]/20",
                ghost: "hover:bg-slate-100 text-slate-600",
                link: "text-[var(--edu-primary)] underline-offset-4 hover:underline",
                glass: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-2xl",
                premium: "bg-gradient-to-r from-[#BC248C] via-[#D66FA3] to-[#2D93C7] text-white shadow-xl shadow-[#BC248C]/20 border-0 hover:opacity-90",
            },
            size: {
                default: "h-12 px-6 py-2",
                sm: "h-10 px-4",
                lg: "h-14 px-10 text-lg",
                xl: "h-16 px-12 text-xl",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

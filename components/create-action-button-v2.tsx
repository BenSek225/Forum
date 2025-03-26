"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, X, Lock, PenSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CreateActionButtonV2() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Forum Public",
      href: "/create-forum",
      delay: 0.3,
    },
    {
      icon: <Lock className="h-5 w-5" />,
      label: "Forum Privé",
      href: "/create-forum?type=private",
      delay: 0.2,
    },
    {
      icon: <PenSquare className="h-5 w-5" />,
      label: "Nouveau Post",
      href: "/create-post",
      delay: 0.1,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={toggleMenu}
                style={{ pointerEvents: "auto" }}
              />

              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: item.delay }}
                  className="absolute z-50"
                  style={{
                    bottom: `${(index + 1) * 70}px`,
                    right: 0,
                  }}
                >
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="rounded-full h-12 shadow-lg flex items-center gap-2 pr-6"
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        <Button
          size="lg"
          className={`rounded-full h-14 w-14 shadow-lg floating-button z-50 ${isOpen ? "bg-red-500 hover:bg-red-600" : ""}`}
          onClick={toggleMenu}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  )
}

